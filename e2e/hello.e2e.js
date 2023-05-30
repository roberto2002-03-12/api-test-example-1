// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');

const createApp = require('../src/app');

describe('Test for hello endpoint', () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('test for [GET] /', () => {
    test('Should return "Hello World!', () => {
      request(app).get('/').expect(200).then((response) => {
        expect(response.text).toEqual('Hello World!');
      });
    });
  });
});
