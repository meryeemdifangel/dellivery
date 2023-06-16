const express = require("express");
const { getAllOrdersOfClient, addOrder } = require("../controllers/orderController");

const OrderRouter = express.Router();




OrderRouter.get("/client/:id",getAllOrdersOfClient)
OrderRouter.post("/",addOrder);

module.exports = OrderRouter;