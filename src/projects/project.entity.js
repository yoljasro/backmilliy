const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Bu qismini o'zgartirish kerak bo'lishi mumkin, masalan, `type: Buffer` bo'lishi mumkin
  },
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = { ProjectSchema, Project };