"use strict";var _SpaceXDataAPI=_interopRequireDefault(require("./SpaceXDataAPI"));Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}/**
 * datasources are classes that encapsulate all of the data fetching logic ,as well
 * as caching and deduplication, for a particular service.
 *
 * Reducers transform the data into the shape defined by the schema.
 *
 */var _default=_SpaceXDataAPI.default;exports.default=_default;