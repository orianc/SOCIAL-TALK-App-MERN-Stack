var express = require('express');
var router = express.Router();
const collections = require('../collections');

const GENERIC_MSG_ERROR = 'Login or password is false';

router.get('/login', async (req, res) => {
	try {
		await req.session;
		return res.send({ user: req.session || false });
	} catch (error) {
		return console.error('Error on require currently session : ', error);
	}
});

router.post('/login', async (req, res) => {
	try {
		const email = (await req.body.user.email) || '';
		const pw = (await req.body.user.pw) || '';

		if (!email) {
			return res.status(401).send('Email is required');
		}
		if (!pw) {
			return res.status(401).send('Password is required');
		}

		collections.Users.findOne({ email }).then((user) => {
			if (!user || !user.checkPassword(pw)) {
				return res.status(401).send(GENERIC_MSG_ERROR);
			}
			user.save().then(() => {
				req.session.user = user.toObject();
				req.session.save(() => {
					res.send({ user: req.session.user });
				});
			});
		});
	} catch (error) {
		console.error('Error on login POST', err);
		res.status(500).send('server error unknown');
	}
});

router.get('/logout', (req, res) => {
	try {
		req.session.destroy(() => {
			return res.redirect('/');
		});
	} catch (error) {
		console.error('Error on logout : ', error);
	}
});

router.post('/register', async (req, res) => {
	try {
		const firstName = await (req.body.user.firstName || '').toString();
		const lastName = await (req.body.user.lastName || '').toString();
		const email = await (req.body.user.email || '').toString();
		const pw = await (req.body.user.pw || '').toString();

		if (!firstName || !lastName || !pw || !email) {
			return res.status(401).send('Il manque un champs ');
		}

		const userMatch = await collections.Users.findOne({
			$or: [{ email }],
		}).lean();

		if (userMatch) {
			if (userMatch.email === email) {
				return res.status(401).send('Email already used');
			} else {
				console.log('Wtf error because email no match.', userMatch, 'email was', email);
				return res.status(500).send('Server to hot');
			}
		}

		const newUser = await collections.Users.create({
			firstName,
			lastName,
			pw,
			email,
		});
		return res.send('User : ' + newUser.firstName + newUser.lastName + ' created with value : ' + newUser);
	} catch (err) {
		console.error('Email already use ', err);
		return res.status(500).send('Register error');
	}
});
module.exports = router;
