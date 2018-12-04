import { RESTDataSource } from 'apollo-datasource-rest';

class Launch extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.SPACEX_API_V3_URL;
    this.endpoint = 'launches';
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
          cores: launch.rocket.first_stage.cores
        },
        secondStage: {
          block: launch.rocket.second_stage.block,
          payloads: launch.rocket.second_stage.payloads
        },
        fairings: launch.rocket.fairings
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

  async getAllLaunches() {
    const response = await this.get(this.endpoint);
    return response && response.length
      ? response.map(launch => this.launchReducer(launch))
      : [];
  }

  async getLaunchById({ launchId }) {
    const response = await this.get(this.endpoint, { flight_number: launchId });
    return this.launchReducer(response[0]);
  }

  getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId }))
    );
  }
}

export default Launch;
