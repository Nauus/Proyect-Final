const currentUser = localStorage.getItem('currentUser');

// Redireccionar a la página de inicio de sesión si no hay un usuario actual
if (!currentUser) {
    window.location.href = 'login.html';
}

// Escuchar el evento de carga del contenido del DOM
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el contenedor donde se mostrarán los productos
    const productListContainer = document.getElementById('car-list-container');

    // Obtener el ID de la categoría seleccionada almacenado en el almacenamiento local
    const selectedCategoryID = localStorage.getItem('catID');

    // Construir la URL del JSON de productos usando el ID de la categoría
    const productsUrl = `https://japceibal.github.io/emercado-api/cats_products/${selectedCategoryID}.json`;

    // Realizar una solicitud para obtener los datos del JSON de productos
    fetch(productsUrl)
        .then(response => response.json())
        .then(data => {
            // Extraer la lista de productos y el nombre de la categoría
            const products = data.products;
            const categoriaNombre = document.getElementById('categoriaNombre');
            categoriaNombre.textContent = data.catName;

            // Obtener elementos HTML para los filtros y botones de orden

            const rangeFilterMin = document.getElementById('rangeFilterPriceMin');
            const rangeFilterMax = document.getElementById('rangeFilterPriceMax');
            const sortAscPriceButton = document.getElementById('sortAscPrice');
            const sortDescPriceButton = document.getElementById('sortDescPrice');
            const sortDescRelevanceButton = document.getElementById('sortDescRelevance');
            const sortNoneButton = document.getElementById('sortNone');
            const searchInput = document.getElementById('searchInput');

            // Función que aplica los filtros y ordena los productos
            const applyFiltersAndSort = () => {
                // Obtener los valores del rango de precios
                const minPrice = parseFloat(rangeFilterMin.value);
                const maxPrice = parseFloat(rangeFilterMax.value);

                // Validar que los valores sean números válidos y no negativos
                if (isNaN(minPrice) || minPrice < 0) {
                    rangeFilterMin.value = '0';
                }

                if (isNaN(maxPrice) || maxPrice < 0) {
                    rangeFilterMax.value = '0';
                }



                // Filtrar los productos según el rango de precios
                const filteredProducts = products.filter(product => {
                    const productPrice = parseFloat(product.cost);
                    return (isNaN(minPrice) || productPrice >= minPrice) && (isNaN(maxPrice) || productPrice <= maxPrice);
                });

                // Realizar la búsqueda y ordenar los productos
                performSearch(searchInput.value.trim(), filteredProducts);
            };
            // Función que realiza la búsqueda y aplica los filtros y ordena

            const performSearch = (searchText, productsToShow) => {
                const normalizedSearchText = searchText.toLowerCase().trim();
                const searchWords = normalizedSearchText.split(/\s+/);

                const searchResults = normalizedSearchText === '' ?


                    productsToShow :
                    productsToShow.filter(product => {
                        const productName = product.name.toLowerCase();
                        const productDescription = product.description.toLowerCase();

                        // Verificar si alguna palabra de búsqueda está presente en el nombre o descripción
                        return searchWords.some(word => productName.includes(word) || productDescription.includes(word));
                    });

                // Ordenar los productos según las opciones seleccionadas
                let sortedProducts;
                if (sortAscPriceButton.checked) {
                    sortedProducts = searchResults.slice().sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost)); // dicho metodo .sort devuelve un numero negativo, cero o positivo, segun si el costo de a es menor, igual o mayor que el costo de b. Ordena los productos de menor a mayor
                } else if (sortDescPriceButton.checked) {
                    sortedProducts = searchResults.slice().sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost)); // Misma logica que el boton de ascendente pero invertida para que sea descendente, de Mayor a menor. 
                } else if (sortDescRelevanceButton.checked) {
                    sortedProducts = searchResults.slice().sort((a, b) => parseInt(b.soldCount) - parseInt(a.soldCount)); // Misma logica que los otros dos botones, pero este toma como parametro la cantidad de articulo que tenga y no el precio.
                } else if (sortNoneButton.checked) {
                    sortedProducts = searchResults;
                }

                // Limpiar el contenedor de productos antes de agregar los productos filtrados y ordenados
                productListContainer.innerHTML = '';

                // Generar tarjetas de productos y agregarlas al contenedor
                sortedProducts.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('card', 'cardProducts', 'mb-3');
                    productCard.innerHTML = `
                    <a href="product-info.html?id=${product.id}" class="list-group-item hover list-group-item-action cursor-active"> <div class="row">
                            <div class="col-3">
                                <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1 productname">${product.name} - ${product.currency} ${product.cost}</h4>
                                    <small class="text-muted">${product.soldCount} artículos</small>
                                </div>
                                <p class="mb-1">${product.description}</p>
                            </div>
                        </div>
                    </div></a>`;
                    productListContainer.appendChild(productCard);
                });
            };

            // Escuchar eventos de entrada y cambio en los filtros y botones de orden

            rangeFilterMin.addEventListener('input', applyFiltersAndSort);
            rangeFilterMax.addEventListener('input', applyFiltersAndSort);
            sortAscPriceButton.addEventListener('change', applyFiltersAndSort);
            sortDescPriceButton.addEventListener('change', applyFiltersAndSort);
            sortDescRelevanceButton.addEventListener('change', applyFiltersAndSort);
            sortNoneButton.addEventListener('change', applyFiltersAndSort);
            searchInput.addEventListener('input', applyFiltersAndSort);

            applyFiltersAndSort(); // Aplicar los filtros y ordenación inicialmente al cargar la página

        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
});






function seleccionarProducto (productID) {
    localStorage.setItem('productoSeleccionado', productID);
    window.location.href = 'product-info.html';
    console.log('ID del producto seleccionado:', productID);
}


