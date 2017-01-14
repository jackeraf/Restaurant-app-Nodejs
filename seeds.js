
var mongoose= require("mongoose");

var Restaurant = require("./models/restaurants"),
	Comment = require("./models/comment")



var data= 

[
		{
			name: "Japanese 1",
			image: "https://s-media-cache-ak0.pinimg.com/originals/15/5b/3a/155b3a605e5a46df498132cb89e6aaa1.jpg",
			description: "One"

		},
		{
			name: "Japanese 2",
			image: "http://cbssanfran.files.wordpress.com/2012/09/sushi-ran.jpg",
			description: "Two"

		},
		{
			name: "Japanese 3",
			image: "http://www.easternsushi.com/img/inside1.jpg",
			description: "Three"

		}


]




// function seedDB(){
// 	Restaurant.remove({}, function(){
// 			console.log("Removed restaurants");
// 			data.forEach(function(restaurant){
// 				Restaurant.create(restaurant, function(restaurant){
// 					console.log("Added restaurant");
// 					Comment.create({
// 						text: "this place is great",
// 						author: "Homer"
// 					}, function(err, comment){
// 						if (err) {
// 							console.log(err)
// 						}else{
// 							restaurant.comments.push(comment)
// 							restaurant.save()
// 							console.log("Created new comment")
// 						}
// 					})
// 				})
// 			})
// 	})

// }


function seedDB(){
  // remove all campground data from the db
  Restaurant.remove({},function(error){
    if(error){
      console.log(error);
    } else {
      console.log("removed data");
    }
  });
  // seed the db with campground information
  data.forEach(function(seed){
    Restaurant.create(seed, function(error, restaurant){
      if(error){
        console.log(error);
      } else {
        console.log("added restaurant");
        // Create a comment
        Comment.create({
          text: "This is a great place for burgers~!",
          author: "Jimmy Falon"
        }, function(error, comment){
          if(error){
            console.log(error);
          } else{
            restaurant.comments.push(comment)
            restaurant.save();
            console.log("Created a new comment");
          }
        });
      }
    });
  });
}


module.exports= seedDB;
