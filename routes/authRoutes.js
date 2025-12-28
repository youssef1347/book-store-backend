const express = require("express");
const router = express.Router();
const controllers = require('../controllers/authController');



router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.get('/verify_email/:token', controllers.verifyEmail);


module.exports = router;