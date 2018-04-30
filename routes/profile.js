var express    = require('express');
var request    = require('request');
var router     = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var User       = require('../models/user');

router.get('/', isLoggedIn, function(req, res) {
	res.render("profile", {currentPage: 'Profile'});
})

router.get('/edit', isLoggedIn, function(req, res) {
	res.render("editProfile", {currentPage: 'Edit Profile'});
})

router.put('/update', isLoggedIn, function(req, res) {
	//console.log('updating');
	User.findOneAndUpdate({_id: res.locals.currentUser._id}, req.body, function(err, user) {
		if (err) { return console.log("err:", err); }
		res.render("profile", {currentPage: 'Profile'});
	})
})

module.exports = router;