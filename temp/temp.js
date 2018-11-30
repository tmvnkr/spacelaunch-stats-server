import { RESTDataSource } from 'apollo-datasource-rest';

/**
 * SpaceX SpaceXDataAPI data source.
 * @class SpaceXDataAPI
 * @extends {RESTDataSource}
 */
class SpaceXDataAPI extends RESTDataSource {
  /**
   * Creates an instance of SpaceXDataAPI and set the base URL for the API.
   * @memberof SpaceXDataAPI
   */
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v3/';
  }

  /**
   * Transform data in form of launch schema.
   * @param {array} launch
   * @returns launch array
   * @memberof SpaceXDataAPI
   */
  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type
      }
    };
  }

  /**
   * Make GET request and return an array with launches.
   * @returns array with launches OR empty array
   * @memberof SpaceXDataAPI
   */
  async getAllLaunches() {
    const response = await this.get('launches');
    return response && response.length
      ? response.map(launch => this.launchReducer(launch))
      : [];
  }

  /**
   * Return data for a particular launch.
   * @param {ID} { launchId }
   * @returns single launch
   * @memberof SpaceXDataAPI
   */
  async getLaunchById({ launchId }) {
    const response = await this.get('launches', { flight_number: launchId });
    return this.launchReducer(response[0]);
  }

  /**
   * Returns several launches based on their respective launchIds.
   * @param {ID} { launchIds }
   * @returns multiple launches
   * @memberof SpaceXDataAPI
   */
  getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId }))
    );
  }
}

export default SpaceXDataAPI;
