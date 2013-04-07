var mongoose = require('mongoose'), Schema = mongoose.Schema

var NailSchema = new Schema({
	goal: {type: Schema.Types.ObjectId, ref: 'Goal'}, 
	coordinate: [Number]
});

var Nail = mongoose.model('Nail', NailSchema);

module.exports = Nail;
