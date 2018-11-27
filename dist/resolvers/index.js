"use strict";var _spacexdata=_interopRequireDefault(require("./spacexdata"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/**
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
 */var _default=_spacexdata.default;exports.default=_default;