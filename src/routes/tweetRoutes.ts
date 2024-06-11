import { Router } from 'express'

const router = Router();

router.get('/', (req, res) => { // A customer need to GET info, 
    res.send('Hello!'); // then the server responds to send " hello!" 
});

// Create user
router.post('/user', (req, res) => {
    res.status(501).json({ error: "Not Implemented"})
});

// List users
router.get('/user', (req, res) => {
    res.status(501).json({ error: "Not Implemented"})
});

// Retrieve a user
router.get('/user/:id', (req, res) => {
    const { id } =req.params;
    res.status(501).json({ error: `Not Implemented: ${id}`})
});

export default router;