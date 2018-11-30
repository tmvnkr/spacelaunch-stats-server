/**
 * Schemas are blueprints for all the data that can be accessed in the graph.
 */

import { gql } from 'apollo-server-express';

import capsuleSchema from './spacex-api/capsules';
import launchSchema from './spacex-api/launches';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  type Mission {
    _: Boolean
  }
`;

export default [linkSchema, capsuleSchema, launchSchema];
