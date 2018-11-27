import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import helmet from 'helmet';
import cors from 'cors';

import typeDefs from './schema';
import resolvers from './resolvers';

import SpaceXDataAPI from './datasources';

require('dotenv').config();

// set up any dataSources our resolvers need
const dataSources = () => ({
  spaceXDataAPI: new SpaceXDataAPI()
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
});

// Set up Express Server
const app = express();

// Add extra security rules to the http header
app.use(helmet());

// Add the express server as middleware to the Apollo server
server.applyMiddleware({ app });

// Allow cross-origin resource sharing
app.use(cors());

// Start our server
const PORT = process.env.PORT || 5000;
app.listen({ port: PORT }, () =>
  console.log(`Server ready at http://localhost:${PORT + server.graphqlPath}`)
);
