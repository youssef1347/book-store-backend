const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, minLength: 3, required: true },
    author: { type: String, minLength: 3, required: true },
    desc: { type: String },
    price: { type: Number, required: true },
    img: { type: String, required: true },
});


const book = new mongoose.model('books', bookSchema);

module.exports = book;