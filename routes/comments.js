
var express = require("express")
var router= express.Router({mergeParams: true});
var Restaurant= require("../models/restaurants")
var Comment= require("../models/comment")


// ============================
// COMMENTS ROUTES
// ============================

router.get("/new",isLoggedIn, function(req, res){

	Restaurant.findById(req.params.id, function(err, foundRestaurant){
		if (err) {
			console.log("Restaurant not found")
		} else{
			console.log(foundRestaurant)
			res.render("comments/new.ejs", {restaurant: foundRestaurant});

		}
	});
});


router.post("/",isLoggedIn, function(req, res){
	Restaurant.findById(req.params.id, function(err, foundRestaurant){
		if (err) {
			console.log(err);
			res.redirect("/restaurants");
		}else{
			console.log(req.body.comment)
			Comment.create(req.body.comment, function(err, created){
				// add username of the current user creating the comment
				created.author.id = req.user._id
				created.author.username= req.user.username
				created.save()
				foundRestaurant.comments.push(created);
				foundRestaurant.save();
				res.redirect("/restaurants/" + foundRestaurant._id)
			})
		}
	});

})


// Function is logged in?

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login")
}

module.exports= router;