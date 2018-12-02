/**
 * Schemas are blueprints for all the data that can be accessed in the graph.
 */

import { gql } from 'apollo-server-express';

import launch from './spacex-api/launch';
import capsule from './spacex-api/capsule';
import core from './spacex-api/core';

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

export default [linkSchema, launch, capsule, core];
