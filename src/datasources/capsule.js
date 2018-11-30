// import { RESTDataSource } from 'apollo-datasource-rest';

// class Capsule extends RESTDataSource {
//   constructor(capsule) {
//     super();
//     this.baseURL = 'https://api.spacexdata.com/v3/';
//     this.capsule = capsule;
//   }
//   capsuleReducer(capsule) {
//     return {
//       serial: capsule.capsule_serial || 'N/A',
//       id: capsule.capsule_id,
//       status: capsule.status,
//       launchDate: capsule.original_launch,
//       launchDateUnix: capsule.original_launch_unix,
//       missions: capsule.missions,
//       landings: capsule.landings,
//       type: capsule.type,
//       details: capsule.details,
//       reuse: capsule.reuse_count
//     };
//   }

//   async getAllCapsules() {
//     const response = await this.get('capsules');
//     return response && response.length
//       ? response.map(capsule => this.capsuleReducer(capsule))
//       : [];
//   }

//   async getCapsuleById({ serial }) {
//     const response = await this.get('capsules', {
//       capsule_serial: serial
//     });
//     return this.capsuleReducer(response[0]);
//   }

//   getCapsulesByIds({ serials }) {
//     return Promise.all(serials.map(serial => this.getCapsuleById({ serial })));
//   }
// }

// export default Capsule;
