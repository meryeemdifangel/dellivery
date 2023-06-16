const express = require("express");
const { getAllOrdersOfClient, addOrder } = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middleware/auth");

const OrderRouter = express.Router();



OrderRouter.get("/client/:id",getAllOrdersOfClient)
OrderRouter.post("/", isAuthenticatedUser, addOrder);


module.exports = OrderRouter;