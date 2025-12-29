const Book = require("../models/bookModel");
const Purchase = require("../models/purchaseModel");
const User = require("../models/userModel");
const { sendMial } = require("../utils/sendEmail");


// view all books
async function getAllBooks(req, res) {
    try {

        //filter/search by title, author and desc
        const filter = { };
        const { search } = req.query;


        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } },
                { desc: { $regex: search, $options: "i" } },
            ];
        }


        const books = await Book.find(filter).populate('owner', '_id -password');

        res.status(200).json({ message: 'all books returned', books });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};


//view book details
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


//create a new book
async function createBook(req, res) {
    try {
        const { price, title, desc, author, stock } = req.body;
        const owner = req.user.id;
        const img = req.file.path;
        const book = await Book.create({
            price,
            title,
            desc,
            author,
            owner,
            stock,
            img,
        });
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


// buy book
async function buyBook(req, res) {
    try {
        const bookId = req.params.id;
        const buyerId = req.user.id;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'book not found' });
        }
        const sellerId = book.owner;

        if (buyerId == sellerId) {
            return res.status(409).json({ message: 'conflict' });
        }

        if (book.stock == 0) {
            return res.status(403).json({ message: `the book with id ${bookId} is out of stock` });
        }

        const seller = await User.findById(sellerId);
        const buyer = await User.findById(buyerId);

        book.stock = book.stock - 1;
        await book.save();

        const newPurchase = await Purchase.create({
            //book information
            book: bookId,
            price: book.price,

            // seller information 
            seller: sellerId,

            // buyer information
            buyer: buyerId,
        });


        await sendMial(
            seller.email,
            'book sold',
            `the buyer ${buyer.username} bought your book ${book.title}`
        )


        res.status(200).json({
            message: `the book with title ${book.title} sold`,
            purchase: newPurchase,
            buyerName: buyer.username,
            sellerName: seller.username,
            stock: book.stock,
        });
    } catch (error) {
        console.log(error);
    }
}


module.exports = { createBook, getAllBooks, getBookById, updateBook, deleteBook, buyBook };