const mongoose = require('mongoose');

const ProjectLogoSchema = new mongoose.Schema({
  image: {
    type: String,
  },
});

const ProjectLogo = mongoose.model('ProjectLogo', ProjectLogoSchema);

module.exports = { ProjectLogoSchema, ProjectLogo };