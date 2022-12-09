/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');

//hay que poner un token de admin nuevo
let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWVyY3VyaW8iLCJuaWNrbmFtZSI6Ik1lcmN1cmlvIiwiZW1haWwiOiJNZXJjdXJpb0BlbmVsZWNpZWxvLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjcwNTczNzY1LCJleHAiOjE2NzA2ODE3NjV9.o_hiRkiAZJFGVX6RgXhXKzqhE8m4TW5oa3RxNvzv56A';

describe('Get Users', () => {
  it('should create a new deck', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(500);
    expect(res.body.status).toEqual(undefined);
  });
});
