require('dotenv').config();

const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/user');
// const tokenService = require('../lib/utils/token-utils')
// import jwt from 'jsonwebtoken';
// jest.mock(jwt);

describe('skincode-be routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const agent = request.agent(app);
  // for other routes do in before each
  let user;
  beforeEach(() => {
    return agent
      .post('/auth/signup')
      .send({ name: 'tom', email: 'tommyboy@tom.com', password: '1234' });
  });
  //post - sign up user
  it('should signup a user', () => {
    return request(app)
      .post('/auth/signup')
      .send({ name: 'helga', email: 'helga@hellohelga.com', password: '1234' })
      .then((res) => {
        expect(res.body).toEqual({
          id: '2',
          name: 'helga',
          email: 'helga@hellohelga.com',
        });
      });
  });

  //post - make a favorite
  //FOR FUTURE TESTS WITH AUTH USE RETURN AGENT
  it('should save a favorite foundation', () => {
    return agent
      .post('/api/favorites')
      .send({
        username: 1,
        makeup_name: 'mabelline',
        image_link: 'hello.jpg',
        brand: 'almay',
        color: 'blue',
        hex: '#fffff',
        product_link: 'www.google.com',
        date_added: '01:22:2022',
      })
      .then((res) => {
        expect(res.body).toEqual({
          username: '1',
          makeup_name: 'mabelline',
          image_link: 'hello.jpg',
          brand: 'almay',
          color: 'blue',
          hex: '#fffff',
          product_link: 'www.google.com',
          date_added: '01:22:2022',
          id: '1',
        });
      });
  });
});
