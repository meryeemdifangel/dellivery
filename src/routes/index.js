const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoute");
const menuRoutes = require("./menuRoute");
const restaurantRoutes = require("./restaurantRoute");
const orderRoutes = require("./orderRoute");
const reviewRoutes = require("./reviewRoute");
const reviewMenuRoutes = require("./reviewMenuRoute");


// Import other route files as needed

// Route: /api/users
router.use("/users", userRoutes);

// Route: /api/menus
router.use("/menus", menuRoutes);

// Route: /api/restaurants
router.use("/restaurants", restaurantRoutes);

// Route: /api/orders
router.use("/orders", orderRoutes);

// Route: /api/reviews
router.use("/reviews", reviewRoutes);

// Route: /api/reviewsMenu
router.use("/reviewsMenu", reviewMenuRoutes);




// Add other route prefixes as needed

module.exports = router;