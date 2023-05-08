const Menu = require("../models/menuModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get all menus of a specific restaurant
exports.getAllMenus = catchAsyncErrors(async (req, res, next) => {
  const restaurantId = req.params.restaurantId;

  const menus = await Menu.find({ idRestaurant: restaurantId });

  res.status(200).json({
    success: true,
    menus,
  });
});

// Create a new menu
exports.createMenu = catchAsyncErrors(async (req, res, next) => {
  const menu = await Menu.create(req.body);

  res.status(201).json({
    success: true,
    menu,
  });
});

// Get menu details
exports.getMenuDetails = catchAsyncErrors(async (req, res, next) => {
  const menu = await Menu.findById(req.params.id);

  if (!menu) {
    return next(new ErrorHander("Menu not found", 404));
  }

  res.status(200).json({
    success: true,
    menu,
  });
});

// Update menu details
exports.updateMenu = catchAsyncErrors(async (req, res, next) => {
  let menu = await Menu.findById(req.params.id);

  if (!menu) {
    return next(new ErrorHander("Menu not found", 404));
  }

  menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    menu,
  });
});

// Delete a menu
exports.deleteMenu = catchAsyncErrors(async (req, res, next) => {
  const menu = await Menu.findById(req.params.id);

  if (!menu) {
    return next(new ErrorHander("Menu not found", 404));
  }

  await menu.remove();

  res.status(200).json({
    success: true,
    message: "Menu deleted successfully",
  });
});