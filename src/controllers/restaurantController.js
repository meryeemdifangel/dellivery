const Restaurant = require("../models/restaurantModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const streamifier = require("streamifier");


const cloudinary = require("cloudinary").v2; // Assuming you have set up Cloudinary
// Configuration 
cloudinary.config({
  cloud_name: "dbmsxeuph",
  api_key: "538162754625643",
  api_secret: "4iv_nicR2-Lcf8Wm0F0SPdZlML8"
});




// Create a new restaurant
exports.createRestaurant = catchAsyncErrors(async (req, res, next) => {
  const { nom, description, address,longitude,latitude,category , averageRating , numberOfReviews ,phone , email,facebook,numTel } = req.body;
  const imageData = req.files.imageUrl.data; // Image data buffer
  const imageName = req.files.imageUrl.name;
  
  // Create a readable stream from the image buffer
const stream = streamifier.createReadStream(imageData);
// Upload the stream to Cloudinary
const cloudinaryResult = await new Promise((resolve, reject) => {
  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: "products",
      public_id: imageName, // Use the image name as the public_id
    },
    (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }
  );

  stream.pipe(uploadStream);
});

  const imageUrl = cloudinaryResult.secure_url; // or cloudinaryResult.url

  const restaurant = await Restaurant.create({
    nom,
    description, 
    address,
    longitude,
    latitude,
    category,
    averageRating,
    numberOfReviews,
    phone,
    email,
    facebook,
    numTel,
    imageUrl: {
      public_id: cloudinaryResult.public_id,
      url: imageUrl,
    }
  });

  res.status(201).json(restaurant);
});

// Get all restaurants
exports.getAllRestaurants = catchAsyncErrors(async (req, res, next) => {
  console.log("hna")
  const restaurants = await Restaurant.find();

  res.status(200).json(
    restaurants
  );
});

// Get restaurant details
exports.getRestaurantDetails = catchAsyncErrors(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (!restaurant) {
    return next(new ErrorHander("Restaurant not found", 404));
  }

  res.status(200).json(
    restaurant);
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

  await Restaurant.deleteOne({_id:restaurant._id});

  res.status(200).json({
    success: true,
    message: "Restaurant deleted successfully",
  });
});