const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, minLength: 3, required: true },
    desc: { type: String },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    condition: { type: String, enum: ['new', 'used'], default: 'new' },
    stock: {type: Number, required: true},
    author: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
}, {timestamps: true});


const book = new mongoose.model('books', bookSchema);

module.exports = book;