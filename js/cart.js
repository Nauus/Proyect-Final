//! Nahuel A 

// Obtener el carrito de compras actual desde el almacenamiento local
const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para crear una fila de la tabla del carrito
function createCartTableRow (productDetails, index) {
  console.log(index);
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
  quantityCell.classList.add('quantity-cell');

  const quantityContainer = document.createElement('div');
  quantityContainer.classList.add('quantity-container');

  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.min = 1;
  quantityInput.step = 1;
  quantityInput.classList.add('quantity-input');
  quantityInput.value = productDetails.quantity;
  quantityInput.setAttribute('inputmode', 'numeric'); // Evita las flechas de aumento y disminución

  const decreaseButton = document.createElement('button');
  decreaseButton.textContent = '-';
  decreaseButton.classList.add('quantity-button', 'decrease');
  decreaseButton.addEventListener('click', () => {
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
      quantityInput.dispatchEvent(new Event('input'));
    }
  });

  const increaseButton = document.createElement('button');
  increaseButton.textContent = '+';
  increaseButton.classList.add('quantity-button', 'increase');
  increaseButton.addEventListener('click', () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
    quantityInput.dispatchEvent(new Event('input'));
  });

  quantityContainer.appendChild(decreaseButton);
  quantityContainer.appendChild(quantityInput);
  quantityContainer.appendChild(increaseButton);
  quantityCell.appendChild(quantityContainer);
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


    selectUSDCurrency();
  });


  // Event listener para eliminar un producto del carrito
  removeButton.addEventListener('click', () => {
    removeProductFromCart(productDetails.id);

    tableRow.remove();
    updateCartTotal();
  });
  return tableRow;
}

function selectUSDCurrency () {
  const currencyOptions = document.querySelector('.currency-options');
  const usdRadio = currencyOptions.querySelector('input[value="USD"]');
  usdRadio.checked = true;
}

//! Martin Rodoriguez
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

// Aquí agregamos el código para actualizar el total con el porcentaje de envío
const tipoEnvioSelect = document.getElementById('tipoEnvio');
const segundoMenu = document.getElementById('segundoMenu');

let aumentoPorcentaje = 0;
// Evento para manejar el cambio en la selección de tipo de envío
tipoEnvioSelect.addEventListener('change', () => {
  const selectedOption = tipoEnvioSelect.value;

  // Calcular el porcentaje de aumento basado en la opción seleccionada

  switch (selectedOption) {
    case "premium":
      aumentoPorcentaje = 85;
      console.log("entre 15");
      break;
    case "express":
      aumentoPorcentaje = 93;
      console.log("entre 7");
      break;
    case "estandar":
      aumentoPorcentaje = 95;
      console.log("entre 5");
      break;
    default:
      aumentoPorcentaje = 0;
      console.log("entre 0");
      break;
  }

  updateCartTotal();
  selectUSDCurrency();
});
tipoEnvioSelect.addEventListener('change', () => {
  if (tipoEnvioSelect.value === 'default') {
    segundoMenu.style.display = 'block'; // Muestra el segundo menú
    console.log("entre a block");
  } else {
    segundoMenu.style.display = 'none'; // Oculta el segundo menú
    console.log("entre a none");
  }
});
// Obtener el día actual (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
const currentDay = new Date().getDay();

// Función para aplicar un descuento del 10% los viernes (día 5)
function applyDiscountOnFriday (total) {
  if (currentDay === 6 || 4 || 2) { // Viernes
    const discount = (total * 10) / 100;
    return total - discount;
  }
  return total;
}

// Función para mostrar una notificación llamativa al recargar la página
function showNotificationOnPageLoad () {
  const currentDay = new Date().getDay(); // Obtener el día actual (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)

  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const currentDayName = dayNames[currentDay]; // Obtener el nombre del día actual
  let discount = 0; // Descuento predeterminado

  // Verificar el día actual y aplicar descuento correspondiente
  switch (currentDay) {
    case 2: // Martes
      discount = 15; // Descuento del 15% los martes
      break;
    case 4: // Jueves
      discount = 20; // Descuento del 20% los jueves
      break;
    case 6: // Sábado
      discount = 10; // Descuento del 10% los sábados
      break;
  }

  // Mostrar notificación solo si hay un descuento aplicable
  if (discount > 0) {
    const message = `¡Hoy es  ${currentDayName}, un dia especial para nosotros, por ello te damos un descuento del ${discount}% en los productos!`;

    // Configurar el estilo CSS personalizado para la notificación
    const style = {
      title: 'Has obtenido un descuento especial',
      text: message,
      icon: 'info',
      showConfirmButton: false,
      showClass: {
        popup: 'animated bounceInDown', // Animación de entrada
      },
      hideClass: {
        popup: 'animated bounceOutUp', // Animación de salida
      },
      customClass: {
        content: 'custom-swal-content', // Clase CSS personalizada para el contenido
        container: 'custom-swal-container', // Clase CSS personalizada para el contenedor
      },
    };

    Swal.fire(style);
  }
}

// Mostrar la notificación al cargar la página
showNotificationOnPageLoad();

// Función para actualizar el total del carrito


function updateCartTotal (selectedCurrency) {
  let total = 0;
  let currency = selectedCurrency;

  if (!currency) {
    currency = localStorage.getItem('cartCurrency') || 'USD';
  }

  currentCart.forEach((product) => {
    if (product.currency === 'UYU' && currency === 'USD') {
      total += (product.price * product.quantity) / 40;
    } else if (product.currency === 'USD' && currency === 'UYU') {
      total += product.price * product.quantity * 40;
    } else {
      total += product.price * product.quantity;
    }
  });

  const aumentoDescuento = (total * aumentoPorcentaje) / 100;
  total -= aumentoDescuento;

  total = applyDiscountOnFriday(total); // Aplicar descuento los viernes

  const roundedTotal = Math.floor(total);

  const totalElement = document.getElementById('cart-total');
  if (totalElement) {
    totalElement.textContent = `Total: ${currency} ${roundedTotal} `;
    localStorage.setItem('cartTotal', roundedTotal);
  }
}

tipoEnvioSelect.addEventListener('change', () => {
  updateCartTotal();
});
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

//! Belen Alano

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

//! Jose Perazza

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

//!  Nahuel Medina
function renderCart () {
  const productList = document.getElementById('product-list');

  currentCart.forEach((productDetails, index) => {
    const tableRow = createCartTableRow(productDetails, index);
    productList.appendChild(tableRow);

  });
}

const inputFecha = document.getElementById('fecha');

inputFecha.addEventListener('input', function () {
  let value = this.value.replace(/\D/g, ''); // Eliminar caracteres que no son dígitos

  if (value.length > 4) {
    value = value.slice(0, 4);
  }

  if (value.length > 4) {
    this.value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4);
  } else if (value.length === 4) {
    this.value = value.slice(0, 2) + '/' + value.slice(2, 4);
  } else {
    this.value = value;
  }
});

inputFecha.addEventListener('keydown', function (e) {
  if (!/\d/.test(e.key)) {
    e.preventDefault(); // Evitar la entrada de caracteres no numéricos
  }
});
// Evento que se ejecuta cuando se carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  if (currentCart.length === 0) {
    loadDefaultProduct();
  }
  renderCart();
  updateCartTotal();
});
