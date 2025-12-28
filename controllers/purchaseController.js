const Purchase = require("../models/purchaseModel");


async function getAllPurchases(req, res) {
    try {
            const purchases = await Purchase.find()
                .populate('book', 'title author')
                .populate('seller', 'email username')
                .populate('buyer', 'email username');

        
        console.log(purchases);
        res.status(200).json({ message: 'all purchases returned', purchases });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}


module.exports = { getAllPurchases };