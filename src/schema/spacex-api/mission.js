import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    allMissions: [Mission]
    singleMission(id: ID!): Mission
    multipleMissions(missionIds: [ID]!): [Mission]
  }

  type Mission {
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
