var mongoose = require('mongoose'), Schema = mongoose.Schema

var FenceSchema = new Schema({
	goals: [], 
	owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

var Fence = mongoose.model('Fence', FenceSchema);

module.exports = Fence;


