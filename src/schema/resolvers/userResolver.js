const {
  AuthenticationError,
  ForbiddenError
} = require("apollo-server-express");
const error = require("../../error-messages");

const userResolver = {
  Query: {
    readUsers: (root, args, { loggedInUser, User, ...rest }) => {
      if (!loggedInUser) throw new ForbiddenError(error.auth.failed);
      return User.find({});
    },
    readUser: (root, { id }, { loggedInUser, User }) => {
      if (!loggedInUser) throw new ForbiddenError(error.auth.failed);
      return User.findById(id);
    }
  },
  Mutation: {
    signup: async (root, args, { User }) => {
      try {
        if (!args.username || !args.password)
          throw new AuthenticationError(error.signup.invalidUsernamePassword);

        const checkUniqueUser = await User.findOne({ username: args.username });
        if (checkUniqueUser)
          throw new AuthenticationError(error.signup.invalidUsername);

        const newUser = new User(args);
        newUser.password = newUser.hashPassword(args.password);

        const user = await User.create(newUser);
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          token: user.getJWT()
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    login: async (root, args, { User }) => {
      try {
        const user = await User.findOne({ username: args.username });

        if (!user) throw new Error(error.login.noUserFound);
        if (!user.verifyPassword(args.password))
          throw new Error(error.login.noPasswordMatched);

        return {
          id: user.id,
          username: user.username,
          token: user.getJWT()
        };
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

module.exports = userResolver;
