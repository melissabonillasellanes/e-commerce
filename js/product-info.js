// Declaraciones:
//Contenedor donde se va a cargar la informacion del producto
const PRODUCT_INFO_CONTAINER = document.getElementById("product-info-container");
// Contenedor donde se va a cargar los productos relacionados
const RELATED_PRODUCTS_CONTAINER = document.getElementById("related-products");
// Contenedor donde se va a cargar el carousel
const CAROUSEL_CONTAINER = document.getElementById("carousel-inner");

let product = [];
let comments = [];
let cart = [];

// Funciones:
// Función que va a devolver las imágenes del producto que se selecciono
const productImages = (currentArray) => {
  let respuesta = "";
  currentArray.forEach((product) => {
    respuesta += `
    <picture class="d-flex">
      <img src="${product}" class="d-block w-100 img-thumbnail justify-content-between align-items-center m-3 mb-3 ms-0 mt-3 shadow-sm">
    </picture>
    `;
  });
  return respuesta;
};

// Función que muestra el carousel con las imágenes
const showCarouselImg = (array) => {
  CAROUSEL_CONTAINER.innerHTML += `
  <div class="carousel-item active">
  <img src="${array[0]}" class="d-block w-100">
</div>
<div class="carousel-item">
  <img src="${array[1]}" class="d-block w-100">
</div>
<div class="carousel-item">
  <img src="${array[2]}" class="d-block w-100">
</div>
<div class="carousel-item">
  <img src="${array[3]}" class="d-block w-100">
</div>
`;
};

// Función que muestra la información e imágenes del producto que fue seleccionado
const showProductInfoImg = (objeto) => {
  PRODUCT_INFO_CONTAINER.innerHTML += `
  <div class = "d-flex justify-content-between">
  <h2> ${objeto.name} </h2>
  <button id="comprar" type ="button" class="btn btn-success">Comprar</button>
  </div>
  <hr class="mb-5">
  <div class="ps-3">
  <span class="fw-bold "> Precio </span>
  <p> ${objeto.currency} ${objeto.cost}</p>
  <span class="fw-bold"> Descripción </span>
  <p>${objeto.description}</p>
  <span class="fw-bold"> Categoría </span>
  <p>${objeto.category}</p>
  <span class="fw-bold"> Cantidad de vendidos </span>
  <p>${objeto.soldCount}</p>
  <span class="fw-bold"> Imagenes ilustrativas </span>
  </div>
  <div class="d-flex mt-4 mb-3"> ${productImages(objeto.images)} </div>
  <hr>
  <ul id="comments-container" class="list-group list-group-flush mb-3">
  </ul>
  <hr>
  `;
};

// Función que verifica el puntaje
function puntajes(array) {
  let puntuacion = "";
  for(let i=1; i <= 5; i++) {
      if(i <= array){
          puntuacion += `<i class="fas fa-star"></i>`;
      }
      else {
          puntuacion +=`<i class="far fa-star"></i>`;
      }
  }
  return puntuacion;
}

// Función que muestra los comentarios y las estrellas del producto seleccionado
const showProductComments = (objeto) => {
  let COMMENTS_CONTAINER = document.getElementById("comments-container");
  objeto.forEach((comment) => {
    COMMENTS_CONTAINER.innerHTML += `
    <li class="list-group-item bg-light">
      <span class="fw-bold">
      ${comment.user}
      </span>
      ${comment.dateTime}
      <div class="checked">
      ${puntajes(comment.score)}
      </div>
      <br>
      ${comment.description}
    </li>
    `;
  });
};

//Función que muestra dia y hora de la puntuación ingresada
function commentNew() {
  let dateTime = new Date();
  let newComment = {};

  newComment.user = localStorage.getItem('email');
  newComment.description = document.getElementById('opinion').value;
  newComment.dateTime = `${dateTime.getFullYear()}-${(dateTime.getMonth() + 1)}-${dateTime.getDate()}
  ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
  newComment.score = document.getElementById('puntuacion').value;

  comments.push(newComment);

  showProductComments(comments);

  document.getElementById('opinion').value = "";
  document.getElementById('puntuacion').value = "";
}

// Función que modifica el ID del producto relacionado al ingresar a él y se vuelve a cargar la página con el producto que se selecciono
const setProductID = (id) => {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
};

// Función que muestra los productos relacionados
const showRelatedProducts = (array) => {
  array.forEach((product) => {
    RELATED_PRODUCTS_CONTAINER.innerHTML += `
            <div class="col-md-3">
              <div
                class="card mb-3 shadow-sm custom-card cursor-active"
                onclick="setProductID(${product.id})">
                <img
                  class="bd-placeholder-img card-img-top p-2 border-bottom"
                  src="${product.image}"/>
                <div class="card-body">
                  <h4 class="card-title mb-2">${product.name}</h4>
                </div>
              </div>
            </div>
    `;
  });
};

//Eventos:
// Evento que se activa al cargar la información e imágenes del producto
document.addEventListener('DOMContentLoaded', () => {
  getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
      if (resultObj.status === "ok")
      {
        const images = resultObj.data.images;
        const product = resultObj.data;
        const relatedProducts = resultObj.data.relatedProducts;
        showCarouselImg(images);
        showProductInfoImg(product);
        showRelatedProducts(relatedProducts);

        const COMPRAR = document.getElementById("comprar");
        COMPRAR.onclick = () => {
          if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
          }
          if(cart.some((cart) => cart.id === product.id)) {
            return;
          } else {
            let articulo = {
              id: product.id,
              count: 1,
              name: product.name,
              cost: product.cost,
              images: product.images[0],
              currency: product.currency,
            };
            cart.push(articulo);
            localStorage.setItem("cart", JSON.stringify(cart));
          }
          window.location = "cart.html";
        };
      }
  });

// Evento que se activa al cargar los comentarios del producto
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
      if (resultObj.status === "ok")
      {
        const comments = resultObj.data;
        showProductComments(comments);
      }
  });

  document.getElementById('enviar').addEventListener('click', () => {
      commentNew()
  })
});