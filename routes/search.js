var express    = require('express');
var request    = require('request');
var router     = express.Router();
var User       = require('../models/user');
let searchList = [];

//////////////////////////////////////////////////////////////////

// router.get('/', function(req, res) {
// 	res.render("search")
// })

//////////////////////////////////////////////////////////////////

router.post('/', function(req, res) {
	searchList = [];
	let query = req.body.text;
	let searchUrl = `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`

	request(searchUrl, {headers: {"x-app-id": process.env.NUTRITIONIX_ID, "x-app-key": process.env.NUTRITIONIX_KEY}}, function (error, response, body) {

		if (error) { return console.log('error:', error); }
 		if (response.statusCode !== 200) { console.log('statusCode:', response && response.statusCode); }
 		
 		let result = JSON.parse(body);
 		let currentImg;

 		if (result.common == false || result.branded == false) { 
 			res.send("empty search");
 			return console.log("empty search"); 
 		}

 		for (let i=0; i<3; i++){
 			if (typeof result.common[i].photo.thumb !== "string") {
 				currentImg = "https://d2xdmhkmkbyw75.cloudfront.net/540_thumb.jpg";
 			} else {
 				currentImg = result.common[i].photo.thumb;
 			}
 			searchList.push({
 				name:   result.common[i].food_name
				,image: currentImg
 			});
 		}
 		for (let i=0; i<3; i++){
 			if (typeof result.branded[i].photo.thumb !== "string") {
 				currentImg = "https://d2xdmhkmkbyw75.cloudfront.net/540_thumb.jpg";
 			} else {
 				currentImg = result.branded[i].photo.thumb;
 			}
 			searchList.push({
 				name:          result.branded[i].food_name
 				,nix_brand_id: result.branded[i].nix_brand_id
				,image:        currentImg
 			});
 		};
 		res.json(searchList);
 	});
});

//////////////////////////////////////////////////////////////////

router.post('/nutrients', function(req, res) {
	let query = {query: req.body.search};
	//let query = {query: req.body.search, timezone: };
	request.post({url:`https://trackapi.nutritionix.com/v2/natural/nutrients`, body: JSON.stringify(query), headers: {'Content-Type': 'application/json', "x-app-id": process.env.NUTRITIONIX_ID, "x-app-key": process.env.NUTRITIONIX_KEY}}, function optionalCallback(err, httpResponse, body) {
			if (err) { return console.error('upload failed:', err); }
		  	//console.log('Upload successful!  Server responded with:', body);
		  	
		  	body = JSON.parse(body);

			if (!body.foods) { return console.log('empty search'); res.send("empty search"); }
				
			let img = "https://d2xdmhkmkbyw75.cloudfront.net/540_thumb.jpg";
			if (body.foods[0].photo.highres) { img = body.foods[0].photo.highres }
			else if (body.foods[0].photo.thumb) { img = body.foods[0].photo.thumb }

			let date = body.foods[0].consumed_at.slice(0, 10);
			let time = body.foods[0].consumed_at.slice(11, 16);
			let dateAndTime = date.replace(/-/g, '') + time.replace(/:/, '');

			let foodItem = {
				food_name:             body.foods[0].food_name //string
			  	,brand_name:           body.foods[0].brand_name //string
			  	,serving_qty:          body.foods[0].serving_qty //number
			  	,serving_unit:         body.foods[0].serving_unit //string
			  	,serving_weight_grams: body.foods[0].serving_weight_grams //number
				,date:                 date //string
				,time:                 time //string
				,dateAndTime:          dateAndTime //number
				,is_raw_food:          body.foods[0].metadata.is_raw_food //boolean
				,meal_type:            body.foods[0].meal_type //number
				,food_group:           body.foods[0].tags.food_group //number
				,ndb_no:               body.foods[0].ndb_no //number
				,calories:             body.foods[0].nf_calories //number
				,protein:              body.foods[0].nf_protein //number
				,total_fat:            body.foods[0].nf_total_fat //number
				,saturated_fat:        body.foods[0].nf_saturated_fat //number
				,total_carbs:          body.foods[0].nf_total_carbohydrate //number
				,fiber:                body.foods[0].nf_dietary_fiber //number
				,sugars:               body.foods[0].nf_sugars //number
				,cholesterol:          body.foods[0].nf_cholesterol //number
				,potassium:            body.foods[0].nf_potassium //number
				,sodium:               body.foods[0].nf_sodium //number
				,photo:                img //string
			}
			console.log(foodItem);
		  	res.send(foodItem);
		}
	);
});

//////////////////////////////////////////////////////////////////

router.post('/item', function(req, res) {
	User.findOne({_id: res.locals.currentUser._id}, function(err, user) {
		if (err) { return console.log("err:", err); }
		user.food.push(req.body);
		user.save();
		res.send('saved item');
	})
})

//////////////////////////////////////////////////////////////////

router.delete('/item/:id', function(req, res) {
	User.findOne({_id: res.locals.currentUser._id}, function(err, user) {
		if (err) { return console.log("err:", err); }
		user.food.id(req.params.id).remove();
		user.save();
		res.send("deleted");
	})
})

//////////////////////////////////////////////////////////////////

module.exports = router;