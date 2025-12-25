const Book = require("../models/books");


// get all books
async function getAllBooks(req, res) {
    try {
        const books = await Book.find().populate('owner', '-_id');

        res.status(200).json({ message: 'all books returned', books });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
};


//get one book
async function getBookById(req, res) {
    try {
        const { id } = req.params;

        const book = await Book.findById(id).populate('owner', 'username email');
        if (!book) {
            return res.status(404).json({ message: 'book not found' });
        }

        res.status(200).json({ message: `book with id ${id} returned`, book });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
};


//create book
async function createBook(req, res) {
    try {
        const { price, title, desc, author } = req.body;

        const owner = req.user.id;

        const book = await Book.create({ price, title, desc, author, owner });
        res.status(201).json({ message: 'book created', book });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}


//update book
async function updateBook(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            data,
            { new: true });

        if (!updatedBook) {
            return res.status(401).json({ message: 'book not found' });
        }

        res.json({ message: 'book updated', updatedBook });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
}


//delete book
async function deleteBook(req, res) {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            console.log(req.params);
            return res.status(401).json({ messge: 'book not found' });
        }

        res.json({ message: 'book deleted', deletedBook });
    } catch (error) {
        console.log(error);
    }
}


module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook };