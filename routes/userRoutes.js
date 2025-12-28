const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userController.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

router.get('/profile', authMiddleware, controllers.getProfile);
router.put('/edit_profile', authMiddleware, controllers.editProfile);


module.exports = router;