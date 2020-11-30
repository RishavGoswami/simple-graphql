const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");
const app = express();

const PORT = 5000;

// typeDefs
const { CustomBookType, CustomAuthorType } = require("./src/types");

// resolvers
const { Query, Mutation } = require("./src/resolvers");

// available root queries
const RootQuery = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    book: {
      type: CustomBookType,
      description: "Search for a single Book",
      args: { id: { type: GraphQLInt } },
      resolve: Query.book,
    },
    books: {
      type: new GraphQLList(CustomBookType),
      description: "List of all books",
      resolve: Query.books,
    },
    authors: {
      type: new GraphQLList(CustomAuthorType),
      description: "List of all authors",
      resolve: Query.authors,
    },
    author: {
      type: CustomAuthorType,
      description: "Search for a single Author",
      args: { id: { type: GraphQLInt } },
      resolve: Query.author,
    },
  }),
});

// allows to modify data POST, PUT, DELETE
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: CustomBookType,
      description: "Add a new book",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: Mutation.addBook,
    },
    addAuthor: {
      type: CustomAuthorType,
      description: "Add a new author",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: Mutation.addAuthor,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutationType,
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
