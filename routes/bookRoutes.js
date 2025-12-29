const express = require("express");
const router = express.Router();
const controllers = require("../controllers/bookController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { upload } = require("../utils/upload");


router.get('/', authMiddleware, controllers.getAllBooks);
router.post('/', authMiddleware, upload.single('img'), controllers.createBook);
router.put('/:id', authMiddleware, controllers.updateBook);
router.get('/:id', authMiddleware, controllers.getBookById);
router.delete('/:id', authMiddleware, controllers.deleteBook);
router.post('/:id/buy', authMiddleware, controllers.buyBook);


module.exports = router;

