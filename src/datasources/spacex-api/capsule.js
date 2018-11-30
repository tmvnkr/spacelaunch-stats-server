/**
 * API INFO
 *
 * project_name:        SpaceX-API
 * version:             3.0.0
 * project_link:        https://github.com/r-spacex/SpaceX-API
 * docs:                https://documenter.getpostman.com/view/2025350/RWaEzAiG
 * organization:        r/SpaceX
 * organization_link:   https://github.com/r-spacex
 * description          Open Source REST API for rocket, core, capsule, pad, and launch data, created
 *                      and maintained by the developers of the r/SpaceX organization
 */

import { RESTDataSource } from 'apollo-datasource-rest';

class Capsule extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v3/';
  }

  capsuleReducer(capsule) {
    return {
      serial: capsule.capsule_serial || 'N/A',
      id: capsule.capsule_id,
      status: capsule.status,
      launchDate: capsule.original_launch,
      launchDateUnix: capsule.original_launch_unix,
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

  getCapsulesByIds({ serials }) {
    return Promise.all(serials.map(serial => this.getCapsuleById({ serial })));
  }
}

export default Capsule;
