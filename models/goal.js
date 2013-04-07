var mongoose = require('mongoose'), Schema = mongoose.Schema

var GoalSchema = new Schema({
	owner: String, 
	nails: []
});

var Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;
