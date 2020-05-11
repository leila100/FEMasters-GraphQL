import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloLink } from "apollo-link";
import gql from "graphql-tag";

const typeDefs = gql`
  extend type User {
    age: Int
  }
  extend type Pet {
    vaccinated: Boolean
  }
`;

const resolvers = {
  User: {
    age() {
      return 46;
    },
  },
  Pet: {
    vaccinated() {
      return true;
    },
  },
};

const httpLink = new HttpLink({ uri: "http://localhost:4000/" });
const delay = setContext(
  (request) =>
    new Promise((success, fail) => {
      setTimeout(() => success(), 800);
    })
);
const link = ApolloLink.from([delay, httpLink]);
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs,
});

export default client;
