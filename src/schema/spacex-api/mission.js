import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    allMissions: [Mission]
    missions(ids: [ID]!): [Mission]
    mission(id: ID!): Mission
  }

  type MissionConnection {
    cursor: String!
    hasMore: Boolean!
    missions: [Mission]!
  }

  extend type Mission {
    id: ID!
    name: String!
    manufacturers: [String]
    payloadIds: [String]
    wikipedia: String
    website: String
    twitter: String
    description: String
  }
`;

export default typeDefs;
