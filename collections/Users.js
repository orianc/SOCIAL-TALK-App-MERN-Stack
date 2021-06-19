const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const mongooseLeanId = require('mongoose-lean-id');

const UserSchema = new Schema(
	{
		firstName: { type: String, require: true },
		lastName: { type: String, require: true },
		age: { type: Number, default: 0 },
		email: { type: String, require: true, unique: true },
		pw: { type: String, require: true },
		picture: { type: Buffer, contentType: String },
	},
	{ timestamps: true },
);

UserSchema.statics.create = function (packet) {
	const newUser = new Users(packet);
	return new Promise((res, rej) => {
		newUser
			.save()
			.then(() => {
				console.log('User.create() : success ');
				return res(newUser);
			})
			.catch((err) => {
				console.error('failed User.create() : ', err);
				return rej('DB_ERROR');
			});
	});
};

UserSchema.plugin(autoIncrement.plugin, 'User');
UserSchema.plugin(mongooseLeanId);

UserSchema.methods.checkPassword = function (pwFromBody) {
	if (pwFromBody === this.pw) {
		return true;
	}
	return false;
};

var Users;
function make(connection) {
	if (Users) return Users;
	Users = connection.model('User', UserSchema);
	return Users;
}

module.exports = make;
