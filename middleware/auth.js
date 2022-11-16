const jwt = require('jsonwebtoken');
const  User  = require('../models/user');

const verifyToken = (req,res,next) =>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const token = bearerHeader.split(' ')[1];
      
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err) res.status(401).json({error:"Token is not valid"});
            req.user = user;
            next()
        })
    }else{
        res.status(403).json({error:'ACCESS FORBIDEN'});
    }

}

const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json({error:'ACCESS FORBIDEN'});
        }
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

const checkPasswordUser = async(req,res,next)=>{

}
module.exports = {
    verifyToken,verifyTokenAndAuthorization,checkEmailUser
}