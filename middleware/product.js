const Joi = require('joi');

const checkProduct = (req,res,next)=>{
    const schema = Joi.object({
        title : Joi.string().required(),
        desc : Joi.string().required(),
        img : Joi.string().required(),
        categories:Joi.array().items(Joi.string()),
        size:Joi.number().required(),
        color:Joi.string().required(),
        price:Joi.number().required()
    });
    
    const { title, desc, img, categories, size, color, price} = req.body;
    const { error } = schema.validate({
        title:title,desc:desc,img:img,categories:categories,size:size,color:color,price:price
    });

    if(error){
        switch (error.details[0].context.key) {
            case 'title':
                res.status(400).json({error:'Masukan nama produk'});
                break;
            case 'desc':
                res.status(400).json({error:'Masukan keterangan produk'});
                break;
            case 'img':
                res.status(400).json({error:'Masukan file gambar'})
            case 'categories':
                res.status(400).json({error:'Masukan kategori atau jenis produk dalam bentuk array'})
                break;
            case 'size':
                res.status(400).json({error:'Masukan ukuran produk'});
                break;
            case 'color':
                res.status(400).json({error:'Masukan warna produk'});
                break;
            case 'price':
                res.status(400).json({error:'Masukan harga produk'});
                break;
            default:
                break;
        }

    }else{
        next();
    }
}

module.exports = { checkProduct};