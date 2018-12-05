export default {
  Query: {
    forecasts: (_, __, { dataSources }) =>
      dataSources.owmForecast.getForecastByLatLon(28.56185, -80.57736)
  }
};
