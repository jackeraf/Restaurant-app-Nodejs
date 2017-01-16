var express = require ("express");
var app = express();
var bodyParser= require ("body-parser");
var mongoose= require ("mongoose");
var passport= require ("passport");
var LocalStrategy= require ("passport-local");
var User= require("./models/user")

var Restaurant = require("./models/restaurants"),
Comment = require("./models/comment"),
// User = require("./models/user"),
seedDB = require("./seeds")

seedDB();

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/yelp_clone");
// where yelp_clone will be the name of the db that is being created  
// ============================
// PASSPORT CONFIG
// ============================

app.use(require("express-session")({
	secret: "rusty is the best",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// to pass the current user to every single template
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
	// if we don't put the next it'll just top and not execute the callbacks from the routes after it
});



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
			res.render("restaurants/index.ejs", {restaurants: allRestaurants });
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
// AUTH ROUTES
// ============================

app.get("/register", function(req,res){
	res.render("register.ejs")
})
app.post("/register", function(req,res){

	var newUser= new User({username: req.body.username });
	User.register(newUser,req.body.password, function(err, user){
		if (err) {
			console.log(err);
			return res.render("register.ejs")
		}
		passport.authenticate("local")(req,res, function(){
			res.redirect("/restaurants");
		})
	} )
})

// show login form

app.get("/login", function(req, res){

	res.render("login.ejs")
})

// post with middleware after /login in function
app.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/restaurants",
		failureRedirect: "/login"

	}));

// Logout

app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/restaurants")
});


// ============================
// COMMENTS ROUTES
// ============================

app.get("/restaurants/:id/comments/new",isLoggedIn, function(req, res){

	Restaurant.findById(req.params.id, function(err, foundRestaurant){
		if (err) {
			console.log("Restaurant not found")
		} else{
			console.log(foundRestaurant)
			res.render("comments/new.ejs", {restaurant: foundRestaurant});

		}
	});
});


app.post("/restaurants/:id/comments",isLoggedIn, function(req, res){
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

// Function is logged in?

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login")
}

app.listen(3000, function(){
	console.log("Server running")
})