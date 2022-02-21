const User = require('../models/User.model');
const bcrypt = require('bcrypt')
const {SALT_ROUND} = require("../constant/auth");
const jwtVariable = require("../constant/jwt");
const authMethod = require("../methods/auth.method");
const userModel = require("../models/User.model");
//Simple version, without validation or sanitation
exports.save_user = async function (req, res) {
	// const username = req.body.username;
	// const user = await User.findOne({username: username}).exec();
	// if(user) res.status(409).send('Tên tài khoản đã tồn tại!');
	// else {
	// 	const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUND);
	// 	let user = new User({
	// 		name: req.body.name,
	// 		username: username,
	// 		password: hashPassword,
	// 		phone_number: req.body.phone_number
	// 	});
	// 	user.save().then(e => res.send('Create user success!')).catch(err=>res.status(400).send('Fail create user ', JSON.parse(err)))
	// }
}

exports.findAll = async function (req, res) {
	// User.find({},function (err,users){
	// 	let userMap = {}
	// 	users.forEach(function (user) {
	// 		userMap[user._id] = user
	// 	})
	// 	res.send(userMap)
	// })
	const accessTokenFromHeader = req.header('Authorization')?.replace('Bearer ', '');
	if (!accessTokenFromHeader) {
		return res.status(401).send({msg: 'Không tìm thấy access token!', status: 401});
	}
	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
	// console.log(accessTokenFromHeader)
	const verified = await authMethod.verifyToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!verified) {
		return res
			.status(401)
			.send({msg: 'Bạn không có quyền truy cập vào tính năng này!', status: 401});
	}
	req.user = await userModel.findOne({username: verified.payload.username});
	return res.status(200).send(req.user)
}

exports.findById = function (req, res) {
	User.findById(req.params.id, function (err, user) {
			if(err) res.status(404).send({msg: 'user not found'})
			res.send(user)
	})
}

exports.update = function (req, res) {
	if(req.body.password){
		req.body.password = bcrypt.hashSync(req.body.password, SALT_ROUND);
	}

	User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
		if(err) res.send(err)
		res.status(201).send({msg: 'user updated'})
	})
}

exports.delete = function (req, res) {
	User.findByIdAndRemove(req.params.id, function (err) {
		if(err) res.send(err)
		res.status(201).send({msg: `Delete user ${req.params.id} success!`})
	})
}