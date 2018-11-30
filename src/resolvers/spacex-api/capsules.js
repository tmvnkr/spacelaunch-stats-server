export default {
  Query: {
    capsules: async (_, __, { dataSources }) =>
      dataSources.spaceXAPI.getAllCapsules(),
    capsule: (_, { serial }, { dataSources }) =>
      dataSources.spaceXAPI.getCapsuleById({ serial })
  }
};
