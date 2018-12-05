import { paginateResults } from '../../utils';

export default {
  Query: {
    allLaunches: async (
      _parent,
      { get = 'ALL', order = 'DEFAULT', pageSize = 10, after },
      { dataSources }
    ) => {
      get === 'ALL' ? (get = '') : get;
      const allLaunches = await dataSources.sxLaunch.getAllLaunches(get);
      // put launches in reverse chronological order, the default order for UPCOMING is
      // ASC and the DEFAULT order for PAST and ALL is DESC
      get !== 'UPCOMING' && order === 'DEFAULT'
        ? allLaunches.reverse()
        : order === 'DESC'
        ? allLaunches.reverse()
        : null;

      const launches = paginateResults({
        after,
        pageSize,
        results: allLaunches
      });

      return {
        launches,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: launches.length
          ? launches[launches.length - 1].cursor !==
            allLaunches[allLaunches.length - 1].cursor
          : false
      };
    },
    singleLaunch: (_parent, { id }, { dataSources }) =>
      dataSources.sxLaunch.getLaunchById({ launchId: id }),
    latestLaunch: (_parent, _args, { dataSources }) =>
      dataSources.sxLaunch.getLatestLaunch(),
    nextLaunch: (_parent, _args, { dataSources }) =>
      dataSources.sxLaunch.getNextLaunch(),
    multipleLaunches: async (_parent, { launchIds }, { dataSources }) => {
      if (!launchIds.length) return [];
      return (await dataSources.sxLaunch.getLaunchesByIds({ launchIds })) || [];
    }
  },
  LaunchLinks: {
    // makes sure the default size is 'large' in case user doesn't specify
    missionPatch: (links, { size } = { size: 'LARGE' }) => {
      return size === 'SMALL'
        ? links.missionPatchSmall
        : links.missionPatchLarge;
    }
  }
};
