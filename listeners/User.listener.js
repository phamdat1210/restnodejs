const jwtVariable = require('../constant/jwt');

const userModel = require('../models/User.model');
const authMethod = require("../methods/auth.method");

module.exports = (io, socket) => {
	socket.on('user_update_coin', (data)=>{
		if(data?.token !== '' || data?.token !== undefined || data?.token !== null) {
			console.log('da', data)
			const accessTokenSecret =
				process.env.ACCESS_TOKEN_SECRET || jwtVariable.accessTokenSecret;
			authMethod.verifyToken(
				data.token,
				accessTokenSecret,
			).then((verified)=>{
				userModel.findOne({username: verified.payload.username}).then(user=>{
					if(data.type === 'MINUS') {
						if(user.total_gold - data.coin >= 0) {
							user.total_gold -= data.coin
						}
					}
					if(data.type === 'PLUS') {
						user.total_gold += data.coin
					}

					userModel.findByIdAndUpdate(user.id, {total_gold: user.total_gold}, {new: true}, function (err, user) {
						if(err) console.log(err)
						else {
							console.log('uss' + user)
							io.sockets.emit('user_changed', user)
						}
					})
				})
			})
		}
	})
}