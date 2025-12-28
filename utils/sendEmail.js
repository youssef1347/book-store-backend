const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
    }
});

async function sendMial(to, subject, text, html) {
    try {
        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to,
            subject,
            text,
            html
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendMial };