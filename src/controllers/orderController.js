const jwt = require('jsonwebtoken');
const Order = require('../models/orderModel');

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
        const order = await Order.create({...req.body,client: req.user.id});
        res.status(200).send(order);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


module.exports = { getAllOrdersOfClient ,    addOrder }