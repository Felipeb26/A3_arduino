const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const port = process.env.PORT || 3000;
const serialPort = process.env.SERIAL || "/dev/ttyUSB0";

const SerialPort = require("serialport");
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
	delimiter: "\r\n",
});

const serial = new SerialPort(serialPort, {
	baudRate: 9600,
	dataBits: 8,
	parity: "none",
	stopBits: 1,
	flowControll: false,
});

serial.pipe(parser);

io.on("connection", function (socket) {
	console.log("Cliente conectado");
	socket.on("disconnect", function (msg) {
		console.log("vazou fora");
	});

	socket.on("1", (ligar) => {
		serial.write(ligar.toString());
	});

	socket.on("2", (off) => {
		serial.write(off.toString());
	});
});

serial.on("open", () => {
	console.log(`Conectado à porta serial: ${serialPort}`);
});

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/javascript", (req, res) => {
	res.sendFile(path.join(__dirname, "/views/js/login.js"));
});

app.get("/img/logo.png", (req, res) => {
	res.sendFile(path.join(__dirname, "/views/img/logo.png"));
});

app.get("/img/default_user.png", (req, res) => {
	res.sendFile(path.join(__dirname, "/views/img/default_user.png"));
});

app.get("/style", (req, res) => {
	res.sendFile(path.join(__dirname, "/views/css/index.css"));
});

http.listen(port, () => {
	console.log(`Running application on ${port}`);
});
