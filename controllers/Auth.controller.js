const randToken = require('rand-token');
const bcrypt = require('bcrypt');

const User = require('../models/User.model');
const authMethod = require('../methods/auth.method');

const jwtVariable = require('../constant/jwt');
const {SALT_ROUND} = require('../constant/auth');

exports.register = async (req, res) => {
	const username = req.body.username;
	const user = await User.findOne({username: username}).exec();
	if(user) res.status(409).send({msg: 'Tên tài khoản đã tồn tại!'});
	else {
		const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUND);
		let user = new User({
			name: req.body.name,
			username: username,
			password: hashPassword,
			phone_number: req.body.phone_number
		});
		try {
			user.save().then(e => res.send('Create user success!')).catch(err=>res.status(400).send('Fail create user ', JSON.stringify(err)))
		} catch (e) {
			res.status(400).send('Fail register user!', JSON.stringify(e))
		}

	}
};

exports.login = async (req, res) => {
	const username = req.body.username.toLowerCase();
	const password = req.body.password;

	const user = await User.findOne({username: username});
	if (!user) {
		return res.status(401).send({msg: 'Tên đăng nhập không tồn tại.'});
	}

	const isPasswordValid = bcrypt.compareSync(password, user.password);
	if (!isPasswordValid) {
		return res.status(401).send({msg: 'Mật khẩu không chính xác.'});
	}

	const accessTokenLife =
		process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;
	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;

	const dataForAccessToken = {
		username: user.username,
	};
	const accessToken = await authMethod.generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(401)
			.send({msg: 'Đăng nhập không thành công, vui lòng thử lại.'});
	}

	let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
	if (!user.refreshToken) {
		// Nếu user này chưa có refresh token thì lưu refresh token đó vào database
		await User.findOneAndUpdate({username: user.username}, {refresh_token: refreshToken}, {new: true})
	} else {
		// Nếu user này đã có refresh token thì lấy refresh token đó từ database
		refreshToken = user.refreshToken;
	}

	return res.json({
		msg: 'Đăng nhập thành công.',
		accessToken,
		refreshToken,
		user,
	});
};

exports.refreshToken = async (req, res) => {
	// Lấy access token từ header
	const accessTokenFromHeader = req.headers.x_authorization;
	if (!accessTokenFromHeader) {
		return res.status(400).send('Không tìm thấy access token.');
	}

	// Lấy refresh token từ body
	const refreshTokenFromBody = req.body.refreshToken;
	if (!refreshTokenFromBody) {
		return res.status(400).send('Không tìm thấy refresh token.');
	}

	const accessTokenSecret =
		process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
	const accessTokenLife =
		process.env.ACCESS_TOKEN_LIFE || jwtVariable.accessTokenLife;

	// Decode access token đó
	const decoded = await authMethod.decodeToken(
		accessTokenFromHeader,
		accessTokenSecret,
	);
	if (!decoded) {
		return res.status(400).send('Access token không hợp lệ.');
	}

	const username = decoded.payload.username; // Lấy username từ payload

	const user = await userModel.getUser(username);
	if (!user) {
		return res.status(401).send('User không tồn tại.');
	}

	if (refreshTokenFromBody !== user.refreshToken) {
		return res.status(400).send('Refresh token không hợp lệ.');
	}

	// Tạo access token mới
	const dataForAccessToken = {
		username,
	};

	const accessToken = await authMethod.generateToken(
		dataForAccessToken,
		accessTokenSecret,
		accessTokenLife,
	);
	if (!accessToken) {
		return res
			.status(400)
			.send('Tạo access token không thành công, vui lòng thử lại.');
	}
	return res.json({
		accessToken,
	});
};