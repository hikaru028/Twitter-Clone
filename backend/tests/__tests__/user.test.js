import request from 'supertest';
import mongoose from 'mongoose';
import User from '../models/userSchema.js';
import app from '../server.js';
import { generateToken } from '../utils/generateToken.js';

// Connect to a test database before running tests
beforeAll(async () => {
  const url = `mongodb://127.0.0.1/twitter_clone_test`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clean up database after each test
afterEach(async () => {
  await User.deleteMany();
});

// Disconnect from database after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('User API', () => {
  let token;
  let user;

  beforeEach(async () => {
    user = await User.create({
      username: 'testuser',
      fullName: 'Test User',
      password: 'password123',
      email: 'testuser@example.com'
    });

    token = generateToken(user._id);
  });

  test('GET /api/users/profile/:username should return user profile', async () => {
    const res = await request(app)
      .get(`/api/users/profile/${user.username}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', user.username);
  });

  test('GET /api/users/profile/:username should return 404 for non-existing user', async () => {
    const res = await request(app)
      .get(`/api/users/profile/nonexistentuser`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'User not found');
  });

  test('POST /api/users/follow/:id should follow a user', async () => {
    const userToFollow = await User.create({
      username: 'testuser2',
      fullName: 'Test User 2',
      password: 'password123',
      email: 'testuser2@example.com'
    });

    const res = await request(app)
      .post(`/api/users/follow/${userToFollow._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('User follow successfully');

    const updatedUser = await User.findById(user._id);
    expect(updatedUser.following).toContain(userToFollow._id);
  });

  test('POST /api/users/follow/:id should not allow following oneself', async () => {
    const res = await request(app)
      .post(`/api/users/follow/${user._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', "You can't follow/unfollow yourself");
  });

  test('PUT /api/users/profile should update user profile', async () => {
    const updateData = {
      fullName: 'Updated User',
      username: 'updateduser',
      email: 'updateduser@example.com'
    };

    const res = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send(updateData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', updateData.username);
    expect(res.body).toHaveProperty('fullName', updateData.fullName);
    expect(res.body).toHaveProperty('email', updateData.email);
  });

  test('PUT /api/users/profile should return 400 if required fields are missing', async () => {
    const updateData = {
      fullName: '',
      username: '',
      email: ''
    };

    const res = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${token}`)
      .send(updateData);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'User not found');
  });
});
