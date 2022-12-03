/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');

//hay que poner un token de admin nuevo
let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFyaW8gQmVhIiwibmlja25hbWUiOiJNYXJpbyBCZWEiLCJlbWFpbCI6Ik1hcmlvQmVhQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3MDA5NDgwNywiZXhwIjoxNjcwMjAyODA3fQ.DPCDfH04Rhdupay7gtnYfTB53ud-va1wm48Dpjgw7LA';

describe('Get Users', () => {
  it('should create a new deck', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('Success');
  });
});
