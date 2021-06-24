// CONST & Require

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const collection = require('./collections');

const commentsRouter = require('./routes/comments');
const postsRouter = require('./routes/posts');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');

var expressSessionOptions = {
	secret: 'clé secrète',
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 10 * 60 * 60 * 1000, // durée de vie du cookie
	},
};
var cookieParserOptions = {
	httpOnly: false,
};

const app = express();

// UseSetup
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session(expressSessionOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('clé secrète', cookieParserOptions));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes'));
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
