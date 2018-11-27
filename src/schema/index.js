/**
 * Schemas are blueprints for all the data that can be accessed in the graph.
 */

import { gql } from 'apollo-server-express';

import spacexdataSchema from './spacexdata';

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
`;

export default [linkSchema, spacexdataSchema]; 
