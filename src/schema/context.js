const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const models = require("../models");
const { JWT_SECRET_KEY } = require("../config");

const context = ({ req }) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) return { ...models };

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    return {
      ...models,
      loggedInUser: decoded.username
    };
  } catch (error) {
    console.log(error);
    throw new AuthenticationError("invalid token");
  }
};

module.exports = context;
