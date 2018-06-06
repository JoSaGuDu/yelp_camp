/*jshint esversion: 6 */
console.log('Yelp Camp app v1 to node control: Engaging module comment!');

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  author: String
});

//Compile the Schema into a model and export
module.exports = mongoose.model('Comment', commentSchema);
