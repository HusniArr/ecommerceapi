const Product = require("../models/product");

module.exports = {
    async createProduct(req,res){
            try {
                const { title,desc,img,categories,size,color,price} = req.body;
                const product = new Product({
                    title,
                    desc,
                    img,
                    categories,
                    size,
                    color,
                    price
                });

                const stored = await product.save();

               
                if(stored){
                    res.status(200).json({message:"Data produk berhasil ditambahkan"}); // jika berhasil tampilkan respon sukses
                }else{
                    res.status(400).json({error:"Data produk gagal ditambahkan"});//jika gagal tampilkan respon error
                }

            } catch (error) {
                res.status(500).json({error:error.message});
            }
    },
    async updateProduct(req, res){
        try{
            const id = req.params.id;
            const { title, desc, img, categories, size, color, price} = req.body;
            const updated = await Product.updateOne({_id:id},{$set:{title:title,desc:desc,img:img,categories:categories,size:size, color:color,price:price}});

            if(updated.matchedCount == 1){
                res.status(200).json({message:'Data produk berhasil diubah'});
            }else{
                res.status(400).json({error:'Data produk gagal diubah'});
            }
        }catch(error){
            res.status(500).json({error:error.message});
        }
    },
    async deleteProduct(req,res){
        try{
            const id = req.params.id;
            const result = await Product.deleteOne({_id:id});

            if(result.deletedCount == 1){
                res.status(200).json({message:"Data produk berhasil dihapus"});
            }else{
                res.status(400).json({message:"Data produk gagal dihapus"});
            }

        }catch(error){
            res.status(500).json({error:error.message});
        }
    },
    async findByProductId(req,res){
        try {
            const id = req.params.id;
            const product = await Product.findById({_id:id}).exec();
            const { ...result} = product;
            res.status(200).json(result._doc);
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    },
    async findAllProducts(req,res){
        const qNew = req.query.new;
        const qCategory = req.query.category;
        try{
            let products;
            if(qNew == 'true'){
                products = await Product.find().sort({createdAt:-1}).limit(5);
            }else if(qCategory){
                products = await Product.find({categories:{
                    $in:[qCategory]
                }});
            }else{
                products = await Product.find();
            }

            const [ ...result] = products;
            res.status(200).json({products:result});
        }catch(error){
            res.status(500).json({error:error.message});
        }
    }
}