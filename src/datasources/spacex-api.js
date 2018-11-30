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

class SpaceXAPI extends RESTDataSource {
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

  async getAllLaunches() {
    const response = await this.get('launches');
    return response && response.length
      ? response.map(launch => this.launchReducer(launch))
      : [];
  }

  async getLaunchById({ launchId }) {
    const response = await this.get('launches', { flight_number: launchId });
    return this.launchReducer(response[0]);
  }

  getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId }))
    );
  }
}

export default SpaceXAPI;
