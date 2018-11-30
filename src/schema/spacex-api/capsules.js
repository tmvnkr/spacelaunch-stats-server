import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    capsules: [Capsule]!
    capsule(serial: ID!): Capsule
  }

  type Capsule {
    serial: ID!
    id: String!
    status: String!
    launchDate: String
    launchDateUnix: Int
    missions: [Mission]
    landings: Int!
    type: String!
    details: String
    reuse: Int!
  }

  extend type Mission {
    name: String
    flight: Int
  }
`;

export default typeDefs;
