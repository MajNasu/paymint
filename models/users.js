const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
  // item_ids: [
  //   id: {type: String}
  // ]
});

const Users = mongoose.model('User', usersSchema)

module.exports = Users;
