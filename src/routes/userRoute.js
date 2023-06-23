const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route: /api/users
router.get("/user/:id", userController.getUser);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logout);




module.exports = router;