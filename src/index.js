const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const mongoose = require("mongoose");

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const context = require("./schema/context");
const { API_URL, PORT, MONGODB_URI } = require("./config");

// database connection
mongoose.set("useCreateIndex", true);
mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(connection => console.log("Successfully connected to MongoDB"))
  .catch(error => console.log(error.message));

const app = express();
app.use(cors());

// apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`Server is up and running on ${API_URL}`);
});

/*

{
  "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4uZG9lIiwiaWF0IjoxNTM3NDk5NzUwLCJleHAiOjE1Mzc1ODYxNTB9.5wisTsYJUES0RqdRfUy_0hHJwMmbnTe4jDd6m6va3Vo"
}

*/
