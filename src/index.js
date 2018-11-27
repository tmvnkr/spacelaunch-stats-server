import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import helmet from 'helmet';
import cors from 'cors';
import typeDefs from './schema';
import resolvers from './resolvers';
import SpaceXDataAPI from './datasources';

// Create server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ spaceXDataAPI: new SpaceXDataAPI() })
});
const app = express();
// Add extra security rules to the http header
app.use(helmet());
server.applyMiddleware({ app });

// Allow cross-origin resource sharing
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen({ port: PORT }, () =>
  console.log(`Server ready at http://localhost:${PORT + server.graphqlPath}`)
);
