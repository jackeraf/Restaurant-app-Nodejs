

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

// EDIT restaurant


router.get("/:id/edit", function(req, res){

	Restaurant.findById(req.params.id, function(err, foundRestaurant){
		if (err) {
			res.redirect("/restaurants")
		}else{
			res.render("restaurants/edit.ejs", {restaurant: foundRestaurant})
		}
	});
	
})

// UPDATE route

router.put("/:id", function(req, res){
	// find and update the correct restaurant
	var data= {name: req.body.name, image: req.body.image, description: req.body.description}
	Restaurant.findByIdAndUpdate(req.params.id, data, function(err, updatedRestaurant){
		if (err) {
			res.redirect("/restaurants")
		}else{
			res.redirect("/restaurants/" + req.params.id)
		}
	})
})

// DESTROY route

router.delete("/:id", function(req, res){
	Restaurant.findByIdAndRemove(req.params.id, function(err, removed){
		if (err) {
			res.redirect("/restaurants")
		}
		res.redirect("/restaurants")
	})

})










// Function is logged in?

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login")
}

module.exports= router;