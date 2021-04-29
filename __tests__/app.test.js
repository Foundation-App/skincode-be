const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/user');


describe('skincode-be routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should signup a user', async() =>  {
    await 


  })




});
