

var express = require("express")
var router= express.Router({mergeParams: true});
var Restaurant= require("../models/restaurants")


router.get("/", function(req, res){
	console.log(req.body);
	// res.render("restaurants.ejs", {restaurants: restaurants})
	Restaurant.find({}, function(err, allRestaurants){
		if (err) {
			console.log("error")
		} else{
			res.render("restaurants/index.ejs", {restaurants: allRestaurants });
		}
	});
});

router.post("/",isLoggedIn, function(req, res){
	// get data from the form and add to restaurants array
	var nameRestaurant= req.body.name;
	var image= req.body.image;
	var description= req.body.description;
	var author= {
		id: req.user._id,
		username: req.user.username
	};
	var newRestaurant= {name: nameRestaurant, image: image, description: description, author: author}
	// restaurants.push(newRestaurant);
	Restaurant.create(newRestaurant, function(err, newCreated){
		if (err) {
			console.log(err);
		}else{
			console.log(newCreated)
			res.redirect("/restaurants");
		}
	});
	
});

router.get("/new",isLoggedIn, function(req, res){
	res.render("restaurants/new.ejs")
});


// SHOW RESTAURANT
router.get("/:id", function(req, res){

	Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant){
		if (err) {
			console.log("Restaurant not found")
		} else{
			console.log(foundRestaurant)
			res.render("restaurants/show.ejs", {restaurant: foundRestaurant});

		}
	});
});


// Function is logged in?

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login")
}

module.exports= router;