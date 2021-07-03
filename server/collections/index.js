const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const mongoDbUrl = 'mongodb://localhost/socialtalk-db';
const mongoDbUrlAtlas = 'mongodb+srv://dev:socialtalk@socialtalk.jqf6c.mongodb.net/DB_SocialTalk?retryWrites=true&w=majority';
const db = mongoose.connection;

mongoose.connect(mongoDbUrlAtlas, { useNewUrlParser: true, useUnifiedTopology: true });

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log(`Connection to ${mongoDbUrlAtlas} is ok !`);
	start(db);
});

var collections = { initialized: false };
function start(db) {
	autoIncrement.initialize(db);
	collections.Posts = require('./Posts')(db);
	collections.Comments = require('./Comments')(db);
	collections.Users = require('./Users')(db);
}
module.exports = collections;

// const connection = mongoose.connect(
// 	mongoDbUrl,
// 	{
// 		useNewUrlParser: true,
// 		useFindAndModify: false,
// 		useCreateIndex: true,
// 		useUnifiedTopology: true,
// 	},
// 	(err) => {
// 		if (err) {
// 			console.error('MongoDB connection error: ', err);
// 			// setTimeout( function(){ tryConnect(); }, 1000 );
// 		} else {
// 			console.log('MongoDB connexion Success');

// 			// afterConnection();
// 			// TODO updater l'objet connection dans les collections ?
// 		}
// 	},
// );
