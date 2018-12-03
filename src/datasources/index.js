/**
 * datasources are classes that encapsulate all of the data fetching logic ,as well
 * as caching and deduplication, for a particular service.
 *
 * Reducers transform the data into the shape defined by the schema.
 */

import SpaceXAPI from './spacex-api/spacex-api';
import Launch from './spacex-api/launch';
import Capsule from './spacex-api/capsule';
import Core from './spacex-api/core';
import Mission from './spacex-api/mission';

const dataSources = () => ({
  spaceXAPI: new SpaceXAPI(),
  sxLaunch: new Launch(),
  sxCapsule: new Capsule(),
  sxCore: new Core(),
  sxMission: new Mission()
});

export default dataSources;
