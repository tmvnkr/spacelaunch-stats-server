export default {
  Query: {
    allLaunchpads: async (_parent, _args, { dataSources }) => {
      const launchpads = await dataSources.sxLaunchpad.getAllLaunchpads();
      return launchpads;
    },

    singleLaunchpad: async (_parent, { id }, { dataSources }) => {
      const launchpad = await dataSources.sxLaunchpad.getLaunchpadById({ id });
      return launchpad;
    },

    multipleLaunchpads: async (_parent, { launchpadIds }, { dataSources }) => {
      if (!launchpadIds.length) return [];
      return (
        (await dataSources.sxLaunchpad.getLaunchpadsByIds({ launchpadIds })) ||
        []
      );
    }
  }
};
