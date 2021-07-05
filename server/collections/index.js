const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
// url to local data base.
const mongoDbUrl = 'mongodb://localhost/socialtalk-db';
// url to cloud data base.
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
