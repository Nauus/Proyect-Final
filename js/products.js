const currentUser = localStorage.getItem('currentUser');

if (!currentUser) {
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const productListContainer = document.getElementById('car-list-container');
    const selectedCategoryID = localStorage.getItem('catID');
    const productsUrl = `https://japceibal.github.io/emercado-api/cats_products/${selectedCategoryID}.json`;



    fetch(productsUrl)
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const categoriaNombre = document.getElementById('categoriaNombre');

            categoriaNombre.textContent = data.catName; // accedo a la URL que se esta accediendo en el ciclo, de alli saco el catName que es el nombre que especifica  que contiene la API.

            products.forEach(product => {
                const productCard = document.createElement('div');

                productCard.classList.add('card', 'mb-3');
                productCard.innerHTML = `
                <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}   </h4>
                        <small class="text-muted">${product.soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${product.description}</p>
                </div>
            </div>
        </div>
                `;
                productListContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});
