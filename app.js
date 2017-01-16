var express = require ("express");
var app = express();
var bodyParser= require ("body-parser");
var mongoose= require ("mongoose");

var Restaurant = require("./models/restaurants"),
Comment = require("./models/comment"),
// User = require("./models/user"),
seedDB = require("./seeds")

seedDB();

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/yelp_clone");
// where yelp_clone will be the name of the db that is being created  



app.get("/", function(req, res){
	res.render("landing.ejs")
});


app.get("/restaurants", function(req, res){
	console.log(req.body);
	// res.render("restaurants.ejs", {restaurants: restaurants})
	Restaurant.find({}, function(err, allRestaurants){
		if (err) {
			console.log("error")
		} else{
			res.render("restaurants/index.ejs", {restaurants: allRestaurants});
		}
	});
});

app.post("/restaurants", function(req, res){
	// get data from the form and add to restaurants array
	var nameRestaurant= req.body.name;
	var image= req.body.image;
	var description= req.body.description;
	var newRestaurant= {name: nameRestaurant, image: image, description: description}
	// restaurants.push(newRestaurant);
	Restaurant.create(newRestaurant, function(err, newCreated){
		if (err) {
			console.log(err);
		}else{
			res.redirect("/restaurants");
		}
	});
	
});

app.get("/restaurants/new", function(req, res){
	res.render("restaurants/new.ejs")
});


// SHOW RESTAURANT
app.get("/restaurants/:id", function(req, res){

	Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant){
		if (err) {
			console.log("Restaurant not found")
		} else{
			console.log(foundRestaurant)
			res.render("restaurants/show.ejs", {restaurant: foundRestaurant});

		}
	});
});




// ============================
// COMMENTS ROUTES
// ============================

app.get("/restaurants/:id/comments/new", function(req, res){

	Restaurant.findById(req.params.id, function(err, foundRestaurant){
		if (err) {
			console.log("Restaurant not found")
		} else{
			console.log(foundRestaurant)
			res.render("comments/new.ejs", {restaurant: foundRestaurant});

		}
	});
});


app.post("/restaurants/:id/comments", function(req, res){
	Restaurant.findById(req.params.id, function(err, foundRestaurant){
		if (err) {
			console.log(err);
			res.redirect("/restaurants");
		}else{
			console.log(req.body.comment)
			Comment.create(req.body.comment, function(err, created){
				foundRestaurant.comments.push(created);
				foundRestaurant.save();
				res.redirect("/restaurants/" + foundRestaurant._id)
			})
		}
	});

})

app.listen(3000, function(){
	console.log("Server running")
})