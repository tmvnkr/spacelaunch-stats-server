import { paginateResults } from '../../utils';

export default {
  Query: {
    allCores: async (_parent, { pageSize = 20, after }, { dataSources }) => {
      const allCores = await dataSources.sxCore.getAllCores();
      // put cores in reverse chronological order
      allCores.reverse();

      const cores = paginateResults({
        after,
        pageSize,
        results: allCores
      });

      return {
        cores,
        cursor: cores.length ? cores[cores.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: cores.length
          ? cores[cores.length - 1].cursor !==
            allCores[allCores.length - 1].cursor
          : false
      };
    },

    singleCore: (_parent, { serial }, { dataSources }) =>
      dataSources.sxCore.getCoreBySerial({ serial }),

    multipleCores: async (_parent, { coreSerials }, { dataSources }) => {
      if (!coreSerials.length) return [];
      return (
        (await dataSources.sxCore.getCoresBySerials({ coreSerials })) || []
      );
    }
  }
};
