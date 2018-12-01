import SpaceXAPI from './spacex-api';

class Capsule extends SpaceXAPI {
  constructor() {
    super();
  }

  capsuleReducer(capsule) {
    return {
      serial: capsule.capsule_serial || 'N/A',
      id: capsule.capsule_id,
      status: capsule.status,
      launchDate: capsule.original_launch,
      launchDateUnix: capsule.original_launch_unix,
      cursor: `${launchDateUnix}`,
      missions: capsule.missions,
      landings: capsule.landings,
      type: capsule.type,
      details: capsule.details,
      reuse: capsule.reuse_count
    };
  }

  async getAllCapsules() {
    const response = await this.get('capsules');
    return response && response.length
      ? response.map(capsule => this.capsuleReducer(capsule))
      : [];
  }

  async getCapsuleById({ serial }) {
    const response = await this.get('capsules', {
      capsule_serial: serial
    });
    return this.capsuleReducer(response[0]);
  }

  async getCapsulesByIds({ serials }) {
    return Promise.all(serials.map(serial => this.getCapsuleById({ serial })));
  }
}

export default Capsule;
