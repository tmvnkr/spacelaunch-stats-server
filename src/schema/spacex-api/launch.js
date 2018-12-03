import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    allLaunches(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): Connection!
    singleLaunch(id: ID!): Launch
  }

  extend type Connection {
    launches: [Launch]!
  }

  type Launch {
    id: ID!
    name: String!

    site: String
    mission: LaunchMission
    rocket: Rocket
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type LaunchMission {
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

export default typeDefs;
