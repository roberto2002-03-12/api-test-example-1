// eslint-disable-next-line import/no-extraneous-dependencies
const { faker } = require('@faker-js/faker');

const generateOneBook = () => ({
  _id: faker.string.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
});
// esta utilizando doble flecha para que al final
// puede reutilizar la función sin tener que definir otra
// en la cual pase los parametros nuevamente, no sé por qué
// utiliza de esta manera, hay dos razones, es a su manera o
// lo veré más adelante.
// la razón: se equivoco, y yo ropiendome la cabeza para saber
// el por qué
const generateManyBook = (size) => {
  const limit = size ?? 10;
  const fakeBooks = [];
  for (let index = 0; index < limit; index += 1) {
    fakeBooks.push(generateOneBook());
  }
  return [...fakeBooks];
};

// () => () => significa función que retorna otra función

module.exports = { generateManyBook, generateOneBook };
