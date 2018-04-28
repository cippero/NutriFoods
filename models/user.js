var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

////////////////// FOOD SCHEMA ///////////////////
var foodSchema = new mongoose.Schema ({
	food_name:             {type: String, required: true}
  	,brand_name:           String
  	,serving_qty:          Number
  	,serving_unit:         String
  	,serving_weight_grams: Number
	,date:                 String
    ,time:                 String
    ,dateAndTime:          Number
	,is_raw_food:          Boolean
	,meal_type:            Number
	,food_group:           Number
	,ndb_no:               Number
	,calories:             Number
	,protein:              Number
	,total_fat:            Number
	,saturated_fat:        Number
	,total_carbs:          Number
	,fiber:                Number
	,sugars:               Number
	,cholesterol:          Number
	,potassium:            Number
	,sodium:               Number
	,photo:                String
});

/////////////////// USER SCHEMA IN DB //////////////////
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
	},
	height: {
		type: Number,
		required: true
	},
	weight: {
		type: Number,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	sex: {
		type: String,
		required: true
	},
	activityLevel: {
		type: Number,
		required: true
	},
	timezone: {
		type: Number,
		required: true
	},
	food: [foodSchema]
});


////////////////// CHECK PASSWORD ////////////////////
userSchema.methods.isAuthenticated = function(password) {
	//bcrypt compare(typedPassword, actualPassword)
	var isCorrectPassword = bcrypt.compareSync(password, this.password);
	return isCorrectPassword ? this : false;
}

//////////// SAVE HASHED PASSWORD IN DB /////////////
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