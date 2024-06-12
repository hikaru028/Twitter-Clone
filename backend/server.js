import express from 'express';
import dotenv from 'dotenv';

// Routes
import authRoute from './routes/auth.js';
// Database
import connectMongoDB from './db/connectMongoDB.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use("/api/auth", authRoute);

// Run server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectMongoDB();
});