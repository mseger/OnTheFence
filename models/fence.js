var mongoose = require('mongoose'), Schema = mongoose.Schema

var FenceSchema = new Schema({
	goals: [], 
	owner: user
});

var Fence = mongoose.model('Fence', FenceSchema);

module.exports = Fence;


