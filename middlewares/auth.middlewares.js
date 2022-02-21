
const jwtVariable = require('../constant/jwt');

const userModel = require('../models/User.model');

const authMethod = require('../methods/auth.method');

exports.isAuth = async (req, res, next) => {
	// Lấy access token từ header
	console.log('',req.body)
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
	return next();
};