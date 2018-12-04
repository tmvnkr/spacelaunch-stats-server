import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    allLaunches(
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    singleLaunch(id: ID!): Launch
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Launch {
    id: ID!
    name: String!
    missionId: [String]
    launchYear: String
    launchDateUnix: Int
    launchDateUTC: String
    launchDateLocal: String
    tentative: Boolean
    tentativeMaxPrecision: String
    toBeDetermined: Boolean
    rocket: LaunchRocket
    ships: [String]
    telemetry: Telemetry
    launchSite: LaunchSite
    launchSuccess: Boolean
    links: LaunchLinks
    details: String
    upcoming: Boolean
    staticFireDateUTC: String
    staticFireDateUnix: Int
  }

  type LaunchRocket {
    id: ID!
    name: String
    type: String
    firstStage: FirstStage
    secondStage: SecondStage
    fairings: Fairings
  }

  type FirstStage {
    cores: [LaunchCore]
  }

  type SecondStage {
    block: Int
    payloads: [LaunchPayload]
  }

  type Fairings {
    # Needs rewriting(?) once found out how to reduce properly
    # Should go from underschore to lower camel case
    reused: Boolean
    recovery_attempt: Boolean
    recovered: Boolean
    ship: String
  }

  type LaunchCore {
    # Needs rewriting(?) once found out how to reduce properly
    # Should go from underschore to lower camel case
    core_serial: String
    flight: Int
    block: Int
    gridfins: Boolean
    legs: Boolean
    reused: Boolean
    land_success: Boolean
    landing_intent: Boolean
    landing_type: String
    landing_vehicle: String
  }

  type LaunchPayload {
    # Needs rewriting(?) once found out how to reduce properly
    # Should go from underschore to lower camel case
    payload_id: String
    norad_id: [Int]
    reused: Boolean
    customers: [String]
    nationality: String
    manufacturer: String
    payload_type: String
    payload_mass_kg: Float
    payload_mass_lbs: Float
    orbit: String
    orbit_params: OrbitParams
  }

  type OrbitParams {
    # Needs rewriting(?) once found out how to reduce properly
    # Should go from underschore to lower camel case
    reference_system: String
    regime: String
    longitude: Float
    semi_major_axis_km: Float
    eccentricity: Float
    periapsis_km: Float
    apoapsis_km: Float
    inclination_deg: Float
    period_min: Float
    lifespan_years: Int
    epoch: String
    mean_motion: Float
    raan: Float
    arg_of_pericenter: Float
    mean_anomaly: Float
  }

  type Telemetry {
    flightClub: String
  }

  type LaunchSite {
    id: ID
    name: String
    fullName: String
  }

  type LaunchLinks {
    missionPatch(size: PatchSize): String
    redditCampaign: String
    redditLaunch: String
    redditRecovery: String
    redditMedia: String
    presskit: String
    article: String
    wikipedia: String
    video: String
    flickr: [String]
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

export default typeDefs;
