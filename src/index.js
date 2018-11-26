import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';

// Create server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
    me: models.users[1]
  }
});
const app = express();
server.applyMiddleware({ app });

// Allow cross-origin resource sharing
app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT + server.graphqlPath}`
  )
);
