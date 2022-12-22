// Método que obtiene el array de compras de el Local Storage
const getLocalCart = () => {
  return JSON.parse(localStorage.getItem("cart"));
};

let carts = getLocalCart();

let tipoenvio = 0.15;
let subtotal = 0;
let costoenvio = 0;
let total = 0;

// Funciones:
// Función que muestra los artículos que se envién al carrito
const showCarts = () => {
  carts.forEach((cart) => {
    document.getElementById("carrito").innerHTML += `
    <th scope="row"><img style="width: 100px" src="${cart.images}"></th>
    <td>${cart.name}</td>
    <td>
    <div class="d-flex">
    <p class="me-2">${cart.currency}</p>
    <p>${cart.cost}</p>
    </div>
    </td>
    <td>
    <input
    class="form-control"
    type="number"
    placeholder="1"
    onchange="costosArticulos(${cart.id})"
    id="inputCantidad${cart.id}"
    min="1"
    value="${cart.count}"
    style="width: 4rem"/>
    </td>
    <td>
    <div class="d-flex fw-bold" >
    <p class="me-2">${cart.currency}</p>
    <p id="subtotal${cart.id}">${cart.cost * cart.count}</p>
    </div>
    </td>
    <td>
      <button class="btn btn-outline-danger" onclick="eliminarArticulo(${cart.id})">
      <i class="bi-trash-fill"></i></button>
    </td>
    `;
  });
};

showCarts();

// Función que muestra los costos
const costs = () => {
  document.getElementById("subtotal").innerHTML = subtotal;
  document.getElementById("costoenvio").innerHTML = costoenvio;
  document.getElementById("total").innerHTML = total;
};

// Función que calcula los costos
const calcularCostos = () => {
  subtotal = 0;
  carts.forEach((articulo) => {
    if (articulo.currency === "UYU") {
      subtotal += Math.trunc((articulo.cost / 40) * articulo.count);
    } else {
      subtotal += articulo.cost * articulo.count;
    }
    costoenvio = Math.round(tipoenvio * subtotal);
    total = subtotal + costoenvio;
    costs();
  });
};

// Al hacer click se calcula el tipo de envio para el input premium
document.getElementById("premium").onclick = () => {
  tipoenvio = 0.15;
  calcularCostos();
};

// Al hacer click se calcula el tipo de envio para el input express
document.getElementById("express").onclick = () => {
  tipoenvio = 0.07;
  calcularCostos();
};

// Al hacer click se calcula el tipo de envio para el input standard
document.getElementById("standard").onclick = () => {
  tipoenvio = 0.05;
  calcularCostos();
};

// Función que calcula los costos de los artículos en el carrito
const costosArticulos = (id) => {
  carts.forEach((articulos) => {
    const inputCant = document.getElementById("inputCantidad" + articulos.id);
    if (articulos.id === id) {
      articulos.count = inputCant.value;
      localStorage.setItem("cart", JSON.stringify(carts));
    }
    calcularCostos();
  });
  window.location.reload();
};

calcularCostos();

// Función que elimina los artículos del carrito de compras
const eliminarArticulo = (id) => {
  carts = carts.filter((articulo) => articulo.id != id);
  localStorage.setItem("cart", JSON.stringify(carts));
  window.location.reload();
  showCarts();
};

(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener("submit", function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          alertError();
        } else {
          alertSuccess();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Modal:
// Evento que se habilita y desabilita los campos al hacer click en el input de tarjeta de crédito
document.getElementById("tarjeta").onclick = () => {
  document.getElementById("numerocuenta").setAttribute("disabled", "");
  document.getElementById("vencimientotarjeta").removeAttribute("disabled", "");
  document.getElementById("numerotarjeta").removeAttribute("disabled", "");
  document.getElementById("codigotarjeta").removeAttribute("disabled", "");
};

// Evento que se habilita y desabilita los campos al hacer click en el input de transferencia bancaria
document.getElementById("transferencia").onclick = () => {
  document.getElementById("vencimientotarjeta").setAttribute("disabled", "");
  document.getElementById("numerotarjeta").setAttribute("disabled", "");
  document.getElementById("codigotarjeta").setAttribute("disabled", "");
  document.getElementById("numerocuenta").removeAttribute("disabled", "");
};

// Alerta exitosa
function alertSuccess() {
  document.getElementById("alert-success").classList.add("show");
};

// Alerta error
function alertError() {
  document.getElementById("alert-danger").classList.add("show");
};