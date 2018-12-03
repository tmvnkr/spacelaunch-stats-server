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

export default {
  Query: {
    information: (_, __, { dataSources }) => dataSources.sxInfo.getInfo()
  }
};
