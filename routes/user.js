var User = require('../models/user')

// login a new user, start a new session
exports.login = function (req, res) {
  req.facebook.api('/me', function(err, data){
  	req.facebook.api('/me/picture?redirect=false&type=large', function(err, picData){
	  		var existentUser = User.findOne({name: data.name}, function (err, user){
	  			if(user){
	  				req.session.user = user;
	  				res.redirect('/fence');
		  		}else{
		  			var loggedInUser = new User({name: data.name, FBID: data.id, profPicURL: picData.data.url, goals: []});
		  			loggedInUser.save(function (err){
				  			if(err)
				  				console.log("Unable to save new user.");
				  		 	req.session.user = loggedInUser; 
				  			res.redirect('/fence');
		  			});
		  		}
		  	});
  		});
  });
};

// remove all existent users from the database
exports.delete_all = function(req, res){
	// clears out your list so you can start from scratch
	User.remove({}, function(err) { 
		if(err)
			console.log("Unable to delete users");
		res.redirect('/');
	});
};