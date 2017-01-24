// All the middleware goes here
var Restaurant= require("../models/restaurants");
var Comment= require("../models/comment");
var middlewareObj= {};

middlewareObj.checkRestaurantOwnership= function(req, res, next){

	if (req.isAuthenticated()) {
		// does the logged in user own/created the restaurant?

		Restaurant.findById(req.params.id, function(err, foundRestaurant){
			if (err) {
				req.flash("error", "Restaurant not found")
				res.redirect("back")
				// where back we'll take the user back from where they came from
			}else{
				console.log(foundRestaurant)
				if (foundRestaurant.author.id.equals(req.user._id)) {
					next();
				}else{
					req.flash("error", "You don't have permission to do that")
					res.redirect("back")
				}
			}
		});
	}else{
		req.flash("error", "You need to be logged in to do that")
		res.redirect("back");
		// where back we'll take the user back from where they came from
	}

}

middlewareObj.checkCommentOwnership= function(req, res, next){

	if (req.isAuthenticated()) {
		// does the logged in user own/created the restaurant?

		Comment.findById(req.params.comment_id, function(err, foundComment){
			if (err) {
				req.flash("error", "Comment not found")
				res.redirect("back")
				// where back we'll take the user back from where they came from
			}else{
				console.log(foundComment)
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				}else{
					req.flash("error", "You don't have permission to do that")
					res.redirect("back")
				}
			}
		});
	}else{
		req.flash("error", "You need to be logged in to do that")
		res.redirect("back");
		// where back we'll take the user back from where they came from
	}

}

middlewareObj.isLoggedIn= function(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You need to be logged in to do that")
	res.redirect("/login")
}


module.exports= middlewareObj;