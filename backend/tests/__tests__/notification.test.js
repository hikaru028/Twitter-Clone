import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server';
import User from '../models/userSchema';
import Notification from '../models/notificationSchema';
import { generateToken } from '../utils/generateToken';

describe('Notification API', () => {
    let token;
    let userId;
    let notificationId;

    beforeAll(async () => {
        // Connect to MongoDB
        const url = `mongodb://127.0.0.1/twitter_clone_test`;
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

        // Mock a user
        const user = new User({
            username: 'testuser',
            fullName: 'Test User',
            email: 'testuser@example.com',
            password: 'password123',
        });

        await user.save();
        userId = user._id;
        token = generateToken(user._id);

        // Mock a notification
        const notification = new Notification({
            from: user._id,
            to: user._id,
            type: 'follow',
        });

        await notification.save();
        notificationId = notification._id;
    });

    afterAll(async () => {
        await User.deleteMany();
        await Notification.deleteMany();
        await mongoose.connection.close();
    });

    it('should get notifications for a user', async () => {
        const res = await request(app)
            .get('/api/notifications')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('_id');
        expect(res.body[0]).toHaveProperty('from');
        expect(res.body[0]).toHaveProperty('to');
        expect(res.body[0]).toHaveProperty('type');
    });

    it('should delete all notifications for a user', async () => {
        const res = await request(app)
            .delete('/api/notifications')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Notifications deleted successfully');
    });
});
