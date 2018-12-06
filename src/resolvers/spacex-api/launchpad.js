export default {
  Query: {
    allLaunchpads: (_parent, _args, { dataSources }) =>
      dataSources.sxLaunchpad.getAllLaunchpads(),

    singleLaunchpad: (_parent, { id }, { dataSources }) =>
      dataSources.sxLaunchpad.getLaunchpadById({ id }),

    multipleLaunchpads: async (_parent, { launchpadIds }, { dataSources }) => {
      if (!launchpadIds.length) return [];
      return (
        (await dataSources.sxLaunchpad.getLaunchpadsByIds({ launchpadIds })) ||
        []
      );
    }
  }
};
