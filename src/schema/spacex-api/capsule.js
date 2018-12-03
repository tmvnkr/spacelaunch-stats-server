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
    ): Connection!
    singleCapsule(serial: ID!): Capsule
    multipleCapsules(serials: [ID]!): [Capsule]
  }

  extend type Connection {
    capsules: [Capsule]!
  }

  type Capsule {
    serial: ID!
    id: String!
    status: String!
    launchDate: String
    launchDateUnix: Int
    missions: [CapsuleMission]
    landings: Int!
    type: String!
    details: String
    reuse: Int!
  }

  type CapsuleMission {
    name: String
    flight: Int
  }
`;

export default typeDefs;
