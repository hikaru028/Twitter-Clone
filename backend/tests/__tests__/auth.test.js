import request from 'supertest';
import app from '../server'; // assuming your server file is named server.js
import mongoose from 'mongoose';
import User from '../models/userSchema';

beforeAll(async () => {
  // Set up a test database connection
  const url = `mongodb://127.0.0.1/twitter-clone-test`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth API', () => {
  let token;

  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        fullName: 'Test User',
        password: 'Password123!'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  it('should log in an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'Password123!'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('email', 'test@example.com');
    token = res.headers['set-cookie'][0].split(';')[0].split('=')[1]; // Extract JWT token from cookie
  });

  it('should get the logged in user profile', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Cookie', `jwt=${token}`); // Set the JWT token in the cookie

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'testuser');
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  it('should log out the user', async () => {
    const res = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', `jwt=${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Logged out successfully');
  });
});
