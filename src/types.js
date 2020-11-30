const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const books = require("../mock/books.json");
const authors = require("../mock/authors.json");

const CustomBookType = new GraphQLObjectType({
  name: "Book",
  description: "This is the representation of a book written by an author.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    year: { type: GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLNonNull(GraphQLString) },
    language: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: CustomAuthorType,
      // getting the book from the book type on line 12
      resolve: (book) => authors.find((author) => author.id === book.authorId),
    },
  }),
});

const CustomAuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This is the representation of an author.",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(CustomBookType),
      resolve: (author) => books.filter((book) => book.id === author.id),
    },
  }),
});

module.exports = {
  CustomBookType,
  CustomAuthorType,
};
