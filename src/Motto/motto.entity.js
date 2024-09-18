const mongoose = require('mongoose');

const MottoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
});

const Motto = mongoose.model('Motto', MottoSchema);

module.exports = { MottoSchema, Motto };
