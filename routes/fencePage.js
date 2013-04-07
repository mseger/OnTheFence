var User = require('../models/user')
var Fence = require('../models/fence')
var Goal = require('../models/goal')

exports.showFence = function(req, res){
	var currUser = User.findOne({name: req.session.user.name}).populate('goals').exec(function (err, docs){
		if(err)
			console.log("Unable to find user to update goals list");
		var curr_goals = docs.goals;
		console.log('owner: ', req.session.user.name);
		console.log('goals: ', curr_goals);
		res.render('fencePage', {title: "Your Fence", owner: req.session.user.name, goals: curr_goals});
});
}