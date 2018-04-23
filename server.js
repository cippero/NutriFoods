///////////////////LOAD MODULES///////////////////
require('dotenv').config(); //loads the .env
var express        = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser     = require('body-parser');
var flash          = require('connect-flash');
var isLoggedIn     = require('./middleware/isLoggedIn');
var mongoose       = require('mongoose');
var morgan         = require('morgan');
var passport       = require('./config/passportConfig');
var session        = require('express-session');
var app            = express();

///////////////CONNECT TO DATABASE////////////////
mongoose.connect('mongodb://localhost/nutrifood');

////////////////SET & USE MODULES/////////////////
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressLayouts);
app.use(morgan('tiny'));
app.use(session({
	secret:            process.env.SESSION_SECRET,
	resave:            false,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

//just a convenience that makes life easier:
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

/////////////////////ROUTES///////////////////////
app.get('/', function(req,res) {
	res.render('home');
})

app.get('/profile', isLoggedIn, function(req, res) {
	res.render("profile");
})

app.get('/search', function(req, res) {
	res.render("search", {food: ""});
})

app.post('/search', function(req, res) {
	console.log(req.body.search);
	// res.render("search", {food: req.body.search});
	res.send(req.body.search);
})

app.use('/auth', require('./routes/auth'));

app.use(function(req, res){
    res.status(404).send('<h1>404</h1>');
});

////////////////////LISTENING/////////////////////
app.listen(process.env.PORT || 3000, function(){
	console.log('Listening...');
});