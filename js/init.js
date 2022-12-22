// Método que se obtiene la id de la categoría a la que se ingrese
const getId = () => {
  const id = localStorage.getItem("catID");
  return id;
};

// Método que se obtiene la id de el producto al que se ingrese
const getProductId = () => {
  const id = localStorage.getItem("productID");
  return id;
};

const EXT_TYPE = ".json";
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/" + getId() + EXT_TYPE;
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/" + getProductId() + EXT_TYPE;
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/" + getProductId() + EXT_TYPE;
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

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