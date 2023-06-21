const user = document.getElementById("user");
const pass = document.getElementById("pass");
const socket = io();

function clean() {
	user.value = "";
	pass.value = "";
}

async function login() {
	const username = user.value;
	const password = pass.value;

	const userIsValid = await nonNull(username);
	const passIsValid = await nonNull(password);

	if (!userIsValid && !passIsValid) {
		window.alert("erro ao fazer login");
	}

	if (username == "felipe" && password == "262626") {
		await ledControll(1);
		setTimeout(() => ledControll(2), 8000);
	}
}

const ledControll = async (command) => {
	console.log(command);
	await socket.emit(command, command);
};

async function nonNull(value) {
	console.log(value);
	console.log(typeof value);
	if (value == null || (value instanceof String && value.trim() == ""))
		return false;
	if (value == undefined) return false;
	if (value instanceof String && value.trim() != "") return true;
	if (value instanceof Number && value > 0) return true;
	return nonNull(new String(value));
}
