const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const autoIncrement = require('mongoose-auto-increment');
const mongooseLeanId = require('mongoose-lean-id');

const CommentSchema = new Schema({
	id_Post: { type: ObjectId, require: true },
	id_User: { type: ObjectId, require: true },
	content: { type: String, require: true },
	postTime: { type: Date, default: Date.now() },
});

CommentSchema.plugin(autoIncrement.plugin, 'Comment');
CommentSchema.plugin(mongooseLeanId);

var Comments;
function make(connection) {
	if (Comments) return Comments;
	Comments = connection.model('Comment', CommentSchema);
	return Comments;
}

module.exports = make;
