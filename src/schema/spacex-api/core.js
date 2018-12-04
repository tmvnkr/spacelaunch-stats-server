import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    allCores(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): CoreConnection!
    singleCore(serial: ID!): Core
    multipleCores(serials: [ID]!): [Core]
  }

  type CoreConnection {
    cursor: String!
    hasMore: Boolean!
    cores: [Core]!
  }

  """
  rtls: Return to launch site
  asds: Autonomous spaceport drone ship
  """
  type Core {
    serial: ID!
    block: Int
    status: String!
    launchDate: String
    launchDateUnix: Int
    missions: [CoreMission]
    reuse: Int!
    rtlsAttempts: Int!
    rtlsLandings: Int!
    asdsAttempts: Int!
    asdsLandings: Int!
    waterLanding: Boolean!
    details: String
  }

  type CoreMission {
    name: String
    flight: Int
  }
`;

export default typeDefs;
