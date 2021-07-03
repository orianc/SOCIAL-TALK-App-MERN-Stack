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

router.post('/add-comment', async (req, res) => {
	console.log('Route addPost asked');

	var POST_ID = req.body.comment.POST_ID;
	const CURRENT_POST = collections.Posts.findById(POST_ID, (err, post) => {
		if (!post) {
			res.flash('error', 'No post');
			return res.redirect('/posts');
		}

		var USER_DATA = req.body.comment.DATA_USER;
		var USER_ID = USER_DATA._id;
		var USER_FIRST_NAME = USER_DATA.firstName;
		var USER_LAST_NAME = USER_DATA.lastName;
		var COMMENT_CONTENT = req.body.comment.COMMENT_CONTENT.trim();
		if (COMMENT_CONTENT != null) {
			post.comment.push({
				userInformation: {
					USER_ID,
					USER_FIRST_NAME,
					USER_LAST_NAME,
				},
				COMMENT_CONTENT,
			});
		}
		res.send();
	});
});

module.exports = router;
