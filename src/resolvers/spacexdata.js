export default {
  Query: {
    launches: async (_, __, { dataSources }) =>
      dataSources.spaceXDataAPI.getAllLaunches(),
    launch: (_, { id }, { dataSources }) =>
      dataSources.spaceXDataAPI.getLaunchById({ launchId: id })
  }
};
