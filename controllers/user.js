const User = require('../models/user');
const CryptoJS = require('crypto-js');
const  jwt = require('jsonwebtoken');

module.exports = {

    async register(req,res){
        const { username, email, password } = req.body;
        try {
            const checkEmailUser = await User.findOne({email});
            if(checkEmailUser){
                res.status(401).json({error:"Data user sudah ada"});
            }else{
                const user = new User({
                    username:username,
                    email:email,
                    password:CryptoJS.AES.encrypt(password,process.env.CRYPTO_SECRET).toString()
                });
                user.save();
                res.status(200).json({data:user});

            }
        } catch (error) {
        res.status(500).json({message:error.message});   
        }
    },
    async login(req,res){
        try{
            const user = await User.findOne({email:req.body.email});
            const bytes = CryptoJS.AES.decrypt(user.password,process.env.CRYPTO_SECRET);
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
            
            if(originalPassword !== req.body.password){
                res.status(401).json({error:"email atau password tidak sesuai."});
            }else{
                
                const accessToken = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1d'});
                const { password,...result} = user._doc;
                res.status(200).json({...result,accessToken});
            }


        }catch(error){
             res.status(500).json({error:error.message});
        }
    },
    async findAllUser(req,res){
        try {
            const users = await User.find({});
            const { ...result } = users;
            res.status(200).json(result);
        } catch (error) {
            res.status(503).json({error:error.message});
        }
    },
    async updatedUser(req,res){
        try{
            const id = req.params.id;
            const { username, email} = req.body;
            const hashPassword = CryptoJS.AES.encrypt(req.body.password,process.env.CRYPTO_SECRET).toString();
            const user = await User.findOne({email:email});
            if(user){
                res.status(401).json({error:"Data user anda sudah ada"});
            }else{
                const updatedUser = await User.findByIdAndUpdate(id,{$set:{username,email,password:hashPassword}});
                res.status(200).json({
                    message:"Data user berhasil diedit",
                    updatedUser
                });
            }
        }catch(error){
            res.status(503).json({error:error.message});
        }
    },
    async deleteUser(req,res){
        const id = req.params.id;
        const deleted = await User.deleteOne({_id:id});
        if(deleted){
            res.status(200).json({message:"Data user dengan id : "+id+" berhasil dihapus"});
        }else{
            res.status(400).json({error:"Data user gagal dihapus"});
        }
    }
}