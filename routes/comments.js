
var express = require("express")
var router= express.Router({mergeParams: true});
var Restaurant= require("../models/restaurants")
var Comment= require("../models/comment")
var middleware= require("../middleware/index.js");


// ============================
// COMMENTS ROUTES
// ============================

router.get("/new", middleware.isLoggedIn, function(req, res){

	Restaurant.findById(req.params.id, function(err, foundRestaurant){
		if (err) {
			console.log("Restaurant not found")
		} else{
			console.log(foundRestaurant)
			res.render("comments/new.ejs", {restaurant: foundRestaurant});

		}
	});
});


router.post("/", middleware.isLoggedIn, function(req, res){
	Restaurant.findById(req.params.id, function(err, foundRestaurant){
		if (err) {
			req.flash("error", "Something went wrong")
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
				req.flash("success", "Comment successfully created")
				res.redirect("/restaurants/" + foundRestaurant._id)
			})
		}
	});

})

// EDIT COMMENT ROUTE

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if (err) {
			res.redirect("back")
		}else{
			res.render("comments/edit.ejs", {restaurant_id: req.params.id, comment: foundComment});
		}
	})
})

// UPDATE COMMENT ROUTE

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if (err) {
			res.redirect("back")
		}else{
			res.redirect("/restaurants/" + req.params.id);
		}
	})
})

// DELETE ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){

	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err) {
			res.redirect("back")
		}else{
			req.flash("success", "Successfully deleted comment")
			res.redirect("/restaurants/"+ req.params.id)
		}
	})
})




module.exports= router;


