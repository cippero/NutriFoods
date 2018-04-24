var express  = require('express');
var request  = require('request');
var router   = express.Router();
// var User     = require('../models/user');

//////////////////// ROUTES ///////////////////////
router.get('/', function(req, res) {
	res.render("search")
})

router.post('/', function(req, res) {
	let query = req.body.search;
	query = query.replace(/\s/g, '%20');
	let searchUrl = `https://api.edamam.com/api/food-database/parser?ingr=${query}&app_id=${process.env.EDAMAM_ID}&app_key=${process.env.EDAMAM_KEY}&page=0`;
	let quantity = parseInt(req.body.quantity);
	let measurement = req.body.measurement;

	request(searchUrl, function (error, response, body) {
		if (error) { return console.log('error:', error); }
		if (response.statusCode !== 200) { console.log('statusCode:', response && response.statusCode); }

		let result = JSON.parse(body);

		if (!result.parsed[0]) { return console.log("search failed"); }
		let title = result.parsed[0].food.label;
		//title = title.replace(/,.*/, '');
		let uri = result.parsed[0].food.uri;
		let mURI = `http://www.edamam.com/ontologies/edamam.owl#Measure_${measurement}`

		let queryIngrediant = {
			"yield": 1,
			"ingredients": [
				{
					"quantity": quantity,
					"measureURI": mURI,
					"foodURI": uri
				}
			]
		}

		request.post({url:`https://api.edamam.com/api/food-database/nutrients?app_id=${process.env.EDAMAM_ID}&app_key=${process.env.EDAMAM_KEY}`, body: JSON.stringify(queryIngrediant), headers: {'content-type': 'application/json'}}, 
			function optionalCallback(err, httpResponse, bodyInfo) {
				if (err) {
			    	return console.error('upload failed:', err);
			  	}
			  	//console.log('Upload successful!  Server responded with:', bodyInfo);
			  	bodyInfo = JSON.parse(bodyInfo);
			  	//saveSearch(bodyInfo);
			  	console.log(bodyInfo.ingredients[0].parsed[0].food, bodyInfo.totalNutrients.SUGAR.quantity + bodyInfo.totalNutrients.SUGAR.unit, bodyInfo.totalNutrients.SUGAR.label);

			  	res.send("testing");

		});
	});
})

// function saveSearch(info){
// 	return info;
// }

// // post search results
// router.get('/api', function (req, res) {
//   res.json(saveSearch());
// });

module.exports = router;