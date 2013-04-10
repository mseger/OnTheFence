var User = require('../models/user')
var Goal = require('../models/goal')

// create a new goal by looking up user, adding goal to their goal's list
exports.create = function(req, res){
	var newGoal = new Goal({goal_text: req.body.goal_body, owner_key: req.session.user, nails: 0});
	newGoal.save(function(err){
		if(err)
			console.log("Could not create new goal");

		// now that we have created + saved a new goal, update user's goals list
		var currUser = User.findOne({name: req.session.user.name}).exec(function (err, docs){
			if(err)
				console.log("Unable to find user to update goals list");
			var curr_goals = docs.goals;
			curr_goals.push(newGoal);
			docs.goals = curr_goals;
			docs.save(function(err){
				if(err)
					console.log("Unable to update user's goals list");
				res.redirect('/goals/display');
			});
		});
	});
}

exports.addnail = function(req,res){
	//add a nail to a post using when the div associated with it gets one dropped on it.
	//we'll give in the goal mongo id.
	console.log(req.body)
	incred_goal_id = req.body.goal_id
	incred_goal = Goal.find({_id:incred_goal_id}).exec(function (err,docs){
		if(err)
			return console.log("Cannot add a nail to this goal");
		docs.nails++;
		docs.save(function(err){
				if(err)
					console.log("Unable to update user's goals list");
				res.redirect('/fence');
	});
  });
}
// display all goals in db (for debugging purposes)
exports.display = function(req, res){
	console.log("CURR SESSION USER ID IS: ", req.session.user.FBID);
	var goals = Goal.find({}).exec(function (err, docs){
		if(err)
			return console.log("Cannot retrieve + display your goals");
		res.render('goals', {title: "All goals", goals: docs});
	});
}

// remove all goals
exports.delete_all = function(req, res){
	// clears out your list so you can start from scratch
	Goal.remove({}, function(err) { 
		if(err)
			console.log("Unable to delete goals");
		res.redirect('/homepage');
	});
};


// post to FB
// req.facebook.api('/'+req.body.fbid+'/feed', 'POST', {'message': req.body.comment}, function (err, stuff) {
