var mongoose = require('mongoose'), Schema = mongoose.Schema

var GoalSchema = new Schema({
	goal_text: String, 
	owner: {type: Schema.Types.ObjectId, ref: 'User'}, 
	nails: [{type: Schema.Types.ObjectId, ref: 'Nail'}]
});

var Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;
