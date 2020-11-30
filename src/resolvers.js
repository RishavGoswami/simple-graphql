// mocks
const books = require("../mock/books.json");
const authors = require("../mock/authors.json");

module.exports = {
  Query: {
    book: (parent, args) => books.find((book) => book.id === args.id),
    books: () => books,
    authors: () => authors,
    author: (parent, args) => authors.find((author) => author.id === args.id),
  },
  Mutation: {
    addBook: (parent, { name, authorId }) => {
      const newBook = { id: books.length + 1, name, authorId };
      books.push(newBook);
      return newBook;
    },
    addAuthor: (parent, { name, authorId }) => {
      const newAuthor = { id: books.length + 1, name, authorId };
      authors.push(newAuthor);
      return newAuthor;
    },
  },
};
