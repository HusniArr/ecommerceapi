'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRoute = require('./router/auth-route');
const userRoute = require('./router/user-route');
const productRoute = require('./router/product-route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.status(200).json({
        "hello":"hello world"
    });
});
app.use('/api/auth',authRoute);
app.use('/api',userRoute);
app.use('/api',productRoute);



mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('Koneksi database berhasil.'))
.catch(err=>console.log(err));

app.listen({port:PORT},()=>{
    console.log(`server listening on port ${PORT}.`)
});
