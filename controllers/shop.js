const Product = require('../models/product')


exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/products',

            })
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Index',
                path: '/',
            })
        })
        .catch(err => {
            console.log(err);
        });

}

// exports.getCart = (req, res, next) => {
//     Product.fetchAll(products => {
//         res.render('shop/cart', {
//             prods: products,
//             pageTitle: 'Cart',
//             path: '/cart',

//         })
//     });
// }
exports.postCart = (req, res, next) => {
        const prodId = req.body.productId;
        Product.findById(prodId).then(product => {
                return req.user.addToCart(product);

            })
            .then(result => {
                console.log(result);
            })
    }
    // exports.getCheckout = (req, res, next) => {
    //     Product.fetchAll(products => {
    //         res.render('shop/checkout', {
    //             prods: products,
    //             pageTitle: 'Your Checkout',
    //             path: '/checkout',

//         })
//     });
// }
exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/product'
            })
        }).catch(err => {
            console.log(err)
        })
}