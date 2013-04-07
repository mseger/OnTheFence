var User = require('../models/user')
var Goal = require('../models/goal')
var Nail = require('../models/nail')

exports.display = function(req, res){
	res.render('homepage', {title: req.session.user + "'s profile page"});
}

