const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoute");
const menuRoutes = require("./menuRoute");
const restaurantRoutes = require("./restaurantRoute");
// Import other route files as needed

// Route: /api/users
router.use("/users", userRoutes);

// Route: /api/menus
router.use("/menus", menuRoutes);

// Route: /api/restaurants
router.use("/restaurants", restaurantRoutes);

// Add other route prefixes as needed

module.exports = router;