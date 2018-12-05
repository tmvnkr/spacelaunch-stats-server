import { RESTDataSource } from 'apollo-datasource-rest';

class Forecast extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.OPEN_WEATHER_MAP_API;
    this.apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
    this.endpoint = 'forecast?';
  }

  responseReducer(response) {
    return {
      cod: response.cod,
      message: response.message,
      list: response.list,
      city: {
        id: response.city.id,
        name: response.city.name,
        latitude: response.city.coord.lat,
        longitude: response.city.coord.lon,
        country: response.city.country,
        population: response.city.population
      }
    };
  }

  forecastReducer(forecast) {
    const getRain = JSON.stringify(forecast.rain);
    const getSnow = JSON.stringify(forecast.snow);
    let rain;
    let snow;
    !getRain ? (rain = 0) : (rain = Number(getRain.slice(6, -1)));
    !getSnow ? (snow = 0) : (snow = Number(getSnow.slice(6, -1)));
    return {
      dateTime: forecast.dt,
      temperature: forecast.main.temp,
      pressure: forecast.main.pressure,
      humidity: forecast.main.humidity,
      clouds: forecast.clouds.all,
      windSpeed: forecast.wind.speed,
      windDegree: forecast.wind.deg,
      weather: forecast.weather.map(weather => this.weatherReducer(weather)),
      rain,
      snow
    };
  }

  weatherReducer(weather) {
    return {
      id: weather.id,
      main: weather.main,
      description: weather.description,
      icon: weather.icon
    };
  }

  async getForecastByLatLon(latitude, longitude) {
    const response = await this.get(
      `${this.endpoint}lat=${latitude}&lon=${longitude}&APPID=${this.apiKey}`
    );
    this.responseReducer(response);
    return response.cod === '200'
      ? response.list && response.list.length
        ? response.list.map(forecast => this.forecastReducer(forecast))
        : []
      : [];
  }

  async getResponseInformation(latitude, longitude) {
    const response = await this.get(
      `${this.endpoint}lat=${latitude}&lon=${longitude}&APPID=${this.apiKey}`
    );
    return this.responseReducer(response);
  }
}

export default Forecast;
