import { gql } from 'apollo-server-express';

const typeDefs = gql`
  extend type Query {
    forecasts: [Forecast]
    responseInfo: ForecastResponseInfo
  }

  type ForecastResponseInfo {
    cod: ID
    message: Float
    count: Int
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
    description: [ForecastDescription]
  }

  type ForecastDescription {
    id: Int
    main: String
    description: String
    icon: String
  }
`;

export default typeDefs;
