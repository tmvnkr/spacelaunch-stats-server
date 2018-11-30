/**
 * datasources are classes that encapsulate all of the data fetching logic ,as well
 * as caching and deduplication, for a particular service.
 *
 * Reducers transform the data into the shape defined by the schema.
 */

import Capsule from './spacex-api/capsule';
import Launch from './spacex-api/launch';

const dataSources = () => ({
  sxCapsule: new Capsule(),
  sxLaunch: new Launch()
});

export default dataSources;
