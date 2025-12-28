const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, minLength: 3, unique: true, required: true },
    age: { type: Number, min: 10, max: 100 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    emailVerified: { type: Boolean, default: false },
    emailToken: { type: String },
}, { timestamps: true });


const User = new mongoose.model('users', userSchema);

module.exports = User;