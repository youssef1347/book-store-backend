const express = require("express");
const dotenv = require("dotenv");
const { connectDatabase } = require("./utils/db");
const authRoute = require('./routes/authRoutes');
const bookRoute = require("./routes/bookRoutes");
const purchaseRoute = require("./routes/purchaseRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;


connectDatabase();



app.use('/api/auth', authRoute);
app.use('/api/book', bookRoute);
app.use('/api/purchase', purchaseRoute);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`app is runinng on port ${PORT}`);
});