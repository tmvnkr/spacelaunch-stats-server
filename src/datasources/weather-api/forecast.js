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
      list: response.list
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
      rain,
      snow
    };
  }

  async getForecastByLatLon(latitude, longitude) {
    const response = await this.get(
      `${this.endpoint}lat=${latitude}&lon=${longitude}&APPID=${this.apiKey}`
    );
    this.responseReducer(response);
    console.log(response.cod);
    return response.cod === '200'
      ? response.list && response.list.length
        ? response.list.map(forecast => this.forecastReducer(forecast))
        : []
      : [];
  }
}

export default Forecast;
