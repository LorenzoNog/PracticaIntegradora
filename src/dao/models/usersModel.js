import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    default: 'User'
  },
  isAdmin:{
    type: Boolean,
    default: false
  }
});

export const usersModel = mongoose.model("users", UsersSchema);
