const express = require('express');
const routes = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const multerConfig = require('./config/multer');
const Product = require('./models/Product');
const User = require('./models/User');



routes.get('/product', async(req,res) =>{
    const {page = 1} = req.query;
    const products = await Product.find().skip((page - 1)*10).limit(10);
    const total = await (await Product.find()).length;
    return res.json({
        products,
        total
    });
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
    const salt = 10; 
    const hash = await bcrypt.hash(secret, salt);
    console.log(hash);
    const user = await User.create({
        userName: String(req.body.userName).toLocaleUpperCase(),
        userPassword: hash,
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
    const {userName, userPassword} = req.body;
    const user = await User.findOne({userName: String(userName).toLocaleUpperCase()});
    if(!user){
        res.status(400).json({msg:'Usuário não encontrado'});
    }
    //linha 67 49 da erro bem aqui
    console.log(userPassword)
    if(!await bcrypt.compare(userPassword, user.userPassword)){
        res.status(400).json({msg:'Senha incorreta'});
    }
    else{
        res.json({msg: `Bem-vindo: ${userName}`});
    }
    
});
module.exports = routes;