import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    cores: [Core]!
  }

  """
  rtls: Return to launch site
  asds: Autonomous spaceport drone ship
  """
  type Core {
    serial: ID!
    block: Int
    status: String
    launchDate: String
    launchDateUnix: Int
    missions: [Mission]
    reuse: Int
    rtlsAttempts: Int
    rtlsLandings: Int
    asdsAttempts: Int
    asdsLandings: Int
    waterLanding: Boolean
    details: String
  }
`;

export default typeDefs;
