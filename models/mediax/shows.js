const mongoose = require('mongoose');
const mediaxDB = require("../../databases/mediaxDb")

const ShowsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  backdrop_path: { type: String },
  poster_path: { type: String },
  language: { type: String },
  title: { type: String },
  overview: { type: String },
  release_date: { type: Date },
  imdb_id: { type: String },
  imdb_vote: { type: Number },
  status: { type: String },
  category: { type: String },
  homepage: { type: String },
  trailer: { type: String },
  budget: { type: Number },
  revenue: { type: Number },
  tags: { type: [String] },
  is_popular: { type: Boolean },
  is_featured: { type: Boolean },
  is_movie: { type: Boolean },
});

const Shows = mediaxDB.model('Shows', ShowsSchema);

module.exports = Shows;