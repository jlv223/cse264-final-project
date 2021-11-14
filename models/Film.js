const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewID: Number,
  title: String,
  body: String,
  date: String
});

const filmSchema = new mongoose.Schema({
  filmID: Number,
  title: String,
  body: String,
  date: String,
  reviews: [reviewSchema]
});


const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
