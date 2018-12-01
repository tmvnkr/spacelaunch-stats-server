import { paginateResults } from '../../utils';

export default {
  Query: {
    allCapsules: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allCapsules = await dataSources.sxCapsule.getAllCapsules();
      // put capsules in reverse chronological order
      allCapsules.reverse();

      const capsules = paginateResults({
        after,
        pageSize,
        results: allCapsules
      });

      return {
        capsules,
        cursor: capsules.length ? capsules[capsules.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: capsules.length
          ? capsules[capsules.length - 1].cursor !==
            allCapsules[allCapsules.length - 1].cursor
          : false
      };
    },

    capsule: (_, { serial }, { dataSources }) =>
      dataSources.sxCapsule.getCapsuleById({ serial }),

    capsules: async (_, { serials }, { dataSources }) => {
      const capsules = await dataSources.sxCapsule.getCapsulesByIds({
        serials
      });
      return capsules;
    }
  }
};
