import express from 'express'
import userRoutes from './routes/userRoutes'
import tweetRoutes from './routes/tweetRoutes'

const app = express();
app.use(express.json());

const port =3000;
app.use('/user', userRoutes);
app.use('/tweet', tweetRoutes);

app.get('/', (req, res) => { // A customer need to GET info, 
    res.send('Hello everyone!'); // then the server responds to send " hello!" 
});

// Connect to the server
app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});