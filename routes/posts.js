var express = require('express');
var router = express.Router();
const collections = require('../collections');

/**
 * get all post
 */
router.get('/', async (req, res, next) => {
	try {
		const postsList = await collections.Posts.find().lean();
		console.log('GET All posts');
		res.send(postsList);
	} catch (error) {
		console.error('fail to get posts list : ', error);
		res.status(500)('Error ');
	}
});

router.post('/', async (req, res) => {
	console.log('Route POST asked');

	try {
		const newPost = await collections.Posts.create({
			content: req.body.post.content,
		});
		console.log('Poste create');
		res.send('New post create');
	} catch (error) {
		console.error('New post creation failled', error);
		res.status(500).send('Post creatione error');
	}
});

module.exports = router;
