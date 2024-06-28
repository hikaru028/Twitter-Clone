import request from 'supertest';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import createServer from '../server';
import User from '../models/userSchema';

let server;
let app;

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/twitter_clone_test`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app = createServer();
  server = app.listen(8004);
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe('User API Endpoints', () => {
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
  });

  it('should get user profile', async () => {
    const res = await request(app)
      .get(`/api/users/profile/testuser`)
      .set('Cookie', `jwt=${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it('should get suggested users', async () => {
    const anotherUser = new User({
      email: 'another@example.com',
      username: 'anotheruser',
      fullName: 'Another User',
      password: await bcrypt.hash('Password123!', 10),
    });
    await anotherUser.save();

    const res = await request(app)
      .get('/api/users/suggested')
      .set('Cookie', `jwt=${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should follow and unfollow a user', async () => {
    const anotherUser = new User({
      email: 'another@example.com',
      username: 'anotheruser',
      fullName: 'Another User',
      password: await bcrypt.hash('Password123!', 10),
    });
    await anotherUser.save();

    const followRes = await request(app)
      .post(`/api/users/follow/${anotherUser._id}`)
      .set('Cookie', `jwt=${token}`);
    expect(followRes.statusCode).toEqual(200);
    expect(followRes.body).toHaveProperty('message', 'User follow successfully');

    const unfollowRes = await request(app)
      .post(`/api/users/follow/${anotherUser._id}`)
      .set('Cookie', `jwt=${token}`);
    expect(unfollowRes.statusCode).toEqual(200);
    expect(unfollowRes.body).toHaveProperty('message', 'User unfollowing successfully');
  });

  it('should update user profile', async () => {
    const res = await request(app)
      .post('/api/users/update')
      .set('Cookie', `jwt=${token}`)
      .send({
        fullName: 'Updated Test User',
        username: 'updatedtestuser',
        email: 'updated@example.com',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('fullName', 'Updated Test User');
    expect(res.body).toHaveProperty('username', 'updatedtestuser');
    expect(res.body).toHaveProperty('email', 'updated@example.com');
  });
});
