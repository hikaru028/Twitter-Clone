import request from 'supertest';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import createServer from '../server';
import User from '../models/userSchema';

let server;
let app;

// Connect to a test database and start the server
beforeAll(async () => {
  const url = `mongodb://127.0.0.1/twitter_clone_test`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app = createServer(); // Create a new server instance
  server = app.listen(8001); // Use a different port for testing
});

// Clean up the database after each test
afterEach(async () => {
  await User.deleteMany();
});

// Close the database connection and server after all tests
afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe('Auth API Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        fullName: 'Test User',
        password: 'Password123!',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it('should not register a user with an existing username', async () => {
    await new User({
      email: 'existing@example.com',
      username: 'existinguser',
      fullName: 'Existing User',
      password: 'Password123!',
    }).save();

    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@example.com',
        username: 'existinguser',
        fullName: 'Test User',
        password: 'Password123!',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Username is already taken');
  });

  it('should login an existing user', async () => {
    const user = new User({
      email: 'test@example.com',
      username: 'testuser',
      fullName: 'Test User',
      password: await bcrypt.hash('Password123!', 10),
    });
    await user.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'Password123!',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it('should not login with incorrect password', async () => {
    const user = new User({
      email: 'test@example.com',
      username: 'testuser',
      fullName: 'Test User',
      password: await bcrypt.hash('Password123!', 10),
    });
    await user.save();

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'WrongPassword!',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Invalid username or password');
  });

  it('should get logged in user details', async () => {
    const user = new User({
      email: 'test@example.com',
      username: 'testuser',
      fullName: 'Test User',
      password: await bcrypt.hash('Password123!', 10),
    });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const res = await request(app)
      .get('/api/auth/me')
      .set('Cookie', `jwt=${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it('should logout the user', async () => {
    const user = new User({
      email: 'test@example.com',
      username: 'testuser',
      fullName: 'Test User',
      password: await bcrypt.hash('Password123!', 10),
    });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const res = await request(app)
      .post('/api/auth/logout')
      .set('Cookie', `jwt=${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Logged out successfully');
  });
});
