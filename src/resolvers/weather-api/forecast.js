export default {
  Query: {
    forecasts: (_, { lat, lon }, { dataSources }) =>
      dataSources.owmForecast.getForecastByLatLon(lat, lon),
    forecastResponseInfo: (_, { lat, lon }, { dataSources }) =>
      dataSources.owmForecast.getResponseInformation(lat, lon)
  }
};
