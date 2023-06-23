const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    restaurant : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    client : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    address : {
        type : String
    },
    note : {
        type : String
    },
    status : {
        type : String
    },
    orderItems  : [{
        orderItem : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Menu"
        } ,
        quantity : {
            type: Number
        }
    }],
    priceTotal : {
        type : Number
    }
 
},{
    timestamps : true
})


const Order = mongoose.model("Order" , OrderSchema)
module.exports = Order;