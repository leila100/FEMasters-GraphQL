const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    userName: String!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
    img: String!
  }

  input PetInput {
    type: String
  }

  type Query {
    pets(input: PetInput): [Pet]!
  }
`;

module.exports = typeDefs;
