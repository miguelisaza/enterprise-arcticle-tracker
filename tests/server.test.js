const request = require('supertest');
const server = require('../server');

describe('User Registration', () => {
  test('should create a new Standard user', async () => {
    const newUser = {
      email: 'testuser@example.com',
      username: 'testuser',
      password: 'testpassword',
      isAdmin: false
    };

    const res = await request(server)
      .post('/api/users')
      .send(newUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('User created!');
    expect(res.body).not.toHaveProperty('password');
  });
});