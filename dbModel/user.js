'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: String,
  password: String,
  id: Number,
  roles: Array,
  name: String,
  avatar: {
    type: String,
    default: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  },
  token: String,
  introduction: String,
  create_time: String,
})

adminSchema.index({
  id: 1
});

const User = mongoose.model('User', adminSchema, 'user');


export default User
