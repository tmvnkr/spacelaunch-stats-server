import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    launches: [Launch]!
    launch(id: ID!): Launch
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

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

export default typeDefs;
