const Cart = require("../models/cart");

module.exports = {
    async createCart(req,res){
            try {
                const cart = new Cart(req.body);

                const stored = await cart.save();
          
                if(stored){
                    res.status(200).json({message:"Produk berhasil ditambahkan di keranjang belanja"}); // jika berhasil tampilkan respon sukses
                }else{
                    res.status(400).json({error:"Produk gagal ditambahkan di kerangjang belanja"});//jika gagal tampilkan respon error
                }

            } catch (error) {
                res.status(500).json({error:error.message});
            }
    },
    async updateCart(req, res){
        try{
            const id = req.query.cartId;
            const result = await Cart.updateOne({_id:id},{$set:req.body});

            if(result.matchedCount == 1){
                res.status(200).json({message:'Data produk berhasil diubah'});
            }else{
                res.status(400).json({error:'Data produk gagal diubah'});
            }
        }catch(error){
            res.status(500).json({error:error.message});
        }
    },
    async deleteCart(req,res){
        try{
            const cartId = req.query.cartId;
            const result = await Cart.deleteOne({_id:id});

            if(result.deletedCount == 1){
                res.status(200).json({message:"Data produk berhasil dihapus"});
            }else{
                res.status(400).json({message:"Data produk gagal dihapus"});
            }

        }catch(error){
            res.status(500).json({error:error.message});
        }
    },
    async findCartByUserId(req,res){
        try {
            const id = req.params.id;
            const cart = await Cart.findById({_id:id}).exec();
            const { ...result} = cart;
            res.status(200).json(result._doc);
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    },
    async findAllCarts(req,res){
        try{
            const carts = await Cart.find();

            const [ ...result] = carts;
            res.status(200).json({products:result});
        }catch(error){
            res.status(500).json({error:error.message});
        }
    }
}