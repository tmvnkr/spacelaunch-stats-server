export default {
  Query: {
    allMissions: (_parent, _args, { dataSources }) =>
      dataSources.sxMission.getAllMissions(),

    singleMission: (_parent, { id }, { dataSources }) =>
      dataSources.sxMission.getMissionById({ id }),

    multipleMissions: async (_parent, { missionIds }, { dataSources }) => {
      if (!missionIds.length) return [];
      return (
        (await dataSources.sxMission.getMissionsByIds({ missionIds })) || []
      );
    }
  }
};
