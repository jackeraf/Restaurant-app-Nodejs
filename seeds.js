
var mongoose= require("mongoose");

var Restaurant = require("./models/restaurants"),
	Comment = require("./models/comment")



var data= 

[
		{
			name: "Japanese 1",
			image: "https://s-media-cache-ak0.pinimg.com/originals/15/5b/3a/155b3a605e5a46df498132cb89e6aaa1.jpg",
			description: "Bacon ipsum dolor amet shankle brisket cow rump leberkas andouille salami. Turkey tongue tail, short ribs rump swine shank venison ball tip fatback brisket chuck andouille spare ribs. Filet mignon shoulder leberkas, ground round pancetta beef ribs short ribs chuck porchetta turducken t-bone pork pig fatback. Andouille tail swine, rump sausage ribeye cow cupim spare ribs ham beef ribs. Ham hock tenderloin ham, jerky capicola porchetta strip steak pork belly beef ribs short loin boudin."

		},
		{
			name: "Japanese 2",
			image: "http://cbssanfran.files.wordpress.com/2012/09/sushi-ran.jpg",
			description: "Beef ribs frankfurter t-bone landjaeger drumstick cupim sirloin kevin pork loin alcatra shoulder venison jowl. Ball tip salami brisket drumstick, ribeye corned beef hamburger pork belly spare ribs biltong chuck strip steak. Shankle kielbasa jowl tail jerky. T-bone alcatra bresaola ball tip rump ham turkey ground round kevin swine kielbasa tongue. Andouille kevin venison alcatra. Kielbasa chuck t-bone short ribs leberkas."

		},
		{
			name: "Japanese 3",
			image: "http://www.easternsushi.com/img/inside1.jpg",
			description: "Pork belly ground round short loin turducken meatball andouille pancetta. Fatback beef frankfurter porchetta, landjaeger jowl biltong bacon ground round pork belly. T-bone pig fatback, jowl capicola spare ribs meatball corned beef pork loin drumstick short ribs beef meatloaf ball tip turkey. Venison boudin tenderloin picanha chuck ball tip sirloin kielbasa. Venison shoulder fatback cow jowl capicola flank pig ham hock bacon kevin kielbasa meatball brisket."

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
