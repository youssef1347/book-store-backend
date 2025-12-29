const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { sendMial } = require("../utils/sendEmail");
dotenv.config();


async function register(req, res) {
    try {
        const { email, password, username, age, role } = req.body;

        // if the user didn't send the email or the username
        if (!email || !username || !password) return res.status(400).json({ message: 'email and username and password are required' });


        const existEmail = await User.findOne({ email }); //find the email
        const existUsername = await User.findOne({ username }); //find username

        // if the email is exist
        if (existEmail) return res.status(409).json({ message: 'email already exists' });


        // if the username is exist
        if (existUsername) return res.status(409).json({ message: 'username already in use' });


        const hashedPass = await bcrypt.hash(password, 12); //hashing password

        //generate random token for email confirmation
        const emailToken = crypto.randomBytes(32).toString("hex");

        const user = await User.create({
            email,
            password: hashedPass,
            username,
            age,
            emailToken,
        }); //creating user in database

        const verifyLink = `http://localhost:8080/api/auth/verify_email/${emailToken}`;

        await sendMial(
            email,
            'email confirmation',
            `click the link to verify your email `,
            `<a href="${verifyLink}">verify email</a>`
        );

        const token = jwt.sign(
            { id: user._id, role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }); //generate token


        const data = {
            username: user.username,
            email: user.email,
            age: user.age,
            emailToken,
        }

        res.status(201).json({ message: 'user created, please verify your email', token, data });
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

        //check if the user verify the email
        if (!user.emailVerified) {
            return res.status(403).json({ message: 'please verify your email' });
        }

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
            email,
            token
        }


        res.status(200).json({ message: 'login successfully', data });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}


//email confirmation
async function verifyEmail(req, res) {
    try {
        const { token } = req.params;

        const user = await User.findOne({ emailToken: token });

        if (!user) return res.status(400).json({ message: 'the token is invalid' });

        user.emailVerified = true; //make the email verified
        user.emailToken = undefined; //delete the email token
        await user.save();

        res.status(200).json({ message: 'email verified' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
}

module.exports = { register, login, verifyEmail };