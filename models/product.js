const getDb = require('../util/database').getDb;
const mongodb = require('mongodb')

class Product {
    constructor(title, imageUrl, price, description, id, userId) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }
    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            // Update the product
            dbOp = db
                .collection('products')
                .updateOne({ _id: this._id }, { $set: this });
        } else {
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }
    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
            .then(products => {
                // console.log(products);
                return products;

            }).catch(err => {
                console.log(err);
            })
    }


    static findById(prodId) {
        const db = getDb();
        return db
            .collection('products')
            .find({ _id: new mongodb.ObjectId(prodId) })
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }
    static deleteBy(prodId) {
        const db = getDb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
            .then(result => {
                console.log("Deleted")
            })
            .catch(err => console.log(err));
    }
}


module.exports = Product;





// const fs = require('fs');
// const path = require('path');
// const products = [];
// const p = path.join(path.dirname(process.mainModule.filename),
//     'data',
//     'products.json');
// const getProductsfromFile = (cb) => {

//     fs.readFile(p, (err, fileContent) => {
//         if (err) {
//             cb([]);
//         }
//         cb(JSON.parse(fileContent));
//     })
// }
// module.exports = class Product {
//     constructor(title, imageUrl, price, description) {
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.price = price;
//         this.description = description

//     }
//     save() {
//         this.id = Math.random().toString();
//         getProductsfromFile(products => {
//             products.push(this);

//             fs.writeFile(p, JSON.stringify(products), (err) => {
//                 console.log(err);
//             });
//         });
//     }

//     static fetchAll(cb) {
//         getProductsfromFile(cb);
//     }

//     static findProductById(id, cb) {
//         getProductsfromFile = (products) => {

//         }
//     }
// }