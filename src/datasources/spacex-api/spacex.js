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

class SpaceX extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.SPACEX_API_V3_URL;
    this.endpoint = 'info';
  }

  infoReducer(info) {
    return {
      name: info.name,
      founder: info.founder,
      founded: info.founded,
      employees: info.employees,
      vehicles: info.vehicles,
      launchSites: info.launch_sites,
      testSites: info.test_sites,
      ceo: info.ceo,
      cto: info.cto,
      coo: info.coo,
      ctoPropulsion: info.cto_propulsion,
      valuation: info.valuation,
      headquarter: {
        address: info.headquarters.address,
        city: info.headquarters.city,
        state: info.headquarters.state
      },
      links: {
        website: info.links.website,
        flickr: info.links.flickr,
        twitter: info.links.flickr,
        elonTwitter: info.links.elon_twitter
      },
      summary: info.summary
    };
  }

  async getInfo() {
    const response = await this.get(this.endpoint);
    return this.infoReducer(response);
  }
}

export default SpaceX;
