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
  costCell.textContent = `${productDetails.price} ${productDetails.currency}`;
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
      currentCart[index].quantity = newQuantity;
      updateSubtotal(tableRow, index);
      updateCartTotal();
    } else {
      // Si la cantidad no es un número válido o es menor que 1, restaura el valor anterior
      event.target.value = currentCart[index].quantity;
    }
  });

  // Event listener para eliminar un producto del carrito
  removeButton.addEventListener('click', () => {
    removeProductFromCart(index);
    tableRow.remove();
    updateCartTotal();
  });

  return tableRow;
}

// Función para actualizar el subtotal de un producto en el carrito
function updateSubtotal (element, index) {
  const quantity = currentCart[index].quantity;
  const price = parseFloat(element.querySelector('td:nth-child(3)').textContent);
  if (currentCart[index]) {
    const subtotal = element.querySelector('td:nth-child(5)');
    subtotal.textContent = `${price * quantity} ${currentCart[index].currency}`;
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }
}

// Función para actualizar el total del carrito
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

  const totalElement = document.getElementById('cart-total');
  if (totalElement) {
    totalElement.textContent = `Total: ${currency} ${total} `;
    localStorage.setItem('cartTotal', total);
  }
}


// Obtén todos los botones de radio con name="currency"
const currencyButtons = document.querySelectorAll('input[name="currency"]');

// Agrega un evento 'change' a cada botón de radio
currencyButtons.forEach((button) => {
  button.addEventListener('change', () => {
    const selectedCurrency = button.value;
    updateCartTotal(selectedCurrency); // Llama a la función para actualizar el total con la moneda seleccionada
  });
});
// Función para eliminar un producto del carrito
function removeProductFromCart (index) {
  currentCart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(currentCart));
}

// Función para cargar un producto predeterminado desde una URL y agregarlo al carrito
function loadDefaultProduct () {
  const productDetailsUrl =
    'https://japceibal.github.io/emercado-api/user_cart/25801.json';

  fetch(productDetailsUrl)
    .then((response) => response.json())
    .then((productData) => {
      const defaultProduct = {
        id: 50924,
        name: productData.articles[0].name,
        price: productData.articles[0].unitCost,
        currency: productData.articles[0].currency,
        quantity: 1,
        image: productData.articles[0].image,
      };

      // Convertir el precio a USD si la moneda es UYU
      if (defaultProduct.currency === 'UYU') {
        defaultProduct.price /= 40; // Aplicar la tasa de cambio
        defaultProduct.currency = 'USD'; // Actualizar la moneda a USD
      }

      const existingProduct = currentCart.find(
        (product) => product.name === defaultProduct.name
      );

      if (!existingProduct) {
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

    // Agregar una línea separativa después de cada fila, excepto la última
    if (index < currentCart.length - 1) {
      const separatorRow = document.createElement('tr');
      const separatorCell = document.createElement('td');
      separatorCell.setAttribute('colspan', '6'); // Ocupa todas las columnas
      separatorCell.style.borderTop = '1px solid grey'; // Estilo de línea separativa
      separatorRow.appendChild(separatorCell);
      productList.appendChild(separatorRow);
    }
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
