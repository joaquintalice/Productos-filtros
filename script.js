document.addEventListener('DOMContentLoaded', init)
const minPrice = document.getElementById('min');
const maxPrice = document.getElementById('max');
const filterBtn = document.getElementById('filtrar');
const prodContainer = document.getElementById('card-container');

let products = [];

function init() {
    getProducts();
    filterBtn.addEventListener('click', () => {
        filter(products)
    });
}

function filter(productos) {
    min = parseFloat(minPrice.value) || 0;
    max = parseFloat(maxPrice.value) || Infinity;
    const filteredProducts = productos.filter(productos => productos.price >= min && productos.price <= max);
    showProducts(filteredProducts);
};

async function getProducts() {
    const URL = `https://fakestoreapi.com/products`;
    const response = await fetch(URL);
    const data = await response.json();
    products = data;
    showProducts(data)
}

function showProducts(prodArray) {
    let template = ``

    for (let item of prodArray) {
        template += `
        <div class="col-12 col-sm-6 col-md-4 col-xl-3 mt-5">
            <div class="card">
                <img class="card-img-top" src="${item.image}" alt="Card image cap" height="330" style="padding: 10px;">
                <div class="card-body">
                    <h6 class="card-title text-center" style="font-size:14px;">${item.title}</h6>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h5>${item.price} USD</h5>
                        </li>
                        <li class="list-group-item">
                            <h6 class="text-muted">${item.category}</h6>
                        </li>
                        <li class="list-group-item">
                            <h6>Stock: ${item.rating.count}</h6>
                        </li>
                    </ul>
                    <div class="overflow-auto">
                        <p class="card-text" style="height: 100px;">${item.description}</p>
                    </div>
                    
                </div>
                <div class="card-footer text-center">
                    <a href="#" class="btn btn-primary">Add to cart</a>
                </div>
            </div>
        </div>
        `
    }
    prodContainer.innerHTML = template;
}
