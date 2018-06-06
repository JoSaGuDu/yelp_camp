/*jshint esversion: 6 */
console.log('Yelp Camp app v1 to node control: Engaging module campground!');

const mongoose = require('mongoose');

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [{//Data association by referencing
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

//Compile the Schema into a model and export
module.exports = mongoose.model('Campground', campgroundSchema);
