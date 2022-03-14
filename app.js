// app.js
const express = require('express');
const user = require('./routes/User.route')
const auth = require('./routes/Auth.route')
const port = process.env.PORT || 4001;
const dbConfig = 'mongodb://localhost:27017/restApp';
const mongoose = require('mongoose');
const {createServer} = require('http')
const {Server} = require('socket.io')
const index = require("./routes/index");
const bodyParser = require('body-parser')
// initialize our express app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { transports: ['websocket', 'polling'] });
const diceListener = require('./listeners/Dice.listener')
const userListener = require('./listeners/User.listener')
// parse various different custom JSON types as JSON
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Connecting to the database
mongoose.set('autoIndex', true)
mongoose.connect(dbConfig, {
	useNewUrlParser: true,
	noDelay: true
}, {})
app.use(index)
app.use('/api/v1/users', user)
app.use('/api/v1/auth', auth)

let messages = []

diceListener.init(io);

const onConnection = (socket) => {
	diceListener.listener(io, socket)
	userListener(io, socket)
	socket.on('setMessages', (data)=>{
		messages.push(data)
		io.sockets.emit('messages', messages)
	})

	socket.on('openDicePopup', ()=>{
		io.sockets.emit('messages', messages)
	})
}

io.on("connection", onConnection);


httpServer.listen(port);
