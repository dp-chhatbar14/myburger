const mongoose = require('mongoose'); 

const myOrdersSchema = new mongoose.Schema({
    orderDetail: {
        orderId: Number,
        ingredients: {
            bacon: Number,
            cheese: Number,
            meat: Number,
            salad: Number
        },
        orderData: {
            country: String,
            deliveryMethod: String,
            email: String,
            name: String,
            street: String,
            zipcode: String
        },
        price: Number
    }
}
);

const MyOrdersModel = mongoose.model("myorders",myOrdersSchema)
module.exports=MyOrdersModel;
