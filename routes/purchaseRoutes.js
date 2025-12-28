const express = require("express");
const router = express.Router();
const controllers = require("../controllers/purchaseController.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

router.get('/', authMiddleware, controllers.getAllPurchases);



module.exports = router;