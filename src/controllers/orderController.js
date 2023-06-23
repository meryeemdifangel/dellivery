const jwt = require('jsonwebtoken');
const Order = require('../models/orderModel');
const Restaurant = require('../models/restaurantModel');
const admin = require('../../firebase');

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
        const order = await Order.create(req.body);
        res.status(200).send(order);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
   
        const updatedOrder = await Order.findByIdAndUpdate({_id:id}, { status })
        console.log(updateOrder)
        const restaurant= await Restaurant.findById({_id:updatedOrder.restaurant})
      
            const message = {
                notification: {
                    title: 'Your Order in ' + restaurant.nom +' is ' + status,
                    body: `Your order status is ${status}`,
                },
                token: "d6YG3bi4QterHVShkwec_T:APA91bEDmG6gHWQ16K_NeH4fYu8YNvqiPpH8906Z1Y7eZzZq0qZRY8lh4kQSKbvH8SDNGtHiwdQ6LQUicGB6eP8OisylFK1Tugv29G64KVtBoMPAp9sDqWIjxTMfApvQ06WLhZNzogsK",
            };
            await admin.messaging().send(message)
     
        return res.status(200).json(updatedOrder)
    } catch (error) {
        console.log(error.message);

        res.status(500).json({ error: error.message });
    }
}


module.exports = { getAllOrdersOfClient ,    addOrder , updateOrder }