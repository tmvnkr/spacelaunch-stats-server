export default {
  Query: {
    forecast: (_parent, { lat, lon }, { dataSources }) =>
      dataSources.owmForecast.getForecastByLatLon(lat, lon),
    forecastResponseInfo: (_parent, { lat, lon }, { dataSources }) =>
      dataSources.owmForecast.getResponseInformation(lat, lon)
  }
};
