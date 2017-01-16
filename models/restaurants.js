
var mongoose= require ("mongoose");



// SCHEMA SETUP:

var restaurantsSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Comment"
				}
			]
});

var Restaurant= mongoose.model("Restaurants", restaurantsSchema);

module.exports= Restaurant;