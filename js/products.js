// Declaraciones:
// Contenedor donde se va a cargar el contenido
const PRODUCTS_LIST_CONTAINER = document.getElementById("products-list-container");

// Botón para ordenar de forma descendente
const BTN_SORT_DESC = document.getElementById("sortDesc");

// Botón para ordenar de forma ascendente
const BTN_SORT_ASC = document.getElementById("sortAsc");

// Botón para ordenar por productos vendidos
const BTN_SORT_SELL = document.getElementById("sortSell");

// Filtro de precio mínimo
const MIN_FILTER = document.getElementById("filterCountMin");

// Filtro de precio máximo
const MAX_FILTER = document.getElementById("filterCountMax");

// Botón para filtrar
const BTN_FILTRAR = document.getElementById("filterCount");

// Botón para limpiar
const BTN_LIMPIAR = document.getElementById("clearFilter");

// Barra de búsqueda
const SEARCH = document.getElementById("search");

// Funciones:
// Función que registra el id del producto seleccionado en el Local Storage
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

// Función para agregar al HTML la lista de productos manipulando el DOM
const showProductsList = (array) => {
let htmlContentToAppend = "";
if (array.length == 0) {
    PRODUCTS_LIST_CONTAINER.innerHTML = "";
}

array.forEach((product) => {
    {
    htmlContentToAppend +=
        `
        <div onclick="setProductID(${product.id})" class="card list-group-item list-group-item-action">
        <div class="row">
        <div class="col-3">
        <img src="` +
        product.image +
        `" alt="product image" class="img-thumbnail">
        </div>
        <div class="col">
        <div class="d-flex w-100 justify-content-between">
        <div class="mb-1">
        <h4>` +
        product.name +
        " - " +
        product.currency +
        " " +
        product.cost +
        `</h4>
        <p> ` +
        product.description +
        `</p>
        </div>
        <small class="text-muted">` +
        product.soldCount +
        ` vendidos</small>
        </div>
        </div>
        </div>
        </div>
        `;
    }
    PRODUCTS_LIST_CONTAINER.innerHTML = htmlContentToAppend;
});
};

// Eventos:
// Eventos que se activan al cargar todos los elementos del DOM
document.addEventListener("DOMContentLoaded", function () {
getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
    currentProductsArray = resultObj.data.products;

    showProductsList(currentProductsArray);
    }

// Al presionar el botón ascendente
    BTN_SORT_ASC.onclick = () => {
    let respuesta = currentProductsArray.sort((a, b) => {
        return a.cost - b.cost;
    });
    showProductsList(respuesta);
    };

// Al precionar el botón descendente
    BTN_SORT_DESC.onclick = () => {
    let respuesta = currentProductsArray.sort((a, b) => {
        return b.cost - a.cost;
    });
    showProductsList(respuesta);
    };

// Al precionar el botón de vendidos
    BTN_SORT_SELL.onclick = () => {
    let respuesta = currentProductsArray.sort((a, b) => {
        return b.soldCount - a.soldCount;
    });
    showProductsList(respuesta);
    };
});
});

// Al filtrar por precio mínimo y por precio máximo
BTN_FILTRAR.onclick = () => {
let minCost = MIN_FILTER.value;
let maxCost = MAX_FILTER.value;

if (minCost && maxCost == "") {
    const respuesta = currentProductsArray.filter(
    (product) => product.cost >= MIN_FILTER.value
    );
    showProductsList(respuesta);
} else if (minCost == "" && maxCost) {
    const respuesta = currentProductsArray.filter(
    (product) => product.cost <= MAX_FILTER.value
    );
    showProductsList(respuesta);
} else if (minCost && maxCost) {
    const respuesta = currentProductsArray.filter(
    (product) =>
        product.cost <= MAX_FILTER.value && product.cost >= MIN_FILTER.value
    );
    showProductsList(respuesta);
}
};

// Al escribir en la barra de búsqueda
SEARCH.onkeyup = () => {
const value = SEARCH.value.toLowerCase();
const respuesta = currentProductsArray.filter(
    (product) =>
    product.name.toLowerCase().includes(value) ||
    product.description.toLowerCase().includes(value)
);
showProductsList(respuesta);
};

// Al presionar el botón de limpiar
BTN_LIMPIAR.onclick = () => {
MIN_FILTER.value = "";
MAX_FILTER.value = "";
SEARCH.value = "";

showProductsList(currentProductsArray);
};