const express = require('express');
const routes = express.Router();
const crypto = require('crypto');
const multer = require('multer');
const multerConfig = require('./config/multer');
const Product = require('./models/Product');
const User = require('./models/User');

routes.get('/product', async(req,res) =>{
    const products = await Product.find();
    return res.json(products);
});
routes.post('/product', multer(multerConfig).single('file'), async(req,res) =>{
    console.log(req.file);
    const {originalname: nameFile, size: sizeFile, filename: keyFile, location: url = ''} = req.file;
    const product = await Product.create({
        nameProduct: req.body.nameProduct,
        valueProduct: req.body.valueProduct,
        nameFile,
        sizeFile,
        keyFile,
        url
    });
    console.log(product);
    return res.json(product);
    
});

routes.delete('/product/:id', async(req, res) =>{
    const product = await Product.findById(req.params.id);
    await product.remove();
    return res.json({msg: 'Deletado com sucesso'});
});

routes.post('/user', async(req, res) =>{
    const secret = req.body.userPassword;
    const hash = crypto.createHmac('sha256', secret).digest('hex');
    console.log(hash);
    const user = await User.create({
        userName: req.body.userName,
        userPassword: hash
    });

    return res.json(user);
});
routes.get('/user', async(req, res)=>{
    const users = await User.find();
    return res.json(users);
});

routes.delete('/user/:id', async(req, res)=>{
    const user = await User.findById(req.params.id);
    await user.remove();
    return res.json({msg: 'Deletado com sucesso'});
});

routes.post('/login', async(req, res)=>{

});
module.exports = routes;