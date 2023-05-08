const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const menuRoutes = require("./menuRoute");

// Route: /api/restaurants
router.get("/test", (req, res) => {
    res.send("Test route");
  });


router.get("/", restaurantController.getAllRestaurants);
router.post("/", restaurantController.createRestaurant);
router.get("/:id", restaurantController.getRestaurantDetails);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

// Nested route for menus
router.use("/:restaurantId/menus", menuRoutes);

module.exports = router;