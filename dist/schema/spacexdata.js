"use strict";var _apolloServerExpress=require("apollo-server-express");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const typeDefs=_apolloServerExpress.gql`
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
`;var _default=typeDefs;exports.default=_default;