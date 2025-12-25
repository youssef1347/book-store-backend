const express = require("express");
const router = express.Router();
const controllers = require("../controllers/bookController");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.get('/', authMiddleware, controllers.getAllBooks);
router.post('/', authMiddleware, controllers.createBook);
router.put('/:id', authMiddleware, controllers.updateBook);
router.get('/:id', authMiddleware, controllers.getBookById);
router.delete('/:id', authMiddleware, controllers.deleteBook);


module.exports = router;

