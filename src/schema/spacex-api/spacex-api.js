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

import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    information: Information!
  }

  type Information {
    name: String!
    founder: String!
    founded: Int!
    employees: Int!
    vehicles: Int!
    launchSites: Int!
    testSites: Int!
    ceo: String!
    cto: String!
    coo: String!
    ctoPropulsion: String!
    valuation: Float!
    headquarters: Headquarter!
    links: Link!
    summary: String!
  }

  type Headquarter {
    address: String!
    city: String!
    state: String!
  }

  type Link {
    website: String!
    flickr: String!
    twitter: String!
    elonTwitter: String!
  }
`;

export default typeDefs;
