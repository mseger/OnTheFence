var mongoose = require('mongoose'), Schema = mongoose.Schema

var GoalSchema = new Schema({
	goal_text: String, 
	owner_key: String, 
	nails: Number
});

var Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;
