/**
 * Resolvers provide the instructions for turning a GraphQL operation (a query, mutation, or subscription) into data.
 * They either return the same type of data we specify in our schema or a promise for that data.
 *
 * Resolver functions accept four arguments:
 * fieldName: (parent, args, context, info) => data
 *
 * - parent:  An object that contains the result returned from the resolver on the parent type
 * - args:    An object that contains the arguments passed to the field
 * - context: An object shared by all resolvers in a GraphQL operation. We use the context to contain
 *            per-request state such as authentication information and access our data sources.
 * - info:    Information about the execution state of the operation which should only be used in advanced cases
 */

import launch from './spacex-api/launch';
import capsule from './spacex-api/capsule';

export default [capsule, launch];
