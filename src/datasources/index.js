/**
 * datasources are classes that encapsulate all of the data fetching logic ,as well
 * as caching and deduplication, for a particular service.
 *
 * Reducers transform the data into the shape defined by the schema.
 */

import SpaceX from './spacex-api/spacex';
import Launch from './spacex-api/launch';
import Capsule from './spacex-api/capsule';
import Core from './spacex-api/core';
import Mission from './spacex-api/mission';
import Launchpad from './spacex-api/launchpad';

import Forecast from './weather-api/forecast';

const dataSources = () => ({
  //SpaceX API
  sxInfo: new SpaceX(),
  sxLaunch: new Launch(),
  sxCapsule: new Capsule(),
  sxCore: new Core(),
  sxMission: new Mission(),
  sxLaunchpad: new Launchpad(),
  //Open Weather Map API
  owmForecast: new Forecast()
});

export default dataSources;
