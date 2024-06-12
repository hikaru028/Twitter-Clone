import express from 'express';

// Routes
import authRoute from './routes/authRoute.js';

const app = express();
const port = 8000;

app.use("/api/auth", authRoute);

// Run server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});