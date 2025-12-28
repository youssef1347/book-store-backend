const User = require("../models/userModel");
const Book = require("../models/bookModel");

//get profile
async function getProfile(req, res) {
    try {
        const { id } = req.user;

        const user = await User.findById(id);
        const { username, email, age } = user;

        res.json({ message: 'returned your profile', profileData: { username, email, age } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' });
    }
};


//edit profile
async function editProfile(req, res) {
    try {
        const { id } = req.user;


        const updates = {};
        if (req.body.username) updates.username = req.body.username;
        if (req.body.email) updates.email = req.body.email;
        if (req.body.age) updates.age = req.body.age;


        const updatedUser = await User.findByIdAndUpdate(
            id,
            updates,
            { new: true },
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'user not found' });
        }

        res.json({ message: 'returned your profile', email: updates.email,profileData: updatedUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' });
    }
};


//get user books
async function getUserBooks(req, res) {
    try {
        
    } catch (error) {
        console.log(error);
    }
}


//get user purchases
async function getUserPurchases(req, res) {
    try {
        
    } catch (error) {
        console.log(error);
    }
}


module.exports = { getProfile, editProfile, getUserBooks, getUserPurchases };