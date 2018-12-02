export default {
  Query: {
    allMissions: (_, __, { dataSources }) =>
      dataSources.sxMission.getAllMissions(),

    mission: (_, { id }, { dataSources }) =>
      dataSources.sxMission.getMissionById({ id }),

    missions: async (_, { ids }, { dataSources }) => {
      const missions = await dataSources.sxMission.getMissionsByIds({
        ids
      });
      return missions;
    }
  }
};
