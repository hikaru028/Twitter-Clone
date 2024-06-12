import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient();

// Tweet CRUD
// Create a tweet
router.post('/', async (req, res) => {
    const { content, image, userId } = req.body;

    try {
        const result = await prisma.tweet.create({
            data: {
                content,
                image,
                userId,
            },
        });
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: 'Failed to create tweet.' });
    }
});

// List tweets
router.get('/', async (req, res) => {
    try {
        const tweets = await prisma.tweet.findMany();
        res.json(tweets);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch tweets.' });
    }
});

// Retrieve a tweet
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const tweet = await prisma.tweet.findUnique({ where: { id: Number(id) } });
        if (tweet) {
            res.json(tweet);
        } else {
            res.status(404).json({ error: 'Tweet not found.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch tweet.' });
    }
});

// Update a tweet
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content, image } = req.body;
    
    try {
        const result = await prisma.tweet.update({
            where: { id: Number(id) },
            data: { content, image },
        });
        res.json(result);

    } catch (error: any){
        res.status(400).json({ error: 'Failed to update tweet'});
    }
});

// Delete a tweet
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        // Fetch the tweet by its ID
        const tweet = await prisma.tweet.findUnique({
            where: { id: Number(id) },
        });

        if (!tweet) {
            return res.status(404).json({ error: 'Tweet not found' });
        }

        // Fetch the user associated with the tweet
        const user = await prisma.user.findUnique({
            where: { id: tweet.userId },
        });

        if (user && user.password === password) {
            // Delete the tweet if the password matches
            await prisma.tweet.delete({
                where: { id: Number(id) },
            });
            res.status(200).json({ message: 'Tweet deleted successfully' });
        } else {
            res.status(400).json({ error: 'Incorrect password' });
        }
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to delete tweet' });
    }
});

export default router;