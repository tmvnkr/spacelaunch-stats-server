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
}

export default SpaceXAPI;
