var express = require('express');
var router = express.Router();
const collections = require('../collections');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

var currentDate = new Date();
var dateString = currentDate.toDateString();
var cleanDate = dateString.replace(/\s/g, '-');

var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../Client/public/uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, cleanDate + file.originalname);
	},
});

var upload = multer({ storage: storage });

router.post('/edit', async (req, res, next) => {
	try {
		const USER_SESSION_CHANGE = await req.body.user;
		const USER_CURRENT_DB = collections.Users.findById(USER_SESSION_CHANGE._id, (err, user) => {
			if (!user) {
				res.send('error', 'No Account');
				return res.redirect('/login');
			}

			var email = USER_SESSION_CHANGE.email.trim();
			var firstName = USER_SESSION_CHANGE.firstName.trim();
			var lastName = USER_SESSION_CHANGE.lastName.trim();
			var pw = USER_SESSION_CHANGE.pw.trim();
			var age = USER_SESSION_CHANGE.age;

			user.email = email;
			user.firstName = firstName;
			user.lastName = lastName;
			user.age = age;
			user.pw = pw;

			user.save().then(() => {
				req.session.user = user.toObject();
				req.session.save(() => {
					res.send({ user: req.session.user });
				});
			});
		});
	} catch (error) {
		console.error('fail to get session user : ', error);
		res.status(500)('Error ');
	}
});

router.post('/uploadAvatar', upload.single('picture'), (req, res, next) => {
	try {
		const USER_SESSION_CHANGE = req.session.user;
		console.log('isLogged ?', USER_SESSION_CHANGE);

		const USER_CURRENT_DB = collections.Users.findById(USER_SESSION_CHANGE._id, (err, user) => {
			console.log('USER FIND =', user);
			if (!user) {
				res.send('error', 'No Account');
				res.redirect('/');
			}

			user.picture = cleanDate + req.file.originalname;

			user.save().then(() => {
				req.session.user = user.toObject();
				req.session.save(() => {
					res.redirect('profile/edit');
				});
			});
		});
	} catch (error) {
		console.error('Session expire, Please reconnect : ', error);
	}
});

module.exports = router;
