var mongoose = require('mongoose'), Schema = mongoose.Schema

var UserSchema = new Schema({
	name: String, 
	profPicURL: String, 
	goals: [{type: Schema.Types.ObjectId, ref: 'Goal'}]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
