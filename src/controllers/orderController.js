const Order = require("../Modals/orderModal")
const jwt = require('jsonwebtoken');

const getAllOrdersOfClient = async (req , res) => {
    try { 
        const orders = await Order.find({client :req.params.id }).populate('Restaurant')
        .populate('User')
        .populate('orderItems.orderItem')
        if (orders) res.send(orders)
        else res.send([])
    } catch (error) {
        console.log(error,"err")
        res.status(400).send([])
    }
}

const addOrder = async (req , res ) => {
    try {
        console.log(req.body)
        const authorization_header = req.headers.authorization;
        let client;
        if (authorization_header && authorization_header.toString().startsWith('Bearer ') ){
            let token = authorization_header.toString().split(' ')[1]
            client = jwt.verify(token, "food_delivry").id;
        }else {
            client = jwt.verify(req.body.client, "food_delivry").id; 
        }
        const order = await Order.create({...req.body,client: client});
        res.status(200).send(order);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


module.exports = { getAllOrdersOfClient ,    addOrder }