const express =require('express');
const router = express.Router();
const path =require('path');
const rootDir= require('../util/path')


const products=[];

router.get('/add-product',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add_product.html'))
});
router.post('/products',(req,res,next)=>{
   products.push({title: req.body.title});
    res.redirect('/')
}); 


exports.routes = router;
exports.products= products;