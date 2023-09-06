const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  SubjectsHandled: [String],
  Department: String,
});

module.exports = mongoose.model('Teacher', teacherSchema);