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

// seedDB();

var commentRoutes= require("./routes/comments"),
	restaurantRoutes= require("./routes/restaurants"),
	indexRoutes= require("./routes/index");

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

app.use(indexRoutes)
app.use("/restaurants/:id/comments",commentRoutes)
// where we will have to put in the restaurants.js and comments.js var router= express.Router({mergeParams: true});
// so the params id can be send
app.use("/restaurants",restaurantRoutes)
// where this will append the /restaurants url so we can remove that part in their routes

app.listen(3000, function(){
	console.log("Server running")
})