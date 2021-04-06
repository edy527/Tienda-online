let productList = [];
let carrito = [];
let total = 0;

function add(productId, price) {
    const product = productList.find(p => p.id === productId)
    product.sotock--;

    console.log(productId, price);
    carrito.push(productId);
    total = total + price;
    document.getElementById("checkout").innerHTML = `Total a pagar $${total}`;
    displayProducts()
    
}

async function pay() {
    try {
        const productList = await (await fetch("/api/pay", {
                method: "post",
                body: JSON.stringify(carrito),
                headers: {
                    "Content-Type": "application/json",
                }
            })
        ).json();
    } catch {
        window.alert("lo sentimos, ya no hay stock del producto seleccionado");
    }

    carrito = [];
    total = 0;
    await fetchProducts();
    document.getElementById("checkout").innerHTML = `Pagar $${total}`
}

//-----------------
function displayProducts() {
    let productsHTML = '';
    productList.forEach(p => {
        let buttonHTML = `<button class="product-button" onclick="add(${p.id}, ${p.price})">Agregar</button>`;

        if (p.sotock <= 0) {
            buttonHTML = `<button disabled class="product-button disabled" onclick="add(${p.id}, ${p.price})">Sin stock</button>`;
        }

        productsHTML +=
            `<div class="product-container">
                <h2 class="product-title">${p.name}</h2>
                <img src="${p.image}">
                <h2>$${p.price}</h2>
                ${buttonHTML}
             </div>`;
    });
    document.getElementById("page-content").innerHTML = productsHTML;
}

async function fetchProducts(){
    productList = await (await fetch("/api/products")).json();
    displayProducts();
}

window.onload = async() => {
    await fetchProducts();
}
