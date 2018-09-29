const { gql } = require("apollo-server-express");

const userType = gql`
  type Auth {
    id: ID
    username: String
    token: String
  }

  type User {
    id: ID
    username: String
    email: String
    password: String
  }

  type Query {
    readUsers: [User]
    readUser(id: ID!): User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
  }
`;

module.exports = userType;
