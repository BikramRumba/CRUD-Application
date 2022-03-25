const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
	foodName: {
		type: String,
		required: true,
	},
	daysSinceIAte: {
		type: Number,
		required: true,
	},
});

const Food = mongoose.model('Food', FoodSchema);
module.exports = Food;

/*
* We can write in this way as well
modul.exports = mongoose.model('Food', FoodSchema) 
 */
