// Obtener el carrito de compras actual desde el almacenamiento local
const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para crear una fila de la tabla del carrito
function createCartTableRow (productDetails, index) {
  const tableRow = document.createElement('tr');
  // Crear celda de imagen
  const imgCell = document.createElement('td');
  const img = document.createElement('img');
  img.classList.add("product-image");
  img.src = productDetails.image;
  img.alt = productDetails.name;
  imgCell.appendChild(img);
  tableRow.appendChild(imgCell);
  // Crear enlace al producto
  const productLink = document.createElement('a');
  productLink.classList.add("product-name");
  productLink.href = `product-info.html?id=${productDetails.id}`;
  productLink.textContent = productDetails.name;

  // Crear celda de nombre
  const nameCell = document.createElement('td');
  nameCell.appendChild(productLink);
  tableRow.appendChild(nameCell);

  // Crear celda de precio
  const costCell = document.createElement('td');
  costCell.textContent = `${productDetails.currency} ${productDetails.price} `;
  tableRow.appendChild(costCell);

  // Crear celda de cantidad
  const quantityCell = document.createElement('td');
  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.min = 1;
  quantityInput.step = 1;
  quantityInput.classList.add('quantity-input');
  quantityInput.value = productDetails.quantity;
  quantityCell.appendChild(quantityInput);
  tableRow.appendChild(quantityCell);

  // Crear celda de subtotal
  const subtotalCell = document.createElement('td');
  subtotalCell.textContent = `${productDetails.currency} ${productDetails.price * productDetails.quantity} `;
  tableRow.appendChild(subtotalCell);

  // Crear celda de eliminación
  const removeCell = document.createElement('td');
  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.classList.add('fas', 'fa-trash-alt', 'remove-product');

  removeCell.appendChild(removeButton);
  tableRow.appendChild(removeCell);

  // Event listener para actualizar el subtotal cuando cambia la cantidad
  quantityInput.addEventListener('input', (event) => {
    const newQuantity = parseInt(event.target.value, 10);

    if (!isNaN(newQuantity) && newQuantity >= 1) {
      // Obtener la posición real del producto en el carrito
      const realIndex = currentCart.findIndex(product => product.id === productDetails.id);

      if (realIndex !== -1) {
        currentCart[realIndex].quantity = newQuantity;
        updateSubtotal(tableRow, realIndex);
        updateCartTotal();
      }
    } else {
      // Si la cantidad no es un número válido, restaura el valor anterior
      event.target.value = currentCart[index].quantity;
    }

    // Selecciona automáticamente el botón de radio "USD" en el contenedor currency-options
    const currencyOptions = document.querySelector('.currency-options');
    const usdRadio = currencyOptions.querySelector('input[value="USD"]');
    usdRadio.checked = true;
  });

  // Event listener para eliminar un producto del carrito
  removeButton.addEventListener('click', () => {
    removeProductFromCart(productDetails.id);

    tableRow.remove();
    updateCartTotal();
  });
  return tableRow;
}

// Función para actualizar el subtotal de un producto en el carrito
function updateSubtotal (element, index) {
  const quantity = currentCart[index].quantity;
  const priceText = element.querySelector('td:nth-child(3)').textContent;
  const price = parseFloat(priceText.replace(/[^\d.]/g, '')); // Elimina caracteres no numéricos y convierte a número

  if (!isNaN(price)) {
    const subtotal = element.querySelector('td:nth-child(5)');
    const subtotalValue = price * quantity;
    subtotal.textContent = `${currentCart[index].currency} ${subtotalValue.toFixed(0)} `;
    localStorage.setItem('cart', JSON.stringify(currentCart));
  } else {
    // Si el precio no es válido, restaura el valor anterior
    const previousPrice = currentCart[index].price;
    element.querySelector('td:nth-child(3)').textContent = `${currentCart[index].currency} ${previousPrice} `;
  }
}

// Función para actualizar el total del carrito
<<<<<<< Updated upstream
=======


>>>>>>> Stashed changes
function updateCartTotal (selectedCurrency) {
  let total = 0;
  let currency = selectedCurrency; // Usar la moneda seleccionada

  if (!currency) {
    // Si no se proporciona una moneda seleccionada, obtenerla de localStorage
    currency = localStorage.getItem('cartCurrency') || 'USD'; // 'USD' como valor predeterminado si no se encuentra en localStorage
  }

  currentCart.forEach((product) => {
    if (product.currency === 'UYU' && currency === 'USD') {
      // Convertir de UYU a USD si la moneda seleccionada es USD
      total += product.price * product.quantity / 40;
    } else if (product.currency === 'USD' && currency === 'UYU') {
      // Convertir de USD a UYU si la moneda seleccionada es UYU
      total += product.price * product.quantity * 40;
    } else {
      total += product.price * product.quantity; // No es necesario convertir
    }
  });

  // Redondear el total hacia abajo a un número entero
  const roundedTotal = Math.floor(total);

  const totalElement = document.getElementById('cart-total');
  if (totalElement) {
    totalElement.textContent = `Total: ${currency} ${roundedTotal} `;
    localStorage.setItem('cartTotal', roundedTotal);
  }
}

// Obtén todos los botones de radio con name="currency"
const currencyButtons = document.querySelectorAll('input[name="currency"]');

// Agrega un evento 'change' a cada botón de radio
currencyButtons.forEach((button) => {
  button.addEventListener('change', () => {
    const selectedCurrency = button.value;
    updateCartTotal(selectedCurrency);
  });
});

// Función para eliminar un producto del carrito
// Función para eliminar un producto del carrito por su ID
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
function removeProductFromCart (productID) {
  const productIndex = currentCart.findIndex((product) => product.id === productID);
  if (productIndex !== -1) {
    currentCart.splice(productIndex, 1);
    // Actualiza el almacenamiento local con la nueva versión del carrito
    localStorage.setItem('cart', JSON.stringify(currentCart));
    updateCartTotal(); // Actualiza el total del carrito
  }
}
// Función para cargar un producto predeterminado desde una URL y agregarlo al carrito
function loadDefaultProduct () {
  const productDetailsUrl =
    'https://japceibal.github.io/emercado-api/user_cart/25801.json';

  fetch(productDetailsUrl)
    .then((response) => response.json())
    .then((productData) => {
      const defaultProduct = {
        id: productData.articles[0].id,
        name: productData.articles[0].name,
        price: productData.articles[0].unitCost,
        currency: 'USD',
        quantity: 1,
        image: productData.articles[0].image,
      };

      // Verificar si el producto predeterminado ya existe en el carrito
      const existingProductIndex = currentCart.findIndex(
        (product) => product.name === defaultProduct.name
      );

      if (existingProductIndex === -1) {
        // Solo agregar el producto predeterminado si no existe en el carrito
        currentCart.push(defaultProduct);
        localStorage.setItem('cart', JSON.stringify(currentCart));
        renderCart(); // Renderizar el carrito después de agregar el producto predeterminado
        updateCartTotal();
      }
    })
    .catch((error) => {
      console.error('Error al obtener detalles del producto:', error);
    });
}
// Función para renderizar los productos en el carrito
function renderCart () {
  const productList = document.getElementById('product-list');


  currentCart.forEach((productDetails, index) => {
    const tableRow = createCartTableRow(productDetails, index);
    productList.appendChild(tableRow);

  });
}

// Evento que se ejecuta cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  if (currentCart.length === 0) {
    loadDefaultProduct();
  }
  renderCart();
  updateCartTotal();
});
