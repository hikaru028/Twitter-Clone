import request from 'supertest';
import mongoose from 'mongoose';
import app from '../backend/server.js';
import User from '../models/userSchema.js';
import Post from '../models/postSchema.js';
import { generateToken } from '../utils/generateToken.js';

// Mock data
const userId = new mongoose.Types.ObjectId();
const postId = new mongoose.Types.ObjectId();
const token = generateToken(userId);

beforeAll(async () => {
  // Connect to the database
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // a mock user
  await User.create({
    _id: userId,
    username: 'testuser',
    fullName: 'Test User',
    password: 'password123',
    email: 'testuser@example.com',
  });

  // a mock post
  await Post.create({
    _id: postId,
    user: userId,
    text: 'This is a test post',
  });
});

afterAll(async () => {
  // Clean up the database
  await User.deleteMany({});
  await Post.deleteMany({});
  await mongoose.connection.close();
});

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        text: 'This is another test post',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all posts', async () => {
    const res = await request(app)
      .get('/api/posts/all')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should like/unlike a post', async () => {
    const res = await request(app)
      .post(`/api/posts/like/${postId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should comment on a post', async () => {
    const res = await request(app)
      .post(`/api/posts/comment/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        text: 'This is a test comment',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.comments.length).toBeGreaterThan(0);
  });

  it('should delete a post', async () => {
    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
  });
});
