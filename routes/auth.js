var express  = require('express');
var passport = require('../config/passportConfig');
var router   = express.Router();
var User     = require('../models/user');

////////////////////LOGIN///////////////////////
router.get('/login', function(req, res) {
	res.render('auth/login');
})

router.post('/login', passport.authenticate('local', {
	successRedirect: '/profile',
	successFlash:    'You logged in!',
	failureRedirect: '/auth/login',
	failureFlash:    'Invalid credentials'
}));

////////////////////SIGNUP//////////////////////
router.get('/signup', function(req, res) {
	res.render('auth/signup');
})

router.post('/signup', function(req, res, next) {
	//first, try to find their email in case it already exists
	User.findOne({email: req.body.email}, function(err, user){
		if (err){
			console.log("error:", err);
			req.flash('error', 'Something went wrong! Check the logs.');
			res.redirect('/auth/signup');
		} else if (user) {
			// if user already exists don't let them sign up multiple times with same email
			req.flash('error', 'You already exist');
			res.redirect('/auth/login');
		} else {
			let newUser = req.body;
			User.create(newUser, function(err, createdUser){
				if (err){
					req.flash('error', 'Something went wrong! Check the logs.');
					return console.log('error:', err);
				}
				console.log('Signed up. Let\'s login!');
				passport.authenticate('local', {
					successRedirect: '/profile',
					successFlash:    'You logged in!'
				})(req, res, next);
			})
		}
	})
})

////////////////////LOGOUT/////////////////////
router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'You are logged out. Byeeeee!');
	res.redirect('/');
})

module.exports = router;