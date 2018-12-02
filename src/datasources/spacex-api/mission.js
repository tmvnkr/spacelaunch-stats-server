import SpaceXAPI from './spacex-api';

class Mission extends SpaceXAPI {
  constructor() {
    super();
  }

  missionReducer(mission) {
    return {
      id: mission.mission_id,
      name: mission.mission_name,
      manufacturers: mission.manufacturers,
      payloadIds: mission.payload_ids,
      wikipedia: mission.wikipedia,
      website: mission.website,
      twitter: mission.twitter,
      description: mission.description
    };
  }

  async getAllMissions() {
    const response = await this.get('missions');
    return response && response.length
      ? response.map(mission => this.missionReducer(mission))
      : [];
  }

  async getMissionById({ id }) {
    const response = await this.get('missions', {
      mission_id: id
    });
    return this.missionReducer(response[0]);
  }

  async getMissionsByIds({ ids }) {
    return Promise.all(ids.map(id => this.getMissionById({ id })));
  }
}

export default Mission;
