var express = require('express');
var router = express.Router();
const collections = require('../collections');

/**
 * get all post
 */
// router.get('/get-profile', async (req, res, next) => {
// 	try {
// 		const USER_SESSION = await req.session.user;
// 		const USER_ID = USER_SESSION._id;
// 		console.log('userSession = ', USER_ID);
// 		res.send(USER_SESSION);
// 	} catch (error) {
// 		console.error('fail to get session user : ', error);
// 		res.status(500)('Error ');
// 	}
// });

router.post('/edit', async (req, res, next) => {
	try {
		const USER_SESSION_CHANGE = await req.body.user;
		const USER_CURRENT_DB = collections.Users.findById(USER_SESSION_CHANGE._id, (err, user) => {
			if (!user) {
				req.flash('error', 'No Account');
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
			user.save();
			//To do :  Manage redirect issue.
		});
		console.log('current change = ', USER_SESSION_CHANGE, 'and CURRENT DB INFO = ', USER_CURRENT_DB);
	} catch (error) {
		console.error('fail to get session user : ', error);
		res.status(500)('Error ');
	}
});

module.exports = router;
