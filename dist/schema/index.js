"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _apolloServerExpress=require("apollo-server-express"),_spacexdata=_interopRequireDefault(require("./spacexdata"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/**
 * Schemas are blueprints for all the data that can be accessed in the graph.
 */const linkSchema=_apolloServerExpress.gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;var _default=[linkSchema,_spacexdata.default];exports.default=_default;