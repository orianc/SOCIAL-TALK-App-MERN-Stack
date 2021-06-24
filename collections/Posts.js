const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const autoIncrement = require('mongoose-auto-increment');
const mongooseLeanId = require('mongoose-lean-id');

const PostSchema = new Schema({
	content: { type: String, require: true },
	postTime: { type: Date, default: Date },
	userInformation: {
		_id: { type: Number, require: true },
		firstName: { type: String },
		lastName: { type: String },
	},
	comment: {
		content: { type: String },
		userInformation: {
			_id: { type: Number },
			firstName: { type: String },
			lastName: { type: String },
		},
	},
});

PostSchema.plugin(autoIncrement.plugin, 'Post');
PostSchema.plugin(mongooseLeanId);

var Posts;
function make(connection) {
	if (Posts) return Posts;
	Posts = connection.model('Post', PostSchema);
	return Posts;
}

module.exports = make;
