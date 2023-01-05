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
    }
}