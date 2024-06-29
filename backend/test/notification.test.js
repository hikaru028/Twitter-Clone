import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import createServer from './testserver.js';
import User from '../models/userSchema';
import Notification from '../models/notificationSchema';

let server;
let app;

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/twitter_clone_test`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app = createServer();
  server = app.listen(8002);
});

afterEach(async () => {
  await User.deleteMany();
  await Notification.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe('Notification API Endpoints', () => {
  let token;
  let userId;

  beforeEach(async () => {
    const user = new User({
      email: 'test@example.com',
      username: 'testuser',
      fullName: 'Test User',
      password: await bcrypt.hash('Password123!', 10),
    });
    await user.save();
    userId = user._id;

    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const notification = new Notification({
      to: userId,
      from: userId,
      type: 'follow', // Ensure to include the type field
    });
    await notification.save();
  });

  it('should get notifications for the logged-in user', async () => {
    const res = await request(app)
      .get('/api/notifications')
      .set('Cookie', `jwt=${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('type', 'follow');
  });

  it('should delete notifications for the logged-in user', async () => {
    const res = await request(app)
      .delete('/api/notifications')
      .set('Cookie', `jwt=${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Notifications deleted successfully');

    const remainingNotifications = await Notification.find({ to: userId });
    expect(remainingNotifications.length).toBe(0);
  });
});
