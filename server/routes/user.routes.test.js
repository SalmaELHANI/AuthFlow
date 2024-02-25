const request = require('supertest');
const app = require('../app'); 

describe('Authentication Controller', () => {
  let createdUserId;

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        username: 'TestUser',
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User Created');
    createdUserId = response.body._id;
  });


  it('should log in the registered user', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });


  it('should logout the user', async () => {
    const token = 'mock_access_token';

    const response = await request(app)
      .post('/user/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Logout successful');
  });
});
