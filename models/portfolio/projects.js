const mongoose = require("mongoose");
const portfolioDb = require("../../databases/portfolioDb")

const projectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    discription: {type: String, required: true},
    posterImage: { type: String, required: true },
    bannerImage: { type: String, required: true },
    tags: { type: [String] },
    figma: { type: String },
    github: { type: String },
    url: { type: String },
    client: { type: String },
    technologies: { type: [String] },
    hoursSpent: { type: String },
    publishedDate: { type: Date },
  });
  
  const Projects = portfolioDb.model('Projects', projectSchema);
  
  module.exports = Projects;
