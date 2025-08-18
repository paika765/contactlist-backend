// src/server.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
const PORT = 4000;

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true 
}));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
