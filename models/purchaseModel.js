const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'books' },
    price: { type: Number, required: true },
    status: { type: String, enum: ['completed', 'cancelled'], default: 'completed' },
}, { timestamps: true });


const purchase = new mongoose.model('purchase', purchaseSchema);

module.exports = purchase;