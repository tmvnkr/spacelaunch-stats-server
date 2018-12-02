import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    allCapsules(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): CapsuleConnection!
    capsules(serials: [ID]!): [Capsule]
    capsule(serial: ID!): Capsule
  }

  type CapsuleConnection {
    cursor: String!
    hasMore: Boolean!
    capsules: [Capsule]!
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
