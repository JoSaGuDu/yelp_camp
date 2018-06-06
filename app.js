/*jshint esversion: 6 */
console.log('Yelp Camp app v1 to node control');

//Require pkgs
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');

//reuquire the seeds file
const seedDB = require('./seeds');

//Init express
const app = express();

//Demand serving content of public file
app.use(express.static('public'));

//Demand the use of body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));

//Set view engine
app.set('view engine', 'ejs');

//Seed the database
seedDB();

//Connect mongoose
mongoose.connect('mongodb://localhost/yelp_camp');

//Schema and modelsetup
const Comment = require('./models/comment');
const Campground = require('./models/campground')

/*------------------------
          ROUTES
---------------------------*/

//root route
app.get("/", function(req, res) {
  res.redirect("/index");
});

//INDEX
app.get("/index", function(req, res) {


  //Get all the campgrounds from the DB
  Campground.find({}, function(error, allCampgrounds) {
    if (error) {
      console.log(error);
    } else {
      res.render("index", {
        campgrounds: allCampgrounds
      });
    }
  })
})

//NEW
app.get("/index/new", function (req, res) {
  res.render("new");
})

//CREATE
app.post("/index", function (req, res) {
  const campName = req.body.name;
  const campImgUrl = req.body.imgUrl;
  const campDescription = req.body.description;
  const newCamp = {
    name: campName,
    image: campImgUrl,
    description: campDescription
  };
  console.log(newCamp);

  //Create a new campground and save it to the DB.
  Campground.create(newCamp, function (error, newCampground) {
    if (error) {
      console.log(error);
    } else {
      console.log("New campground created!");
      console.log(newCampground);
      //redirect back to campgrounds page
      res.redirect("/index");
    }
  });
});

//SHOW
app.get("/index/:id", function (req, res) {
  const campId = req.params.id;
  Campground.findById(campId, function (error, foundCampground) {
    console.log(foundCampground);
    if (error) {
      console.log(error);
    } else {
      Campground.findById(campId).populate('comments').exec(function (err, foundCampground) {
        if (err)console.log(err);
        else {
          console.log(foundCampground);
          res.render('show', {
            campground: foundCampground
          });
        }
      });
    }
  });
});

//Responding to all the rest of requests
app.get("*", function (req, res) {
  res.send("Sorry, page not found! What are you doing with your life?");
});

//Initializing the server: Specify the port of listening
app.listen(8000, function () {
  console.log("Engines on!");
});
