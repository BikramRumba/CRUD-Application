const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const FoodModel = require('./models/Food');
/* 
?Why we need this middleware
*It helps to receive information from the front end in json format so this is extremly important
 */
app.use(express.json());
app.use(cors());
/*
!mongoose library helps to connect our server with the database (MongoDB)
  */
mongoose.connect(
	'mongodb+srv://bikram:rumba@crud.tn7ut.mongodb.net/food?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
	}
);

app.post('/insert', async (req, res) => {
	/*
	 * Inorder to access the value we get from frontend through the middleware express.json()
	 * We will be creating a variable
	 ! req means required
	 */
	const { foodName } = req.body;
	const { days } = req.body;
	/* 	const foodName = req.body.foodName;
	const days = req.body.days; */
	const food = new FoodModel({
		foodName,
		daysSinceIAte: days,
	});
	try {
		await food.save();
	} catch (err) {
		console.log(err);
	}
});

/*
 ? How to read the data from the database and display in UI
 *We need to do get request to read the data from the database based on our 
 *data Model
 !We can pass two things while finding.If we want to read everything we can just pass and empty object

 */
app.get('/read', async (req, res) => {
	FoodModel.find({}, (err, result) => {
		if (err) {
			res.send(err);
		}
		res.send(result);
	});
});

// We need to create a route to UPDATE
app.put('/update', async (req, res) => {
	const { newFoodName } = req.body;
	const { id } = req.body;
	try {
		await FoodModel.findById(id, (err, updatedFood) => {
			updatedFood.foodName = newFoodName;
			updatedFood.save();
			res.send('update');
		});
	} catch (err) {
		console.log(err);
	}
});

// Finally we work on D from CRUD Delete
app.delete('/delete/:id', async (req, res) => {
	const { id } = req.params;
	await FoodModel.findByIdAndRemove(id); // exec is executed we can also add .exec()
	res.send('deleted');
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
