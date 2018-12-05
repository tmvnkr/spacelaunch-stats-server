import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    allLaunches(
      get: GetLaunches
      order: Order
      """
      The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    singleLaunch(id: ID!): Launch!
    latestLaunch: Launch!
    nextLaunch: Launch!
    multipleLaunches(launchIds: [ID!]!): [Launch!]!
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
    reused: Boolean
    recoveryAttempt: Boolean
    recovered: Boolean
    ship: String
  }

  type LaunchCore {
    serial: ID
    flight: Int
    block: Int
    gridfins: Boolean
    legs: Boolean
    reused: Boolean
    landSuccess: Boolean
    landingIntent: Boolean
    landingType: String
    landingVehicle: String
  }

  type LaunchPayload {
    id: ID
    noradId: [Int]
    reused: Boolean
    customers: [String]
    nationality: String
    manufacturer: String
    type: String
    massKg: Float
    massLbs: Float
    orbit: String
    orbitParams: OrbitParams
  }

  type OrbitParams {
    referenceSystem: String
    regime: String
    longitude: Float
    SemiMajorAxisKm: Float
    eccentricity: Float
    periapsisKm: Float
    apoapsisKm: Float
    inclinationDeg: Float
    periodMin: Float
    lifespanYears: Int
    epoch: String
    meanMotion: Float
    raan: Float
    argOfPericenter: Float
    meanAnomaly: Float
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

  enum GetLaunches {
    ALL
    UPCOMING
    PAST
  }

  enum Order {
    DEFAULT
    DESC
    ASC
  }
`;

export default typeDefs;
