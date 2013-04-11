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
				req.facebook.api('/'+req.session.user.FBID+'/feed', 'POST', {'message': "My new goal is to " + req.body.goal_body}, function (err, stuff) {
					if(err)
						console.log("Can't post your new goal to Facebook", err);
					res.redirect('/goals/display');
				});
			});
		});
	});
}

exports.addnail = function(req,res){
	//add a nail to a post when one gets dragged + dropped on it.
	incred_goal = Goal.findOne({_id:req.body.goal_id}).exec(function (err,docs){
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
exports.removenail = function(req,res){
	//remove a nail from a post when the button 'remove a nail' is clicked
	console.log(req.body, 'hello')
	incred_goal = Goal.findOne({_id:req.body.goal_id}).exec(function (err,docs){
		if(err)
			return console.log("Cannot remove a nail from this goal");
		if(docs.nails > 0)
			docs.nails--
		docs.save(function(err){
				if(err)
					console.log("Unable to update user's goals list");
				res.redirect('/fence');
	});
  });
}

// display all goals in db (for debugging purposes)
exports.display = function(req, res){
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






