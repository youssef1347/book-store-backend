const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

exports.connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('mongoDB connected');
    } catch (error) {
        console.log(error);
    }
};
