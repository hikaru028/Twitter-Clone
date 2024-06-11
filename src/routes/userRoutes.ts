import { Router } from 'express'

const router = Router();

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

// Update a user
router.put('/user/:id', (req, res) => {
    const { id } =req.params;
    res.status(501).json({ error: `Not Implemented: ${id}`})
});

// Delete a user
router.delete('/user/:id', (req, res) => {
    const { id } =req.params;
    res.status(501).json({ error: `Not Implemented: ${id}`})
});

export default router;