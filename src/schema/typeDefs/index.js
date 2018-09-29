const { mergeTypes } = require("merge-graphql-schemas");

const user = require("./userType");

const types = [user];

module.exports = mergeTypes(types, { all: true });
