const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Create server
const server = new ApolloServer({ typeDefs, resolvers });
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
