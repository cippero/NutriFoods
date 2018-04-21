var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

///////////USER SCHEMA IN DB////////////
var userSchema = new mongoose.Schema ({
	name: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

///////////CHECK PASSWORD//////////////
userSchema.methods.isAuthenticated = function(password) {
	//bcrypt compare(typedPassword, actualPassword)
	var isCorrectPassword = bcrypt.compareSync(password, this.password);
	return isCorrectPassword ? this : false;
}



/////SAVE HASHED PASSWORD IN DB////////
userSchema.pre('save', function(next) {
	//is user being updated?
	//if yes, they already have a password, which has already been hashed. no action required
	if(!this.isModified('password')) {
		next();
	} else {
		this.password = bcrypt.hashSync(this.password, 10);
		next();
	}
});


module.exports = mongoose.model('User', userSchema);
//mongoose.model(nameOfDBCollection, schema, optionalDBCollectionForcedName)
//nameOfDBCollection becomes plural lower case version in mongo unless we're using a third optional parameter to force a name
//schema is what a user looks like in DB