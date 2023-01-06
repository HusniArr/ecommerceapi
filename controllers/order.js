const Order = require("../models/order");

module.exports = {
    async createOrder(req,res){
            try {
                const order = new Order(req.body);

                const stored = await order.save();
          
                if(stored){
                    res.status(200).json({message:"Order produk berhasil ditambahkan"}); // jika berhasil tampilkan respon sukses
                }else{
                    res.status(400).json({error:"Order produk gagal ditambahkan"});//jika gagal tampilkan respon error
                }

            } catch (error) {
                res.status(500).json({error:error.message});
            }
    },
    async updateOrder(req, res){
        try{
            const id = req.query.orderId;
            const result = await Order.updateOne({_id:id},{$set:req.body});

            if(result.matchedCount == 1){
                res.status(200).json({message:'Order produk berhasil diubah'});
            }else{
                res.status(400).json({error:'Order produk gagal diubah'});
            }
        }catch(error){
            res.status(500).json({error:error.message});
        }
    },
    async deleteOrder(req,res){
        try{
            const id = req.query.orderId;
            const result = await Order.deleteOne({_id:id});

            if(result.deletedCount == 1){
                res.status(200).json({message:"Order produk berhasil dihapus"});
            }else{
                res.status(400).json({message:"Order produk gagal dihapus"});
            }

        }catch(error){
            res.status(500).json({error:error.message});
        }
    },
    async findOrderByUserId(req,res){
        try {
            const id = req.params.id;
            const cart = await Order.findById({_id:id}).exec();
            const { ...result} = cart;
            res.status(200).json(result._doc);
        } catch (error) {
            res.status(500).json({error:error.message});
        }
    },
    async findAllOrders(req,res){
        try{
            const carts = await Order.find();

            const [ ...result] = carts;
            res.status(200).json({products:result});
        }catch(error){
            res.status(500).json({error:error.message});
        }
    }
}