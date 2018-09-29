const { mergeResolvers } = require("merge-graphql-schemas");
const userResolver = require("./userResolver");

const resolvers = [userResolver];

module.exports = mergeResolvers(resolvers, { all: true });
