console.log("Yelp Camp app v1 to node control");

//Require pkgs
const express = require("express");
const  bodyParser = require("body-parser");
const request = require("request");

//Init express
const app = express();

//Demand serving content of public file
app.use(express.static("public"));

//Demand the use of body-parser
app.use(bodyParser.urlencoded({extended: true}));

//Set view engine
app.set("view engine", "ejs");

//Global variables

//Temporary camps array 
const campgrounds = [
        {name: "Banff National Park", image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Johnston_Canyon-Lower_Falls.jpg"},
        {name: "Glacier National Park", image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/St_Mary_Lake.jpg"},
        {name: "Riding Mountain National Park", image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Riding_Mountain_National_Park_Manitoba_Canada_%288%29.JPG"}
];
/*------------------------
          ROUTES           
---------------------------*/
//root route
app.get("/", function(req, res){
    res.render("index");
});

//Campground routes
app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
})
app.get("/campgrounds/new", function(req,res){
  res.render("new.ejs");
}),
//post route
app.post("/campgrounds", function(req, res){//Doesnt maters that the name of the route is the same because the method is diferent.
  //get data from form and add to the campgrouds array
  const campName = req.body.name;
  const campImgUrl = req.body.imgUrl;
  const newCamp = {name: campName, image: campImgUrl};
  campgrounds.push(newCamp);
  //redirect back to campgrounds page
  res.redirect("/campgrounds");
})

//Responding to all the rest of requests
app.get("*", function(req, res){
    res.send("Sorry, page not found! What are you doing with your life?");
});

//Initializing the server: Specify the port of listening
app.listen(8000, function(){
    console.log("Engines on!");
});