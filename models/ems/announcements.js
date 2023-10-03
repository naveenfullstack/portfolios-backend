const mongoose = require('mongoose');
const emsDb = require("../../databases/emsDb");

const AnnouncementsSchema = new mongoose.Schema({
  title: {type: String},
  date: {type: Date},
  description: {type: String},
  PublisherName: {type: String},
  Publisherid: {type: String},
  PublisherPosition: {type: String},
  PublisherDepartment: {type: String},
  PublisherProfileImage: {type: String},
});

const Announcements = emsDb.model('Announcements', AnnouncementsSchema);

module.exports = Announcements;