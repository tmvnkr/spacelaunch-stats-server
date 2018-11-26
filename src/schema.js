const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Pet {
    name: String!
  }

  type User {
    id: ID!
    username: String!
    age: Int!
    pets: [Pet]
  }
`;

module.exports = typeDefs;
