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

	const id_User = req.body.post.id_User;
	const firstName_User = req.body.post.firstName_User;
	const lastName_User = req.body.post.lastName_User;
	const content = req.body.post.content;

	console.log('le req body donne : ', id_User, firstName_User, lastName_User, content);

	try {
		const newPost = await collections.Posts.create({
			id_User,
			firstName_User,
			lastName_User,
			content,
		});
		res.send('New post create');
	} catch (error) {
		console.error('New post creation failed', error);
		res.status(500).send('Post creation error');
	}
});

module.exports = router;
