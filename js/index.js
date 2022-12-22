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