const BookService = require('./books.service');

const fakeBooks = [
  {
    _id: 1,
    name: 'The art of war',
  },
];

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
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const books = await service.getBooks();
      // console.log(books);
      // Assert
      expect(books.length).toEqual(1);
    });

    test('Should return a name', async () => {
      // Arrange
      mockGetAll.mockResolvedValue([
        {
          _id: 1,
          name: 'The art of war 2',
        },
      ]);
      // Act
      const books = await service.getBooks();
      // console.log(books);
      // Assert
      expect(books[0].name).toEqual('The art of war 2');
    });
  });
});
