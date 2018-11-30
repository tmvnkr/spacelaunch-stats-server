export default {
  Query: {
    capsules: async (_, __, { dataSources }) =>
      dataSources.sxCapsule.getAllCapsules(),
    capsule: (_, { serial }, { dataSources }) =>
      dataSources.sxCapsule.getCapsuleById({ serial })
  }
};
