import SpaceXAPI from './spacex-api';

class Core extends SpaceXAPI {
  constructor() {
    super();
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
    const response = await this.get('cores');
    return response && response.length
      ? response.map(core => this.coreReducer(core))
      : [];
  }

  async getCoreById({ serial }) {
    const response = await this.get('cores', {
      core_serial: serial
    });
    return this.coreReducer(response[0]);
  }

  getCoresByIds({ serials }) {
    return Promise.all(serials.map(serial => this.getCoreById({ serial })));
  }
}

export default Core;
