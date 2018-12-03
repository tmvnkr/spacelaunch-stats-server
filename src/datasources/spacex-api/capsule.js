import { RESTDataSource } from 'apollo-datasource-rest';

class Capsule extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.SPACEX_API_V3_URL;
    this.endpoint = 'capsules';
  }

  capsuleReducer(capsule) {
    return {
      serial: capsule.capsule_serial || 'N/A',
      id: capsule.capsule_id,
      status: capsule.status,
      launchDate: capsule.original_launch,
      launchDateUnix: capsule.original_launch_unix,
      cursor: `${capsule.original_launch_unix}`,
      missions: capsule.missions,
      landings: capsule.landings,
      type: capsule.type,
      details: capsule.details,
      reuse: capsule.reuse_count
    };
  }

  async getAllCapsules() {
    const response = await this.get(this.endpoint);
    return response && response.length
      ? response.map(capsule => this.capsuleReducer(capsule))
      : [];
  }

  async getCapsuleBySerial({ serial }) {
    const response = await this.get(this.endpoint, {
      capsule_serial: serial
    });
    return this.capsuleReducer(response[0]);
  }

  async getCapsulesBySerials({ serials }) {
    return Promise.all(
      serials.map(serial => this.getCapsuleBySerial({ serial }))
    );
  }
}

export default Capsule;
