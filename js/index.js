// Validación de formulario, verifica si esta correcto o no
function formulario() {
let formularios = document.querySelectorAll("#validation");
Array.prototype.slice.call(formularios).forEach(function (form) {
	form.addEventListener("submit", function (evento) {
		if (!form.checkValidity()) {
			evento.preventDefault();
			evento.stopPropagation();
		}
		form.classList.add("was-validated");
	},
	false
	);
});
};
formulario()

//Local Storage
// Guarda el dato email en el Local Storage
const setEmail = () => {
	localStorage.setItem("email", email.value);
};

// Obtiene el dato email de el Local Storage
const getEmail = () => {
	const email = localStorage.getItem("email");
	return email;
};

// Condición
if (document.getElementById("submit")) {
	const btn = document.getElementById("submit");
	btn.onclick = () => {
	setEmail();
	};
} else {
	const miperfil = document.getElementById("mi-perfil");
	const addToHTML = () => {
		miperfil.innerHTML = getEmail();
	};
	addToHTML();
}
