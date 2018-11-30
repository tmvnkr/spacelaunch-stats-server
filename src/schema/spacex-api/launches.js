import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    launches(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  extend type Mission {
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

export default typeDefs;
