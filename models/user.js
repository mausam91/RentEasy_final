const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }
    save() {
        const db = getDb();
        db.collection("users")
            .insertOne(this)
            .then(result => {
                console.log("result");
                return result;
            })
            .catch(err => console.log(err));
    }
    addToCart(product) {
        const updatedCart = { items: [{ productId: new ObjectId(product._id), quantity: 1 }] };
        const db = getDb();
        return db
            .collection("users")
            .updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: updatedCart } });
    }
    static findById(userId) {
        const db = getDb();
        return db
            .collection("users")
            .find({ _id: new mongodb.ObjectId(userId) })
            .next()
            .then(user => {
                console.log(user);
                return user;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = User;