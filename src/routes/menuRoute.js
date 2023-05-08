const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

// Route: /api/restaurants/:restaurantId/menus

router.get("/:restaurantId", menuController.getAllMenus);
router.post("/", menuController.createMenu);
router.get("/:id", menuController.getMenuDetails);
router.put("/:id", menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);

module.exports = router;