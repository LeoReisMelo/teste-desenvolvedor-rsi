const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const s3 = new aws.S3();
const ProductSchema = new mongoose.Schema({
    nameProduct:String,
    valueProduct: String,
    nameFile: String,
    sizeFile: Number,
    keyFile: String,
    url: String,
    createdAt: {
       type: Date,
        default: Date.now
    }

});

ProductSchema.pre('save', function(){
    if(!this.url){
        this.url = `${process.env.APP_URL}/files/${this.keyFile}`;
    }
});
ProductSchema.pre('remove', function(){
    if(process.env.STORAGE_TYPE === 's3'){
        return s3.deleteObject({
            Bucket: 'Defina o nome do bucket',
            Key: this.keyFile

        }).promise();
    }else {
        return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'temp', 'uploads', this.keyFile));
    }
})

module.exports = mongoose.model('Product', ProductSchema);