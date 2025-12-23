const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const dotenv = require("dotenv");
dotenv.config();


async function register(req, res) {
    try {
        const { email, password, username, age } = req.body;

        const existUser = await User.findOne({ email });
        const existUsername = await User.findOne({ username });
        if (existUser) {
            return res.status(409).json({ message: 'email already exists' });
        }

        if (existUsername) {
            return res.status(409).json({ message: 'username already in use' });
        }

        const hashedPass = await bcrypt.hash(password, 12);

        const user = await User.create({
            email,
            password: hashedPass,
            username,
            age,
        });

        const token = jwt.sign(
            { id: user._id, role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' });

        res.status(201).json({ message: 'user created', token, data: { user } });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
        console.log(error)
    }
}
async function login(req, res) {
    try {
        
    } catch (error) {
        
    }
}

module.exports = { register, login };