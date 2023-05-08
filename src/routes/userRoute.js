const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route: /api/users

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logout);
router.post("/password/forgot", userController.forgotPassword);
router.put("/password/reset/:token", userController.resetPassword);
router.get("/profile", userController.getUserDetails);
router.put("/password/update", userController.updatePassword);
router.put("/profile/update", userController.updateProfile);


module.exports = router;