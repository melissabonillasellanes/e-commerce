// Función para mostrar la lista de productos traída del JSON

let url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

function showProducts(url) {
    let htmlContentToAppend = "";
let category = getJSONData(url).then((json) => {
    htmlContentToAppend += `
        <h2 class="container-fluid text-center pt-3"> Productos </h2>
        <h5 class="container-fluid text-center pb-4"> Verás aquí todos los productos de la categoria ${json.data.catName} </h5>
        `;
    for (let i = 0; i < json.data.products.length; i++) {
        let product = json.data.products[i];
        
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" " alt="product image" class="img-thumbnail">
                </div>
                <div class="col"> 
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${product.name} - USD ${product.cost} </h4> 
                        <p> ${product.description} </p> 
                        </div>
                        <small class="text-muted"> ${product.soldCount} vendidos</small> 
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
});
}

document.addEventListener("DOMContentLoaded", function (e) {
showProducts(url);
});
