const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function authMiddleware(req, res, next) {
    try {
        const auth = req.headers?.authorization; //get the token from req.headers
        if (!auth) return res.status(401).json({ message: 'the token is required' }); //handling any errors

        const token = auth.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'invalid token' }); //handling any errors

        const data = jwt.verify(token, process.env.JWT_SECRET); //get user data from the token

        req.user = data; //make a new key user in req and store the data in it

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'token is invalid or expired' });
        
    }
};

module.exports = { authMiddleware };