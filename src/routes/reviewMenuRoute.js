const express = require("express");
const { getAllReviewOfMenu, addReviewOfMenu } = require("../controllers/reviewMenuController");
const ReviewMenuRouter = express.Router();




ReviewMenuRouter.get("/menu/:id",getAllReviewOfMenu)
ReviewMenuRouter.post("/",addReviewOfMenu);

module.exports = ReviewMenuRouter;