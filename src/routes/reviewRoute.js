const express = require("express");
const { getAllReviewOfRestaurant, addReviewOfRestaurant } = require("../controllers/reviewController");
const ReviewRouter = express.Router();




ReviewRouter.get("/restaurant/:id",getAllReviewOfRestaurant)
ReviewRouter.post("/",addReviewOfRestaurant);

module.exports = ReviewRouter;