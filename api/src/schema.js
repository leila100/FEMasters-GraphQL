const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID!
    userName: String!
    pets: [Pet]!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
    img: String!
    user: User!
  }

  input PetInput {
    type: String
  }

  input NewPetInput {
    name: String!
    type: String!
  }

  type Query {
    pets(input: PetInput): [Pet]!
    pet(id: ID!): Pet
    me: User!
  }

  type Mutation {
    newPet(input: NewPetInput!): Pet
  }
`;

module.exports = typeDefs;
