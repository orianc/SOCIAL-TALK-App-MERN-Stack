var express = require('express');
var router = express.Router();
const collections = require('../collections');

/**
 * get all post
 */
router.get('/', async (req, res, next) => {
	try {
		const USER_SESSION = await req.session.user;
		console.log('userSession = ', USER_SESSION);
		res.send(USER_SESSION);
	} catch (error) {
		console.error('fail to get session user : ', error);
		res.status(500)('Error ');
	}
});

module.exports = router;
