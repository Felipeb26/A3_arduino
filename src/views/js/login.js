const user = document.getElementById("user");
const pass = document.getElementById("pass");
const socket = io();

function clean() {
	user.value = "";
	pass.value = "";
}

function login() {
	const username = user.value;
	const password = pass.value;

	const userIsValid = nonNull(username);
	const passIsValid = nonNull(password);

	if (!userIsValid && !passIsValid) {
		window.alert("erro ao fazer login");
	}

	ledControll(1);
	setTimeout(() => ledControll(2), 1500);
}

function ledControll(command) {
	socket.emit(command, command);
}

function nonNull(value) {
	console.log(value);
	console.log(typeof value);
	if (value == null || (value instanceof String && value.trim() == ""))
		return false;
	if (value == undefined) return false;
	if (value instanceof String && value.trim() != "") return true;
	if (value instanceof Number && value > 0) return true;
	return nonNull(new String(value));
}
