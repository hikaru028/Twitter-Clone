import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient();

// Create user
router.post('/', async (req, res) => {
    const { email, name, username, password } = req.body;

    try {
        const result = await prisma.user.create({
            data: {
                email,
                name,
                username,
                password
            },
        });
        res.status(201).json(result);
    } catch (error: any) {                               // put type "any"
        res.status(400).json({ error: 'Username and email should be unique.' });
    }
});

// List users
router.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany();

    res.json(allUsers);
});

// Retrieve a user
router.get('/:id', async (req, res) => {
    const { id } =req.params;
    const user = await prisma.user.findUnique({ where: {id: Number(id)}})

    res.json(user);
});

// Update a user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { email, password, bio, image } = req.body;
    
    try {
        const result = await prisma.user.update({
            where: { id: Number(id) },
            data: { email, password, bio, image },
        });
        res.json(result);

    } catch (error: any){
        res.status(400).json({ error: 'Failed to update user'});
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    const { id } =req.params;
    const { password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });

        if (user && user.password === password) {
            await prisma.user.delete({
                where: { id: Number(id) }
            });
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(400).json({ error: 'Incorrect password' });
        }
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

export default router;


// Test with Curl:
// curl -X PUT -H "Content-Type: application/json" \
//      -d '{"name": "Hikaru A", "bio": "Hello!"}' \
//      http://localhost:3000/user/1