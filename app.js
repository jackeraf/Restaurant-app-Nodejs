var express = require ("express");
var app = express();





app.get("/", function(req, res){
	res.render("landing.ejs")
});


app.get("/restaurants", function(req, res){
	var restaurants = [
		{name: "Chinese restaurant", image: "http://mrdemocratic.com/wp-content/uploads/2015/07/restaurant1.jpg" },
		{name: "Italian restaurant", image: "https://s-media-cache-ak0.pinimg.com/originals/76/7e/ac/767eac254b7370e49f56b406f08cb905.jpg" },
		{name: "Lebanese", image: "http://www.hoteliermiddleeast.com/pictures/gallery/CAT/lebanon-3-web.jpg" }

	]
	res.render("restaurants.ejs", {restaurants: restaurants})
});




app.listen(3000, function(){
	console.log("Server running")
})