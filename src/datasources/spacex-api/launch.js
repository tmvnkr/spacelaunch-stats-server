import { RESTDataSource } from 'apollo-datasource-rest';

class Launch extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.SPACEX_API_V3_URL;
    this.endpoint = 'launches/';
  }

  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      name: launch.mission_name,
      missionId: launch.mission_id,
      launchYear: launch.launch_year,
      launchDateUnix: launch.launch_date_unix,
      launchDateUTC: launch.launch_date_utc,
      launchDateLocal: launch.launch_date_local,
      tentative: launch.is_tentative,
      tentativeMaxPrecision: launch.tentative_max_precision,
      toBeDetermined: launch.tbd,
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
        firstStage: {
          cores: launch.rocket.first_stage.cores.map(core =>
            this.coreReducer(core)
          )
        },
        secondStage: {
          block: launch.rocket.second_stage.block,
          payloads: launch.rocket.second_stage.payloads.map(payload =>
            this.payloadReducer(payload)
          )
        },
        fairings: this.fairingsReducer(launch.rocket.fairings)
      },
      ships: launch.ships,
      telemetry: {
        flightClub: launch.telemetry.flight_club
      },
      launchSite: {
        id: launch.launch_site.site_id,
        name: launch.launch_site.site_name,
        fullName: launch.launch_site.site_name_long
      },
      launchSuccess: launch.launch_success,
      links: {
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
        redditCampaign: launch.links.reddit_campaign,
        redditLaunch: launch.links.reddit_launch,
        redditRecovery: launch.links.reddit_recovery,
        redditMedia: launch.links.reddit_media,
        presskit: launch.links.presskit,
        article: launch.links.article_link,
        wikipedia: launch.links.wikipedia,
        video: launch.links.video_link,
        flickr: launch.links.flickr_images
      },
      details: launch.details,
      upcoming: launch.upcoming,
      staticFireDateUTC: launch.static_fire_date_utc,
      staticFireDateUnix: launch.static_fire_date_unix
    };
  }

  coreReducer(core) {
    return {
      serial: core.core_serial,
      flight: core.flight,
      block: core.block,
      gridfinds: core.gridfinds,
      legs: core.legs,
      reused: core.reused,
      landSuccess: core.land_success,
      landingIntent: core.landing_intent,
      landingType: core.landing_type,
      landingVehicle: core.landing_vehicle
    };
  }

  payloadReducer(payload) {
    return {
      id: payload.payload_id,
      noradId: payload.norad_id,
      reused: payload.reused,
      customers: payload.customers,
      nationality: payload.nationality,
      manufacturer: payload.manufacturer,
      type: payload.payload_type,
      massKg: payload.payload_mass_kg,
      massLbs: payload.payload_mass_lbs,
      orbit: payload.orbit,
      orbitParams: {
        referenceSystem: payload.orbit_params.reference_system,
        regime: payload.orbit_params.regime,
        longitude: payload.orbit_params.longitude,
        SemiMajorAxisKm: payload.orbit_params.semi_major_axis_km,
        eccentricity: payload.orbit_params.eccentricity,
        periapsisKm: payload.orbit_params.periapsis_km,
        apoapsisKm: payload.orbit_params.apoapsis_km,
        inclinationDeg: payload.orbit_params.inclination_deg,
        periodMin: payload.orbit_params.period_min,
        lifespanYears: payload.orbit_params.lifespan_years,
        epoch: payload.orbit_params.epoch,
        meanMotion: payload.orbit_params.mean_motion,
        raan: payload.orbit_params.raan,
        argOfPericenter: payload.orbit_params.arg_of_pericenter,
        meanAnomaly: payload.orbit_params.mean_anomaly
      }
    };
  }

  fairingsReducer(fairings) {
    return !fairings === null
      ? {
          reused: fairings.reused,
          recoveryAttempt: fairings.recovery_attempt,
          recovered: fairings.recovered,
          ship: fairings.ship
        }
      : null;
  }

  async getAllLaunches(get) {
    const response = await this.get(this.endpoint + get);
    return response && response.length
      ? response.map(launch => this.launchReducer(launch))
      : [];
  }

  async getLaunchById({ launchId }) {
    const response = await this.get(this.endpoint, { flight_number: launchId });
    return this.launchReducer(response[0]);
  }

  async getLatestLaunch() {
    const response = await this.get(this.endpoint + 'latest');
    return this.launchReducer(response);
  }

  async getNextLaunch() {
    const response = await this.get(this.endpoint + 'next');
    return this.launchReducer(response);
  }

  getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId }))
    );
  }
}

export default Launch;
