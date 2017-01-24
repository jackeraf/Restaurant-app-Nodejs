


var express = require("express")
var router= express.Router();
var passport= require ("passport");
var User= require("../models/user")


router.get("/", function(req, res){
	res.render("landing.ejs")
});



// ============================
// AUTH ROUTES
// ============================

router.get("/register", function(req,res){
	res.render("register.ejs")
})
router.post("/register", function(req,res){

	var newUser= new User({username: req.body.username });
	User.register(newUser,req.body.password, function(err, user){
		if (err) {
			req.flash("error", err.message)
			console.log(err);
			res.redirect("/register")
		}
		passport.authenticate("local")(req,res, function(){
			req.flash("success", "Welcome to TravelEAT " + user.username);
			res.redirect("/restaurants");
		});
	});
})

// show login form

router.get("/login", function(req, res){

	res.render("login.ejs")
})

// post with middleware after /login in function
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/restaurants",
		failureRedirect: "/login"

	}));

// Logout

router.get("/logout", function(req,res){
	req.logout();
	req.flash("success", "Logged out")
	res.redirect("/restaurants")
});




module.exports= router;