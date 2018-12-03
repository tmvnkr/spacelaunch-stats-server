export default {
  Query: {
    allMissions: (_, __, { dataSources }) =>
      dataSources.sxMission.getAllMissions(),

    singleMission: (_, { id }, { dataSources }) =>
      dataSources.sxMission.getMissionById({ id }),

    multipleMissions: async (_, { ids }, { dataSources }) => {
      const missions = await dataSources.sxMission.getMissionsByIds({
        ids
      });
      return missions;
    }
  }
};
