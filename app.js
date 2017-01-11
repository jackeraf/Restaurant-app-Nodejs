var express = require ("express");
var app = express();
var bodyParser= require ("body-parser");

app.use(bodyParser.urlencoded({extended: true}));


var restaurants = [
		{name: "Chinese restaurant", image: "http://mrdemocratic.com/wp-content/uploads/2015/07/restaurant1.jpg" },
		{name: "Italian restaurant", image: "https://s-media-cache-ak0.pinimg.com/originals/76/7e/ac/767eac254b7370e49f56b406f08cb905.jpg" },
		{name: "Lebanese", image: "http://www.hoteliermiddleeast.com/pictures/gallery/CAT/lebanon-3-web.jpg" }

	];

app.get("/", function(req, res){
	res.render("landing.ejs")
});


app.get("/restaurants", function(req, res){
	console.log(req.body);
	res.render("restaurants.ejs", {restaurants: restaurants})
});

app.post("/restaurants", function(req, res){
	// get data from the form and add to restaurants array
	var nameRestaurant= req.body.name;
	var image= req.body.image;
	var newRestaurant= {name: nameRestaurant, image: image}
	restaurants.push(newRestaurant);
	res.redirect("/restaurants");
});

app.get("/restaurants/new", function(req, res){
	res.render("new.ejs")
});


app.listen(3000, function(){
	console.log("Server running")
})