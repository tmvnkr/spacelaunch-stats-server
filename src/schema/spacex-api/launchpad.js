import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    allLaunchpads: [Launchpad]
    singleLaunchpad(id: ID!): Launchpad
    multipleLaunchpads(LaunchpadIds: [ID]!): [Launchpad]
  }

  type Launchpad {
    id: ID!
    status: String!
    location: LaunchpadLocation
    vehiclesLaunched: [String]
    launchAttempts: Int
    launchSuccess: Int
    wikipedia: String
    details: String
    siteId: String
    fullName: String
  }

  type LaunchpadLocation {
    name: String
    region: String
    latitude: Float
    longitude: Float
  }
`;

export default typeDefs;
