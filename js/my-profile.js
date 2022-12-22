// Evento que trae el email del Local Storage
const email = () => {
  return localStorage.getItem("email");
};

// Evento que guarda la información del perfil en el Local Storage
document.getElementById("btn").onclick = () => {
  let informacionPerfil = {
    primerNombre: document.getElementById("primer-nombre").value,
    segundoNombre: document.getElementById("segundo-nombre").value,
    primerApellido: document.getElementById("primer-apellido").value,
    segundoApellido: document.getElementById("segundo-apellido").value,
    telefono: document.getElementById("telefono").value,
  };
  localStorage.setItem("informacionPerfil", JSON.stringify(informacionPerfil));
};

// Evento que trae la información del perfil del Local Storage
const infoPerfil = () => {
  return JSON.parse(localStorage.getItem("informacionPerfil"));
};

// Se muestra el email que se ingreso en el login
document.getElementById("email").value = email();

// Función que muestra la información del perfil en una variable
const informacionPerfil = () => {
  if (infoPerfil()) {
    let info = infoPerfil();
    document.getElementById("primer-nombre").value = info.primerNombre;
    document.getElementById("segundo-nombre").value = info.segundoNombre;
    document.getElementById("primer-apellido").value = info.primerApellido;
    document.getElementById("segundo-apellido").value = info.segundoApellido;
    document.getElementById("telefono").value = info.telefono;
  }
};
informacionPerfil();

// Función que guarda la imágen en el Local Storage
document.getElementById("img").onchange = () => {
  const file = new FileReader();
  file.readAsDataURL(document.getElementById("img").files[0]);
  file.onload = () => {
    const URL = file.result;
    localStorage.setItem("imgPerfil", URL);
  };
};

// Método que trae la imágen del perfil del Local Storage
const imgPerfil = () => {
  return localStorage.getItem("imgPerfil");
};

// Función que muestra la imágen
const mostrarImg = () => {
  if (imgPerfil()) {
    document.getElementById("img-perfil").src = imgPerfil();
  }
};
mostrarImg();

// Función que valida los input
(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
