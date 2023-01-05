const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
    userId : { type : String, required : true},
    products : [
        {
            productId:{
                type:String
            },
            quantity:{
                type: Number,
                default:1
            }
        }
    ],
    amount:{type:String,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"pending"}
},{timestamps:true});

module.exports = mongoose.model('Cart',cartSchema);