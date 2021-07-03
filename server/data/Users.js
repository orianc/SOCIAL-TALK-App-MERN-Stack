const collections = require('../collections');
const UsersSchema = require('../collections/Users');

UsersSchema.create({
	name: 'Tom',
	age: 27,
	email: 'mail@mail.com',
	pw: 'pw',
	picture: 'image-profil.jpeg',
});
