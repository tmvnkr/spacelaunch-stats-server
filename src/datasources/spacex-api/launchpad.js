import { RESTDataSource } from 'apollo-datasource-rest';

class Launchpad extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.SPACEX_API_V3_URL;
    this.endpoint = 'launchpads';
  }

  launchpadReducer(launchpad) {
    return {
      id: launchpad.id,
      status: launchpad.status,
      location: {
        name: launchpad.location.name,
        region: launchpad.location.region,
        latitude: launchpad.location.latitude,
        longitude: launchpad.location.longitude
      },
      vehiclesLaunched: launchpad.vehicles_launched,
      launchAttempts: launchpad.attempted_launches,
      launchSuccess: launchpad.successful_launches,
      wikipedia: launchpad.wikipedia,
      details: launchpad.details,
      siteId: launchpad.site_id,
      fullName: launchpad.site_name_long
    };
  }

  async getAllLaunchpads() {
    const response = await this.get(this.endpoint);
    return response && response.length
      ? response.map(launchpad => this.launchpadReducer(launchpad))
      : [];
  }

  async getLaunchpadById({ id }) {
    const response = await this.get(this.endpoint, {
      launchpad_id: id
    });
    return this.launchpadReducer(response[0]);
  }

  async getLaunchpadsByIds({ launchpadIds }) {
    return Promise.all(launchpadIds.map(id => this.getLaunchpadById({ id })));
  }
}

export default Launchpad;
