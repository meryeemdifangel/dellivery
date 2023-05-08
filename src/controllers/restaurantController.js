const Restaurant = require("../models/restaurantModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create a new restaurant
exports.createRestaurant = catchAsyncErrors(async (req, res, next) => {
  const restaurant = await Restaurant.create(req.body);

  res.status(201).json({
    success: true,
    restaurant,
  });
});

// Get all restaurants
exports.getAllRestaurants = catchAsyncErrors(async (req, res, next) => {
  console.log("hna")
  const restaurants = await Restaurant.find();

  res.status(200).json({
    success: true,
    restaurants,
  });
});

// Get restaurant details
exports.getRestaurantDetails = catchAsyncErrors(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ErrorHander("Restaurant not found", 404));
  }

  res.status(200).json({
    success: true,
    restaurant,
  });
});

// Update restaurant details
exports.updateRestaurant = catchAsyncErrors(async (req, res, next) => {
  let restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ErrorHander("Restaurant not found", 404));
  }

  restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    restaurant,
  });
});

// Delete a restaurant
exports.deleteRestaurant = catchAsyncErrors(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ErrorHander("Restaurant not found", 404));
  }

  await restaurant.remove();

  res.status(200).json({
    success: true,
    message: "Restaurant deleted successfully",
  });
});