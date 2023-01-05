const jwt = require('jsonwebtoken');
const Joi = require('joi');
const  User  = require('../models/user');

const verifyToken = (req,res,next) =>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const token = bearerHeader.split(' ')[1];
      
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err) res.status(401).json({error:"Token is not valid"});
            req.user = user;
            next();
        })
    }else{
        res.status(403).json({error:'ACCESS FORBIDEN'});
    }

}

const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json({error:'ACCESS FORBIDEN'});
        }
        console.log(req.user);
    })
}

const checkEmailUser = async (req,res,next) =>{
    const user = await User.findOne({email:req.body.email}).exec();
    if(!user){
        res.status(404).json({error:"email atau password tidak sesuai."});
    }else{
        next();
    } 
}


const verifyRegisterUser = async(req,res,next)=>{
    const schema = Joi.object({
        username:Joi.string()
                .min(4)
                .max(20)
                .required(),
        email:Joi.string()
            .email()
            .required(),
        password:Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')),
        repeat_password:Joi.ref('password')
    });

    const { error } = schema.validate({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        repeat_password:req.body.repeat_password
    });

    if(error){
        switch (error.details[0].context.key) {
            case 'username':
                res.status(400).json({error:`1.Minimal panjang 4 karakter dan maksimal 20 karakter.\n2.Hanya bisa angka dan huruf`});
                break;
            case 'email':
                res.status(400).json({error:'Format email salah'});
            break;
            case 'password':
                res.status(400).json({error:'Password memiliki panjang 6 sampai 20 karakter'});
                break;
            case 'repeat_password':
                res.status(400).json({error:'Kedua password harus sama'});
                break;
            default:
                res.status(400).json({error:'Informasi registrasi pengguna tidak valid'});
                break;
        }
    }else{
        next();
    }
}

const verifyLoginUser = async(req,res,next)=>{
    const schema = Joi.object({
        email:Joi.string()
            .email()
            .required(),
        password:Joi.string()
            .pattern(new RegExp(`^[a-zA-Z0-9]{6,20}`))
    });

    const { error } = schema.validate({
        email:req.body.email,
        password:req.body.password
    });

    if(error){
        switch (error.details[0].context.key) {
            case 'email':
                res.status(400).json({error:'Format email salah'});
                break;
            case 'password':
                res.status(400).json({error:'Password memiliki panjang 6 sampai 20 karakter'});
            default:
                break;
        }
    }else{
        next();
    }
}

module.exports = {
    verifyToken,verifyTokenAndAuthorization,checkEmailUser,verifyRegisterUser, verifyLoginUser
}