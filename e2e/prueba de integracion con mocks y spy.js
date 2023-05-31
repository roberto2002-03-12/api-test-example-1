// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');

const { generateManyBook } = require('../src/services/book.fake');

// creando spy
const mockGetAll = jest.fn();

jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));
// primero se crea los mocks, luego se llama a createApp
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

  describe('test for [GET] /api/v1/books', () => {
    test('Should return a list books', () => {
      // Arrange
      const fakeBooks = generateManyBook(6);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      // siempre se añade un slash al inicio
      return request(app).get('/api/v1/books').expect(200).then(({ body }) => {
        expect(body.length).toEqual(fakeBooks.length);
      });
    });
  });
});
