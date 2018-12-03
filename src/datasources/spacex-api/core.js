import { RESTDataSource } from 'apollo-datasource-rest';

class Core extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.SPACEX_API_V3_URL;
    this.endpoint = 'cores';
  }

  coreReducer(core) {
    return {
      serial: core.core_serial,
      block: core.block,
      status: core.status,
      launchDate: core.original_launch,
      launchDateUnix: core.original_launch_unix,
      cursor: `${core.original_launch_unix}`,
      missions: core.missions,
      reuse: core.reuse_count,
      rtlsAttempts: core.rtls_attempts,
      rtlsLandings: core.rtls_landings,
      asdsAttempts: core.asds_attempts,
      asdsLandings: core.asds_landings,
      waterLanding: core.water_landing,
      details: core.details
    };
  }

  async getAllCores() {
    const response = await this.get(this.endpoint);
    return response && response.length
      ? response.map(core => this.coreReducer(core))
      : [];
  }

  async getCoreBySerial({ serial }) {
    const response = await this.get(this.endpoint, {
      core_serial: serial
    });
    return this.coreReducer(response[0]);
  }

  getCoresBySerials({ serials }) {
    return Promise.all(serials.map(serial => this.getCoreBySerial({ serial })));
  }
}

export default Core;
