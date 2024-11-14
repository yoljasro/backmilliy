  const mongoose = require('mongoose');

  const ProfileSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
      
    },
  });

  const Profile = mongoose.model('Profile', ProfileSchema);

  module.exports = { ProfileSchema, Profile };
