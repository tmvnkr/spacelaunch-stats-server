import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    forecasts(lat: Float, lon: Float): [Forecast]
    forecastResponseInfo(lat: Float, lon: Float): ForecastResponseInfo
  }

  type Forecast {
    dateTime: Int
    temperature: Float
    pressure: Float
    humidity: Int
    clouds: Int
    windSpeed: Float
    windDegree: Float
    rain: Float
    snow: Float
    weather: [WeatherDescription]
  }

  type WeatherDescription {
    id: Int
    main: String
    description: String
    icon: String
  }

  type ForecastResponseInfo {
    cod: ID
    message: Float
    count: Int
    city: ForecastCity
  }

  type ForecastCity {
    id: ID
    name: String
    latitude: Float
    longitude: Float
    country: String
    population: Int
  }
`;

export default typeDefs;
