import SpaceXAPI from './spacex-api';

class Core extends SpaceXAPI {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v3/';
  }

  coreReducer(core) {
    return {
      core_serial,
      block,
      status,
      original_launch,
      original_launch_unix,
      missions,
      reuse_count,
      rtls_attempts,
      rtls_landings,
      asds_attempts,
      asds_landings,
      water_landing,
      details
    };
  }

  async getAllCores() {
    const response = await this.get('cores');
    return response && response.length
      ? response.map(capsule => this.capsuleReducer(capsule))
      : [];
  }

  async getCapsuleById({ serial }) {
    const response = await this.get('cores', {
      capsule_serial: serial
    });
    return this.capsuleReducer(response[0]);
  }

  getCapsulesByIds({ serials }) {
    return Promise.all(serials.map(serial => this.getCapsuleById({ serial })));
  }
}

export default Core;
