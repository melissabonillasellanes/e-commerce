const email = document.getElementById("email");
const password = document.getElementById("password");
const inicioSesion = document.getElementById("inicioSesion");
const errorEmail = document.getElementById("errorEmail");
const errorContraseña = document.getElementById("errorContraseña");

inicioSesion.addEventListener("click", (event) => {
	event.preventDefault();
	const emailValue = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
	const passwordValue = /^[(a-zA-Z0-9!@#$%^&*_)]{8,}$/;

	if (email.value.match(emailValue)) {
		email.style.border = "1px solid #008000";
		errorEmail.innerHTML = "Cumple con los requisitos";
		if (password.value.match(passwordValue)) {
			window.location.replace("index.html");
		} else {
			password.value = "";
			password.focus();
			password.style.border = "1px solid #FF0000";
			errorContraseña.innerHTML = "Ingresa tu contraseña";
		}
	} else {
		email.focus();
		email.value = "";
		email.style.border = "1px solid #dc3545";
		errorEmail.innerHTML = "Ingresa tu e-mail";
	}
});
