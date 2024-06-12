import { Router } from 'express'
// Tweet CRUD

const router = Router();

// Create tweet
router.post('/', (req, res) => {
    res.status(501).json({ error: "Not Implemented"})
});

// List tweets
router.get('/', (req, res) => {
    res.status(501).json({ error: "Not Implemented"})
});

// Retrieve a tweet
router.get('/:id', (req, res) => {
    const { id } =req.params;
    res.status(501).json({ error: `Not Implemented: ${id}`})
});

// Update a tweet
router.put('/:id', (req, res) => {
    const { id } =req.params;
    res.status(501).json({ error: `Not Implemented: ${id}`})
});

// Delete a tweet
router.delete('/:id', (req, res) => {
    const { id } =req.params;
    res.status(501).json({ error: `Not Implemented: ${id}`})
});

export default router;