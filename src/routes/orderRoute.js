const express = require("express");
const { getAllOrdersOfClient, addOrder, updateOrder } = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middleware/auth");

const OrderRouter = express.Router();



OrderRouter.get("/client/:id",getAllOrdersOfClient)
OrderRouter.post("/", addOrder);
OrderRouter.put('/:id',updateOrder)

module.exports = OrderRouter;