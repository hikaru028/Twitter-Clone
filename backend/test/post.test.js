import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import createServer from '../server.js';
import User from '../models/userSchema';
import Post from '../models/postSchema';

let server;
let app;

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/twitter_clone_test`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app = createServer();
  server = app.listen(8003);
});

afterEach(async () => {
  await User.deleteMany();
  await Post.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe('Post API Endpoints', () => {
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

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts/create')
      .set('Cookie', `jwt=${token}`)
      .send({
        text: 'This is a test post',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('text', 'This is a test post');
    expect(res.body).toHaveProperty('user', userId.toString());
  });

  it('should get all posts', async () => {
    const post = new Post({
      user: userId,
      text: 'This is a test post',
    });
    await post.save();

    const res = await request(app)
      .get('/api/posts/all')
      .set('Cookie', `jwt=${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('text', 'This is a test post');
  });

  it('should like and unlike a post', async () => {
    const post = new Post({
      user: userId,
      text: 'This is a test post',
    });
    await post.save();

    const likeRes = await request(app)
      .post(`/api/posts/like/${post._id}`)
      .set('Cookie', `jwt=${token}`);
    expect(likeRes.statusCode).toEqual(200);
    expect(likeRes.body).toContain(userId.toString());

    const unlikeRes = await request(app)
      .post(`/api/posts/like/${post._id}`)
      .set('Cookie', `jwt=${token}`);
    expect(unlikeRes.statusCode).toEqual(200);
    expect(unlikeRes.body).not.toContain(userId.toString());
  });

  it('should comment on a post', async () => {
    const post = new Post({
      user: userId,
      text: 'This is a test post',
    });
    await post.save();

    const res = await request(app)
      .post(`/api/posts/comment/${post._id}`)
      .set('Cookie', `jwt=${token}`)
      .send({
        text: 'This is a test comment',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.comments.length).toBeGreaterThan(0);
    expect(res.body.comments[0]).toHaveProperty('text', 'This is a test comment');
  });

  it('should delete a post', async () => {
    const post = new Post({
      user: userId,
      text: 'This is a test post',
    });
    await post.save();

    const res = await request(app)
      .delete(`/api/posts/${post._id}`)
      .set('Cookie', `jwt=${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Post deleted successfully');

    const deletedPost = await Post.findById(post._id);
    expect(deletedPost).toBeNull();
  });
});
