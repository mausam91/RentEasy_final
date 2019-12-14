
const fs = require('fs');
const path = require('path');
const products = [];
const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json');
const getProductsfromFile= (cb)=>{
    
fs.readFile(p, (err, fileContent) => {
    if (err) {
        cb([]) ;
    }
    cb(JSON.parse(fileContent));
})
}
module.exports = class Product {
    constructor(title,image,price,description) {
        this.title = title;
        this.image= image;
        this.price=price;
        this.description=description
        
    }
    save() {
        this.id=Math.random().toString();
        getProductsfromFile(products=>{
            products.push(this);

            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsfromFile(cb);
    }
}
