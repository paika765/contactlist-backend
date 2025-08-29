require("dotenv").config();
const express = require("express");
const cors = require("cors"); // <-- import cors
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const { getUserFromToken } = require("./utils/auth");

const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP((req) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization header received:", authHeader); 
    const token = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;
    console.log("Token extracted:", token);

    const user = getUserFromToken(token); // decode JWT
    console.log("Decoded user:", user); 

    return {
      schema,
      rootValue: resolvers,
      context: { user },
      graphiql: true,
    };
  })
);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000/graphql");
});
