var express = require('express');
var router = express.Router();
const DATA_USERS = require('../data/users.json');

router.get('/list', async (req, res) => {
	try {
		res.status(200).json(DATA_USERS);
	} catch (error) {
		console.error('fail to get posts list : ', error);
		res.status(500)('Error GET ');
	}
});

router.get('/:id', async (req, res) => {
	let { id } = req.params;
	id = Number(id);
	try {
		let user = DATA_USERS.find((user) => user._id === id);
		res.status(200).send(DATA_USERS.user);
	} catch (error) {
		console.error('fail to get posts list : ', error);
		res.status(500)('Error GET ');
	}
});

module.exports = router;
// try {
// 	var { name } = req.params;
// 	name = String(name);
// 	console.log(name);
// 	for (let i = 0; i < DATA_USERS.length; i++) {
// 		const user = DATA_USERS[i];
// 		console.log(user);
// 		if (user.name === name) {
// 			return res.status(200).json(user);
// 		}
// 	}
