/*jshint esversion: 6 */

//This file is intended to boostrap the data base to do event driven development
console.log('Yelp Camp app v1 to node control: engaging seeds.js');

const moongoose = require('mongoose');

//Schema and model setup
const Comment = require('./models/comment');
const Campground = require('./models/campground');

const data = [
  {
    name: 'Banff National Park',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Johnston_Canyon-Lower_Falls.jpg',
    description: 'Rocky Mountain peaks, turquoise glacial lakes, a picture-perfect mountain town and village, abundant wildlife and scenic drives come together in Banff National Park - Canada’s first national park and the flagship of the nation’s park system.'
  },
  {
    name: 'Glacier National Park',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/St_Mary_Lake.jpg',
    description: 'With exceptional alpine scenery and deep valleys filled with ancient forests, Glacier National Park is a year-round paradise. Scale its heights following trails pioneered by legendary Swiss mountain guides, take a gentle stroll amid moss-draped old-growth cedars or hike through alpine meadows strewn with lichen-covered boulders. After a day’s exploring, sink into an armchair before a roaring fire and steep yourself in the history of Rogers Pass, the final link in the railway that brought Canada together as a nation.'
  },
  {
    name: 'Cape Breton Highlands National Park',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Broad_Cove%2C_Nova_Scotia_%2823688620051%29.jpg',
    description: 'One of Canada’s most enchanting places, where the mountains meet the sea. As you hug the world-famous Cabot Trail coastline you\'ll wind through Cape Breton Highlands National Park, where lush, forested river canyons carve into the ancient plateau, edged by rust-coloured cliffs. Keep your eyes open for moose and bald eagles. You might even catch a minke or pilot whale breaking waves in the Atlantic, or Gulf of St. Lawrence. And you’re never far from a steaming plate of local lobster fresh from the ocean around you. '
  }
];

function seedDb() {
  //Remove all campgrounds
  Campground.remove({}, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log('Campgrounds removed!');

      //Creating some campgrounds in the callback to be sure the db is cleared before!!
      data.forEach(function (seed) {
        Campground.create(seed, function (error, campground) {
          if (error) {
            console.log(error);
          } else {
            console.log('New campground created!');
            console.log(campground);
            //Create a comment in the callback to be sure the campgrounds are created before!
            Comment.create(
              {
                text: 'This is the best place to do nothing!',
                author: 'Jhon Doe'
              }, function (error, comment) {
                if (error) {
                  console.log(error);
                } else {
                  campground.comments.push(comment);
                  campground.save();
                  console.log('New comment created!');
                  console.log(comment);
                }
            });
          }
        });
      });
    }
  });
}

//Exporting
module.exports = seedDb;
