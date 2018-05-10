console.log("Yelp Camp app v1 to node control");

//Require pkgs
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");

//Init express
const app = express();

//Demand serving content of public file
app.use(express.static("public"));

//Demand the use of body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));

//Set view engine
app.set("view engine", "ejs");

//Connect mongoose
mongoose.connect('mongodb://localhost/yelp_camp');

//Schema setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

//Compile the Schema into a model
const Campground = mongoose.model("Campground", campgroundSchema);


//test adding camp
/*Campground.create({
      name: "Banff National Park",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Johnston_Canyon-Lower_Falls.jpg",
      description: "Rocky Mountain peaks, turquoise glacial lakes, a picture-perfect mountain town and village, abundant wildlife and scenic drives come together in Banff National Park - Canada’s first national park and the flagship of the nation’s park system."
}, function(error, campground){
  if(error){
    console.log(error);
  } else {
    console.log("New campground created!");
    console.log(campground);
  }
});*/

//Global variables

/*//Temporary camps array
const campgrounds = [
        {name: "Banff National Park", image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Johnston_Canyon-Lower_Falls.jpg"},
        {name: "Glacier National Park", image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/St_Mary_Lake.jpg"},
        {name: "Riding Mountain National Park", image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Riding_Mountain_National_Park_Manitoba_Canada_%288%29.JPG"}
];*/
/*------------------------
          ROUTES
---------------------------*/

//root route
app.get("/", function(req, res) {
  res.redirect("/index");
});

//INDEX
app.get("/index", function(req, res) {
  //Get all the campgrounds from the temporary array
  //res.render("index", {campgrounds: campgrounds});Replaced by the lookup to the database

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
app.post("/index", function (req, res) { //Doesn't maters that the name of the route is the same because the method is diferent.
  //get data from form and add to the campgrouds array
  const campName = req.body.name;
  const campImgUrl = req.body.imgUrl;
  const campDescription = req.body.description;
  const newCamp = {
    name: campName,
    image: campImgUrl,
    description: campDescription
  };
  console.log(newCamp);
  //index.push(newCamp);Replaced by the Campground.create to the database
  //
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

//SHOW (remember this route must be declared after any other route like this /root/anything)
app.get("/index/:id", function (req, res) {
  const campId = req.params.id;
  Campground.findById(campId, function (error, foundCampground) {
    console.log(foundCampground);
    if (error) {
      console.log(error);
    } else {
      res.render("show", {
        campground: foundCampground
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
