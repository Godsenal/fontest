const mongoose = require('mongoose');

const fontSchema = mongoose.Schema({
  isLink: Boolean,
  link: String,
  src: String,
  view: Number,
});
const Font = mongoose.model('Font', fontSchema);

module.exports = Font;
