const express = require("express");
const router = express.Router();
const controllers = require("../controllers/userController.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

router.get('/profile', authMiddleware, controllers.getProfile);
router.get('/books_for_sale', authMiddleware, controllers.getBooksForSale);
router.put('/edit_profile', authMiddleware, controllers.editProfile);


module.exports = router;