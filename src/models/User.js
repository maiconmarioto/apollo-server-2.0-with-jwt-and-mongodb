const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("mongoose-type-email");

const { JWT_SECRET_KEY } = require("../config");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "username required"],
    unique: [true, "username already exists"]
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: [true, "email already exists"]
  },
  password: {
    type: mongoose.SchemaTypes.Email,
    required: [true, "password required"]
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.hashPassword = function hashPassword(reqPassword) {
  return bcrypt.hashSync(reqPassword, 10);
};

UserSchema.methods.getJWT = function getJWT() {
  const user = {
    username: this.username,
    email: this.email,
    isAdmin: this.isAdmin
  };
  return jwt.sign(user, JWT_SECRET_KEY, {
    expiresIn: "1d"
  });
};

UserSchema.methods.verifyPassword = function verifyPassword(reqPassword) {
  return bcrypt.compareSync(reqPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
