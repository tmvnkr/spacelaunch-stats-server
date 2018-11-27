"use strict";var _apolloDatasourceRest=require("apollo-datasource-rest");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;/**
 * SpaceX SpaceXDataAPI data source.
 * @class SpaceXDataAPI
 * @extends {RESTDataSource}
 */class SpaceXDataAPI extends _apolloDatasourceRest.RESTDataSource{/**
   * Creates an instance of SpaceXDataAPI and set the base URL for the API.
   * @memberof SpaceXDataAPI
   */constructor(){super(),this.baseURL="https://api.spacexdata.com/v3/"}/**
   * Transform data in form of launch schema.
   * @param {array} launch
   * @returns launch array
   * @memberof SpaceXDataAPI
   */launchReducer(a){return{id:a.flight_number||0,cursor:`${a.launch_date_unix}`,site:a.launch_site&&a.launch_site.site_name,mission:{name:a.mission_name,missionPatchSmall:a.links.mission_patch_small,missionPatchLarge:a.links.mission_patch},rocket:{id:a.rocket.rocket_id,name:a.rocket.rocket_name,type:a.rocket.rocket_type}}}/**
   * Make GET request and return an array with launches.
   * @returns array with launches OR empty array
   * @memberof SpaceXDataAPI
   */async getAllLaunches(){const a=await this.get("launches");return a&&a.length?a.map(a=>this.launchReducer(a)):[]}/**
   * Return data for a particular launch.
   * @param {ID} { launchId }
   * @returns single launch
   * @memberof SpaceXDataAPI
   */async getLaunchById({launchId:a}){const b=await this.get("launches",{flight_number:a});return this.launchReducer(b[0])}/**
   * Returns several launches based on their respective launchIds.
   * @param {ID} { launchIds }
   * @returns multiple launches
   * @memberof SpaceXDataAPI
   */getLaunchesByIds({launchIds:a}){return Promise.all(a.map(a=>this.getLaunchById({launchId:a})))}}var _default=SpaceXDataAPI;exports.default=_default;