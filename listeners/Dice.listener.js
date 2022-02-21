let interval;
let countDownDiceServer = 21
let betOnDice = {t: 0, x: 0}
let arrResult = []
let countTaiXiu = {t: 0, x: 0}
let dice_1
let dice_2
let dice_3
exports.init = (io) => {
	setInterval(function () {
		countDownDiceServer--
		if(arrResult.length === 100) {
			arrResult = []
			countTaiXiu.t = 0
			countTaiXiu.x = 0
			io.sockets.emit('arrResultDice', arrResult)
			io.sockets.emit('countTaiXiu', countTaiXiu)
		}
		if(countDownDiceServer>=0)
			io.sockets.emit('countDownDiceServer', countDownDiceServer);
		if (countDownDiceServer === 0) {
			let timerOpenCountDown = 16
			dice_1 = Math.floor(Math.random() * 6) + 1
			dice_2 = Math.floor(Math.random() * 6) + 1
			dice_3 = Math.floor(Math.random() * 6) + 1
			const resultDice = dice_1 + dice_2 + dice_3
			arrResult.push(resultDice)
			if(resultDice - 10 > 0) {
				countTaiXiu.t = countTaiXiu.t + 1
			} else {
				countTaiXiu.x = countTaiXiu.x + 1
			}
			io.sockets.emit('diceResults', {dices: {dice_1, dice_2, dice_3}, arrResultDice: arrResult, countTaiXiu: countTaiXiu})
			interval = setInterval(function (){
				timerOpenCountDown--
				io.sockets.emit('timeOpen', timerOpenCountDown)

				if (timerOpenCountDown === 0) {
					betOnDice.t = 0
					betOnDice.x = 0
					io.sockets.emit('betDiceT', betOnDice.t)
					io.sockets.emit('betDiceX', betOnDice.x)
					countDownDiceServer = 21
					clearInterval(interval);
				}
			}, 1000)
		}
	}, 1000)
}

exports.listener = (io, socket) => {
	socket.on('openDicePopup', ()=>{
		io.sockets.emit('arrResultDice', arrResult)
		io.sockets.emit('countTaiXiu', countTaiXiu)
		io.sockets.emit('diceResults', {dices: {dice_1, dice_2, dice_3}, arrResultDice: arrResult, countTaiXiu: countTaiXiu})
	});

	socket.on('betDiceT', (data)=>{
		betOnDice.t = betOnDice.t + data
		io.sockets.emit('betDiceT', betOnDice.t)
	})
	socket.on('betDiceX', (data)=>{
		betOnDice.x = betOnDice.x + data
		io.sockets.emit('betDiceX', betOnDice.x)
	})
}