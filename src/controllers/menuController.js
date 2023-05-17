const Menu = require("../models/menuModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary").v2; // Assuming you have set up Cloudinary
// Configuration 
cloudinary.config({
  cloud_name: "dbmsxeuph",
  api_key: "538162754625643",
  api_secret: "4iv_nicR2-Lcf8Wm0F0SPdZlML8"
});


// Get all menus of a specific restaurant
exports.getAllMenus = catchAsyncErrors(async (req, res, next) => {
  const restaurantId = req.params.restaurantId;

  const menus = await Menu.find({ idRestaurant: restaurantId });

  res.status(200).json(
    menus);
});

// Create a new menu
exports.createMenu = catchAsyncErrors(async (req, res, next) => {
  const { nom, description, price, idRestaurant } = req.body;
  const image = req.files.image; // Assuming you have the image file in req.files

  // Upload image to Cloudinary
  const result = await cloudinary.uploader.upload(image.tempFilePath);

  const menu = await Menu.create({
    nom,
    description,
    price,
    idRestaurant,
    imageUrl: result.secure_url, // Store the image URL from Cloudinary
  });

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

  res.status(200).json(
    menu);
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