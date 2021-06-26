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

	const USER_DATA = req.body.post.DATA_USER;
	const USER_ID = USER_DATA._id;
	const USER_FIRST_NAME = USER_DATA.firstName;
	const USER_LAST_NAME = USER_DATA.lastName;

	const POST_CONTENT = req.body.post.content;

	// console.log('le req body donne : ', USER_DATA);

	try {
		const newPost = await collections.Posts.create({
			content: POST_CONTENT,
			userInformation: {
				_id: USER_ID,
				firstName: USER_FIRST_NAME,
				lastName: USER_LAST_NAME,
			},
		});
		res.send('New post create');
	} catch (error) {
		console.error('New post creation failed', error);
		res.status(500).send('Post creation error');
	}
});

router.post('/add-comment', async (req, res) => {
	console.log('Method POST to add comment is asked');

	var POST_ID = req.body.comment.POST_ID;
	var CURRENT_POST = collections.Posts.findById(POST_ID, (err, post) => {
		if (!post) {
			req.flash('error', 'No post');
			return res.redirect('/posts');
		}

		var USER_DATA = req.body.comment.DATA_USER;
		var USER_ID = USER_DATA._id;
		var USER_FIRST_NAME = USER_DATA.firstName;
		var USER_LAST_NAME = USER_DATA.lastName;
		var COMMENT_CONTENT = req.body.comment.COMMENT_CONTENT.trim();
		const newComment = {
			userInformation: {
				USER_ID,
				USER_FIRST_NAME,
				USER_LAST_NAME,
			},
			comment_content: COMMENT_CONTENT,
		};
		post.comments.push(newComment);
		post.save().then(() => {
			res.send({ result: newComment }).then(() => res.redirect('/posts'));
		});
		//To do :  Manage redirect issue.
	});

	// } catch (error) {
	// 	console.error('New post creation failed', error);
	// 	res.status(500).send('Post creation error');
	// }
});

module.exports = router;
