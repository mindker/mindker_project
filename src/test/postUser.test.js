/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');

describe('Post User', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/api/v1/users/').send({
      name: 'pulgarcito',
      nickname: 'pulgarcito',
      email: 'pulgarcitorexulon@gmail.com',
      password: 'estoesj123',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toEqual('Success');
  });
});
