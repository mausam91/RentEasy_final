const Product = require('../models/product')


  exports.getProducts=(req,res,next)=>{
   Product.fetchAll(products=>{
    res.render('shop/product-list',{
      prods:products,
      pageTitle:'Shop',
      path:'/products',
    
    })
   });
}

exports.getIndex=(req,res,next)=>{
  Product.fetchAll(products=>{
    res.render('shop/index',{
      prods:products,
      pageTitle:'Index',
      path:'/',
    
    })
   });
}
exports.getCart=(req,res,next)=>{
  Product.fetchAll(products=>{
    res.render('shop/cart',{
      prods:products,
      pageTitle:'Cart',
      path:'/cart',
    
    })
   });
}
exports.getCheckout=(req,res,next)=>{
  Product.fetchAll(products=>{
    res.render('shop/checkout',{
      prods:products,
      pageTitle:'Your Checkout',
      path:'/checkout',
    
    })
   });
}