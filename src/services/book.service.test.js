const BookService = require('./books.service');
const { generateManyBook, generateOneBook } = require('./book.fake');

// con esto hacemos que en cada prueba podamos definir diferente tipo de datos
// esto es un espia
const mockGetAll = jest.fn();
/*
const MongoLibStub = {
  getAll: spyGetAll,
  create: () => {},
};
*/
jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
  getAll: mockGetAll,
  create: () => {},
})));

describe('', () => {
  let service;

  beforeEach(() => {
    service = new BookService();
    jest.clearAllMocks(); // lo que hace es limpiar los mockings
  });

  describe('test for getBooks', () => {
    test('Should return a list book', async () => {
      // Arrange
      const fakeBooks = generateManyBook(20);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks();
      // console.log(books);
      // Assert
      expect(books.length).toEqual(20);
    });

    test('Should return a name', async () => {
      // Arrange
      const book = generateOneBook();
      mockGetAll.mockResolvedValue(book);
      // Act
      const books = await service.getBooks();
      // console.log(books);
      // Assert
      expect(books.name).toEqual(book.name);
    });
  });
});
