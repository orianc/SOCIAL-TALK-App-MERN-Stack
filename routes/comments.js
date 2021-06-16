var express = require('express');
var router = express.Router();
const collections = require('../collections');

/**
 * get all post
 */
router.get('/', async (req, res, next) => {
	try {
		const commentsList = await collections.Comments.find().lean();
		console.log('obtain get = ', commentsList);
		res.send(commentsList);
	} catch (error) {
		console.error('fail to get posts list : ', error);
		res.status(500).send('Error ');
	}
});

module.exports = router;
