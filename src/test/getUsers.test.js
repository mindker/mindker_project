/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../server');

//hay que poner un token de admin nuevo
let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWFyaW8gQmVhIiwibmlja25hbWUiOiJNYXJpbyBCZWEiLCJlbWFpbCI6Ik1hcmlvQmVhQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3MDQxMDUwNiwiZXhwIjoxNjcwNTE4NTA2fQ.GVb7i-yvl6c3sokJk7lB5pFx-5Q0_zNYZtpgaySp0K0';


describe('Get Users', () => {
  it('should create a new deck', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('Success');
  });
});
