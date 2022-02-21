const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	username: {type: String, required: true, max: 50, lowercase: true, unique: true},
	name: {type: String, required: true, max: 100},
	password: {type: String, required: true, max: 255},
	email: {type: String, max: 100},
	phone_number: {type: String, required: true, max: 20, lowercase: true},
	refresh_token: {type: String, max: 255},
	total_gold: {type: Number, min: 0, default: 0}
});

// Export the model
module.exports = mongoose.model('User', UserSchema);
