var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/user');

//tell passport how to store data in the session
//serialization so we don't have to store entire user object in session

passport.serializeUser(function(user, callback) {
	//callback(error, data)
	//error: if an error happened, pass it, otherwise, null/false/falsey value for no error
	callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
	User.findById(id).then(function(user){
		//success
		callback(null, user);
	}).catch(function(err){
		//something went wrong
		callback(err, null);
	});
});

// implement loogin functionality
passport.use(new LocalStrategy({
	usernameField: 'email',
	password: 'password'
}, function(email, password, callback){
	//1. find the user
	User.findOne({email: email}, function(err, user){
		//2. validate credentials
		if (err || !user || !user.isAuthenticated(password)){
			console.log('error', err);
			callback(err, null);
		} else {
		//3. done! (callback)
			callback(null, user);
		}
	});
	
}));

module.exports = passport;