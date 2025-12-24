const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const dotenv = require("dotenv");
dotenv.config();


async function register(req, res) {
    try {
        const { email, password, username, age, role } = req.body;

        const existEmail = await User.findOne({ email }); //find the email
        const existUsername = await User.findOne({ username }); //find username

        // if the user didn't send the email or the username
        if (!email || !username) return res.status(400).json({ message: 'email and username are required' });


        // if the email is exist
        if (existEmail) return res.status(409).json({ message: 'email already exists' });


        // if the username is exist
        if (existUsername) return res.status(409).json({ message: 'username already in use' });


        const hashedPass = await bcrypt.hash(password, 12); //hashing password

        const user = await User.create({
            email,
            password: hashedPass,
            username,
            age,
        }); //creating user in database

        const token = jwt.sign(
            { id: user._id, role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }); //generate token

        res.status(201).json({ message: 'user created', token, data: { user } });
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
        console.log(error)
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }); //find the email


        //if the user didn't send email or password
        if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

        //if the user send the email wrong
        if (!user) return res.status(400).json({ message: 'invalid email or password' });


        // compare the password that user enter with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: 'invalid email or password' });

        //generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' });

        const data = {
            username: user.username,
            password: user.password,
            email,
            token
        }


        res.status(200).json({ message: 'login successfully', data });

    } catch (error) {
        console.log(error);
    }
}

module.exports = { register, login };