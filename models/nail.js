var mongoose = require('mongoose'), Schema = mongoose.Schema

var NailSchema = new Schema({
	goal: String, 
	coordinate: [String]
});

var Nail = mongoose.model('Nail', NailSchema);

module.exports = Nail;
