/**
 * datasources are classes that encapsulate all of the data fetching logic ,as well
 * as caching and deduplication, for a particular service.
 *
 * Reducers transform the data into the shape defined by the schema.
 */

import Launch from './spacex-api/launch';
import Capsule from './spacex-api/capsule';
import Core from './spacex-api/core';

const dataSources = () => ({
  sxLaunch: new Launch(),
  sxCapsule: new Capsule(),
  sxCore: new Core()
});

export default dataSources;
