// eslint-disable-next-line import/no-extraneous-dependencies
const request = require('supertest');
const { MongoClient } = require('mongodb');
const { generateManyBook } = require('../src/services/book.fake');
const { config } = require('../src/config');

// primero se crea los mocks, luego se llama a createApp
const createApp = require('../src/app');

describe('Test for get book', () => {
  let app = null;
  let server = null;
  let database = null;
  beforeAll(async () => {
    app = createApp();
    server = app.listen(3001);
    const client = new MongoClient(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(config.dbName);
  });

  afterAll(async () => {
    await server.close();
    // await database.dropDatabase(); utizila esto para borrar la base de datos una vez terminado
  });

  describe('test for [GET] /api/v1/books', () => {
    // nota: esto solo funciona una vez, porque no se esta limpiando la base de datos
    // si quieres evitar dicho error entonces descomenta la línea 27
    test('Should return a list books', async () => {
      // Arrange
      const fakeData = generateManyBook(5);
      const seedData = await database.collection('books').insertMany(fakeData);
      // Act
      request(app).get('/api/v1/books').expect(200).then(({ body }) => {
        expect(body.length).toEqual(seedData.insertedCount);
      });
    });
  });
});
