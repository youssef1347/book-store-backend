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


        const { username, email, age } = req.body;

        const data = { username, email, age };
        const updatedUser = await User.findByIdAndUpdate(
            id,
            data,
            { new: true },
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'user not found' });
        }

        res.json({ message: 'returned your profile', profileData: updatedUser });
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