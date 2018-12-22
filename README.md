<p align="center"><img src="https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/2018/2-thespacexfal.jpg"></p>

<h1 align="center">Spacelaunch Stats</h1>

<p align="center">
<a href="https://github.com/vaneker/spacelaunch-stats-server/releases"><img src="https://img.shields.io/badge/version-0.1.0-brightgreen.svg"></a>
<a href="https://github.com/vaneker/spacelaunch-stats-server/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-red.svg"></a>

</p>

<h3 align="center">Node server using Express and Apollo server handeling all datasources</h3>

## Data Sources

A majority of the data is currently sourced from [r-spacex/SpaceX-API](https://github.com/r-spacex/SpaceX-API) and [Open Weather Map API](https://openweathermap.org) using the [Apollo GraphQL Client](https://www.apollographql.com/).

## Usage

For the client to be able to retrieve information it needs this [spacelaunch-stats-server](https://github.com/vaneker/spacelaunch-stats-server) See the spacelaunch-stats-server GitHub page on any information regarding the server.

After downloading this project, run:

**`npm install`**

### .env file
To be able to run this project you will have to create a .env file and fill it with your own keys/links, the following are required:
- SPACEX_API_V3_URL='https://api.spacexdata.com/v3/'
- OPEN_WEATHER_MAP_API_KEY: api key from [Open Weather Map](https://openweathermap.org/)
- OPEN_WEATHER_MAP_API='https://api.openweathermap.org/data/2.5/'

Optional:
- ENGINE_API_KEY: This is the engine api key from the [Apollo Platform](https://engine.apollographql.com/) (if not used, remove **`engine: {apiKey: process.env.ENGINE_API_KEY}`** from server.js)

### Available Scripts

In the project directory, you can run:

**`npm run server`**

Spins up a development Node js server with nodemon<br>
Open [http://localhost:5000/graphql](http://localhost:5000/graphql) to view the GraphQL interface in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

**`npm run build`**

Transpiles and minfies all ES6 to JS optimized for Node js
