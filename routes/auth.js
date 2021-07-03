var express = require('express');
var router = express.Router();
const collections = require('../collections');

/* GET users listing. */
router.get('/', async function (req, res, next) {
	try {
		const usersList = await collections.Users.find().lean();
		console.log('obtain get = ', usersList);
		res.send(usersList);
	} catch (error) {
		console.error('fail to get users list : ', error);
		res.status(500)('Error ');
	}
});

router.get('/login', (req, res) => {
	console.log('req.session = ', { user: req.session });
	res.send({ user: req.session || false });
});

const GENERIC_MSG_ERROR = 'Login or password is false';
router.post('/login', (req, res) => {
	// voir pour modifier et voir sur le même input une vérif soit du login soit de l'email
	const email = req.body.user.email || '';
	const pw = req.body.user.pw || '';

	if (!email) {
		return res.status(401).send('Email is required');
	}
	if (!pw) {
		return res.status(401).send('Password is required');
	}

	collections.Users.findOne({ email })
		.then((user) => {
			console.log('pw requiere from bordy = ', pw);
			console.log('pw from data = ', user.pw);
			console.log('checkpassword is valid = ', user.checkPassword(pw));
			if (!user || !user.checkPassword(pw)) {
				return res.status(401).send(GENERIC_MSG_ERROR);
			}
			user.save().then(() => {
				req.session.user = user.toObject();
				req.session.save(() => {
					res.send({ user: req.session.user });
				});
			});
		})
		.catch((err) => {
			console.error('LOGIN Server Error', err);
			res.status(500).send('server error unknown');
		});

	if (email === 'req.db.user' && pw === 'yolo1234') {
		res.status(401).send('Login Failed Try Again Boy !');
	}
});

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		res.redirect('/');
	});
});

router.post('/register', async (req, res) => {
	const firstName = (req.body.user.firstName || '').toString();
	const lastName = (req.body.user.lastName || '').toString();
	const email = (req.body.user.email || '').toString();
	const pw = (req.body.user.pw || '').toString();

	if (!firstName || !lastName || !pw || !email) {
		return res.status(401).send('Il manque un champs ');
	}

	try {
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
		res.send('User : ' + newUser.firstName + newUser.lastName + ' created with value : ' + newUser);
	} catch (err) {
		console.error('Email already use ', err);
		res.status(500).send('Register error');
	}
});
module.exports = router;
