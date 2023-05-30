const BookService = require('./books.service');

// se crea un fake para simular el objeto a tener
const fakeBooks = [
  {
    _id: 1,
    name: 'The art of war',
  },
];
// en este caso se esta haciendo suplantando los metodos de una clase
const MongoLibStub = {
  getAll: () => [...fakeBooks],
  create: () => {},
};
// jest.mock: creas un mock, el primer parametro es para simular la ruta donde se va ir
// el segundo parametro es una función
// jest.fn: crea una función mock que remplazará una función o funciones especificas
// según con la función que le siga
// mockImplementation: sirve para especificar las funciones que hará
jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => MongoLibStub));

describe('', () => {
  let service;

  beforeEach(() => {
    service = new BookService();
    // jest.clearAllMocks(); // lo que hace es limpiar los mockings
  });

  describe('test for getBooks', () => {
    // Arrange
    test('Should return a list book', async () => {
      // Act
      const books = await service.getBooks();
      // console.log(books);
      // Assert
      expect(books.length).toEqual(1);
    });

    test('Should return a name', async () => {
      // Act
      const books = await service.getBooks();
      // console.log(books);
      // Assert
      expect(books[0].name).toEqual('The art of war');
    });
  });
});
