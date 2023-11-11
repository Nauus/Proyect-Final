// Obtener el carrito de compras actual desde el almacenamiento local
const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
  window.location.href = "login.html";
}
// Función para crear una fila de la tabla del carrito
function createCartTableRow(productDetails, index) {
  const tableRow = document.createElement("tr");
  // Crear celda de imagen
  const imgCell = document.createElement("td");
  const img = document.createElement("img");
  img.classList.add("product-image");
  img.src = productDetails.image;
  img.alt = productDetails.name;
  imgCell.appendChild(img);
  tableRow.appendChild(imgCell);
  // Crear enlace al producto
  const productLink = document.createElement("a");
  productLink.classList.add("product-name");
  productLink.href = `product-info.html?id=${productDetails.id}`;
  productLink.textContent = productDetails.name;

  // Crear celda de nombre
  const nameCell = document.createElement("td");
  nameCell.appendChild(productLink);
  tableRow.appendChild(nameCell);

  // Crear celda de precio
  const costCell = document.createElement("td");
  costCell.textContent = `${productDetails.currency} ${productDetails.price} `;
  tableRow.appendChild(costCell);

  // Crear celda de cantidad
  const quantityCell = document.createElement("td");
  quantityCell.classList.add("quantity-cell");

  const quantityContainer = document.createElement("div");
  quantityContainer.classList.add("quantity-container");

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.min = 1;
  quantityInput.step = 1;
  quantityInput.classList.add("quantity-input");
  quantityInput.classList.add("no-valid");
  quantityInput.value = productDetails.quantity;
  quantityInput.setAttribute("inputmode", "numeric"); // Evita las flechas de aumento y disminución

  const decreaseButton = document.createElement("button");
  decreaseButton.textContent = "-";
  decreaseButton.classList.add("quantity-button", "decrease");
  decreaseButton.addEventListener("click", () => {
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
      quantityInput.dispatchEvent(new Event("input"));
    }
  });

  const increaseButton = document.createElement("button");
  increaseButton.textContent = "+";
  increaseButton.classList.add("quantity-button", "increase");
  increaseButton.addEventListener("click", () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
    quantityInput.dispatchEvent(new Event("input"));
  });

  quantityContainer.appendChild(decreaseButton);
  quantityContainer.appendChild(quantityInput);
  quantityContainer.appendChild(increaseButton);
  quantityCell.appendChild(quantityContainer);
  tableRow.appendChild(quantityCell);

  // Crear celda de subtotal
  const subtotalCell = document.createElement("td");
  subtotalCell.textContent = `${productDetails.currency} ${
    productDetails.price * productDetails.quantity
  } `;
  tableRow.appendChild(subtotalCell);

  // Crear celda de eliminación
  const removeCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.classList.add("fas", "fa-trash-alt", "remove-product");

  removeCell.appendChild(removeButton);
  tableRow.appendChild(removeCell);

  // Event listener para actualizar el subtotal cuando cambia la cantidad
  quantityInput.addEventListener("input", (event) => {
    const newQuantity = parseInt(event.target.value, 10);

    if (!isNaN(newQuantity) && newQuantity >= 1) {
      // Obtener la posición real del producto en el carrito
      const realIndex = currentCart.findIndex(
        (product) => product.id === productDetails.id
      );

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
  removeButton.addEventListener("click", () => {
    removeProductFromCart(productDetails.id);

    tableRow.remove();
    updateCartTotal();
  });
  return tableRow;
}

function selectUSDCurrency() {
  const currencyOptions = document.querySelector(".currency-options");
  const usdRadio = currencyOptions.querySelector('input[value="USD"]');
  usdRadio.checked = true;
}

// Función para actualizar el subtotal de un producto en el carrito
function updateSubtotal(element, index) {
  const quantity = currentCart[index].quantity;
  const priceText = element.querySelector("td:nth-child(3)").textContent;
  const price = parseFloat(priceText.replace(/[^\d.]/g, "")); // Elimina caracteres no numéricos y convierte a número

  if (!isNaN(price)) {
    const subtotal = element.querySelector("td:nth-child(5)");
    const subtotalValue = price * quantity;
    subtotal.textContent = `${
      currentCart[index].currency
    } ${subtotalValue.toFixed(0)} `;
    localStorage.setItem("cart", JSON.stringify(currentCart));
  } else {
    // Si el precio no es válido, restaura el valor anterior
    const previousPrice = currentCart[index].price;
    element.querySelector(
      "td:nth-child(3)"
    ).textContent = `${currentCart[index].currency} ${previousPrice} `;
  }
}

// Aquí agregamos el código para actualizar el total con el porcentaje de envío
const tipoEnvioSelect = document.getElementById("tipoEnvio");
const segundoMenu = document.getElementById("segundoMenu");

let aumentoPorcentaje = 0;
// Evento para manejar el cambio en la selección de tipo de envío
tipoEnvioSelect.addEventListener("change", () => {
  const selectedOption = tipoEnvioSelect.value;

  // Calcular el porcentaje de aumento basado en la opción seleccionada

  switch (selectedOption) {
    case "premium":
      aumentoPorcentaje = 15;
      console.log("entre 15");
      break;
    case "express":
      aumentoPorcentaje = 7;
      console.log("entre 7");
      break;
    case "estandar":
      aumentoPorcentaje = 5;
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
tipoEnvioSelect.addEventListener("change", () => {
  if (tipoEnvioSelect.value === "default") {
    segundoMenu.style.display = "block"; // Muestra el segundo menú
    console.log("entre a block");
  } else {
    segundoMenu.style.display = "none"; // Oculta el segundo menú
    console.log("entre a none");
  }
});
// Obtener el día actual (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
const currentDay = new Date().getDay();

// Luego, define la función applyDiscountOnSpecificDays
function applyDiscountOnSpecificDays(total) {
  const currentDay = new Date().getDay(); // Obtener el día actual (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)

  if (currentDay === 0) {
    // Domingo, Martes o Jueves
    const discount = (total * 10) / 100; // Descuento del 10% los domingos
    return total - discount;
  } else if (currentDay === 2) {
    const discount = (total * 15) / 100; // Descuento del 15% los  martes
    return total - discount;
  } else if (currentDay === 4) {
    const discount = (total * 20) / 100; // Descuento del 20% los  jueves
    return total - discount;
  }
  return total;
}
// Función para mostrar una notificación llamativa al recargar la página
function showNotificationOnPageLoad() {
  const currentDay = new Date().getDay(); // Obtener el día actual (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
  const dayNames = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
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
    case 0: // Domingo
      discount = 10; // Descuento del 10% los domingos
      break;
  }

  // Aquí puedes mostrar el porcentaje del descuento en algún elemento HTML específico
  const discountElement = document.getElementById("discount-amount");
  if (discountElement) {
    const discountPercentage = discount > 0 ? `${discount}%` : "0%"; // Formatea el porcentaje
    discountElement.textContent = `como es un dia especial para nosotros has obtenido un descuento del ${discountPercentage} se vera reflejado en tu total.`;
  }

  // Mostrar notificación solo si hay un descuento aplicable
  if (discount > 0) {
    const message = `¡Hoy es ${currentDayName}, un día especial para nosotros, por ello te damos un descuento del ${discount}% en los productos!`;

    // Configurar el estilo CSS personalizado para la notificación
    const style = {
      title: "Has obtenido un descuento especial",
      text: message,
      icon: "info",
      showConfirmButton: false,
      showClass: {
        popup: "animated bounceInDown", // Animación de entrada
      },
      hideClass: {
        popup: "animated bounceOutUp", // Animación de salida
      },
      customClass: {
        content: "custom-swal-content", // Clase CSS personalizada para el contenido
        container: "custom-swal-container", // Clase CSS personalizada para el contenedor
      },
    };

    Swal.fire(style);
  }
}

// Mostrar la notificación al cargar la página
showNotificationOnPageLoad();

// Función para actualizar el total del carrito
function updateCartTotal(selectedCurrency) {
  let total = 0;
  let currency = selectedCurrency;
  let subtotal = 0;

  if (!currency) {
    currency = localStorage.getItem("cartCurrency") || "USD";
  }

  currentCart.forEach((product) => {
    if (product.currency === "UYU" && currency === "USD") {
      total += (product.price * product.quantity) / 40;
      subtotal += (product.price * product.quantity) / 40;
    } else if (product.currency === "USD" && currency === "UYU") {
      total += product.price * product.quantity * 40;
      subtotal += product.price * product.quantity * 40;
    } else {
      total += product.price * product.quantity;
      subtotal += product.price * product.quantity;
    }
  });

  // Aplica el descuento si corresponde
  total = applyDiscountOnSpecificDays(total);

  const aumentoDescuento = (total * aumentoPorcentaje) / 100;
  const costoEnvio = (total * aumentoPorcentaje) / 100;

  total += costoEnvio;

  const roundedTotal = Math.floor(total);
  const totalElement = document.getElementById("cart-total");
  if (totalElement) {
    totalElement.textContent = `Total: ${currency} ${roundedTotal} `;
    localStorage.setItem("cartTotal", roundedTotal);
  }

  const roundedSubtotal = Math.floor(subtotal);
  const subtotalElement = document.getElementById("subtotal");
  if (subtotalElement) {
    subtotalElement.textContent = `Subtotal: ${currency} ${roundedSubtotal} `;
  }

  const envioTotalElement = document.getElementById("envio-total");
  if (envioTotalElement) {
    envioTotalElement.textContent = `Costo de envío: ${currency} ${costoEnvio.toFixed(
      2
    )}`;
  }

  tipoEnvioSelect.addEventListener("change", () => {
    updateCartTotal();
  });

  // Obtén todos los botones de radio con name="currency"
  const currencyButtons = document.querySelectorAll('input[name="currency"]');

  // Agrega un evento 'change' a cada botón de radio
  currencyButtons.forEach((button) => {
    button.addEventListener("change", () => {
      const selectedCurrency = button.value;
      updateCartTotal(selectedCurrency);
    });
  });
}

// Función para eliminar un producto del carrito
// Función para eliminar un producto del carrito por su ID

//! Camila Altez
function removeProductFromCart(productID) {
  const productIndex = currentCart.findIndex(
    (product) => product.id === productID
  );
  if (productIndex !== -1) {
    currentCart.splice(productIndex, 1);
    // Actualiza el almacenamiento local con la nueva versión del carrito
    localStorage.setItem("cart", JSON.stringify(currentCart));
    updateCartTotal(); // Actualiza el total del carrito
  }
}
// Función para cargar un producto predeterminado desde una URL y agregarlo al carrito

function loadDefaultProduct() {
  const productDetailsUrl =
    "https://japceibal.github.io/emercado-api/user_cart/25801.json";

  fetch(productDetailsUrl)
    .then((response) => response.json())
    .then((productData) => {
      const defaultProduct = {
        id: productData.articles[0].id,
        name: productData.articles[0].name,
        price: productData.articles[0].unitCost,
        currency: "USD",
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
        localStorage.setItem("cart", JSON.stringify(currentCart));
        renderCart(); // Renderizar el carrito después de agregar el producto predeterminado
        updateCartTotal();
      }
    })
    .catch((error) => {
      console.error("Error al obtener detalles del producto:", error);
    });
}
// Función para renderizar los productos en el carrito

function renderCart() {
  const productList = document.getElementById("product-list");

  currentCart.forEach((productDetails, index) => {
    const tableRow = createCartTableRow(productDetails, index);
    productList.appendChild(tableRow);
  });
}

//! Belen Alano
// Abre el modal al hacer clic en el botón
document
  .getElementById("openPaymentModal")
  .addEventListener("click", function () {
    document.getElementById("paymentModal").style.display = "block";
  });

// Cierra el modal al hacer clic en la "x"
document
  .getElementById("closePaymentModal")
  .addEventListener("click", function (e) {
    e.stopPropagation(); // Evita que el clic se propague más allá del botón "x"
    document.getElementById("paymentModal").style.display = "none";
  });

// Evita que se cierre haciendo clic fuera del modal
document.getElementById("paymentModal").addEventListener("click", function (e) {
  e.stopPropagation(); // Evita que el clic se propague más allá del modal
});

window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("paymentModal")) {
    document.getElementById("paymentModal").style.display = "none";
  }
});

// Cambia los campos del modal según la forma de pago seleccionada
document.getElementById("creditCardFields").style.display = "none";
document.getElementById("bankAccountFields").style.display = "none";

//! Nahuel Medina
document
  .getElementById("paymentMethod")
  .addEventListener("change", function () {
    const selectedMethod = this.value;
    const creditCardFields = document.getElementById("creditCardFields");
    const bankAccountFields = document.getElementById("bankAccountFields");

    if (selectedMethod === "creditCard") {
      creditCardFields.style.display = "block";
      bankAccountFields.style.display = "none";
    } else if (selectedMethod === "bankAccount") {
      bankAccountFields.style.display = "block";
      creditCardFields.style.display = "none";
    } else {
      // Si se selecciona la opción predeterminada, oculta todos los campos
      creditCardFields.style.display = "none";
      bankAccountFields.style.display = "none";
    }
  });

let paymentDataIsValid = false; // Variable para rastrear la validez de los datos de pago

//! NAHUEL ALONSO
// Procesa los datos al confirmar el pago
document
  .getElementById("confirmPayment")
  .addEventListener("click", function () {
    const selectedMethod = document.getElementById("paymentMethod").value;

    let paymentData = {};

    function isValidCardNumber(cardNumber) {
      // Elimina caracteres no numéricos
      cardNumber = cardNumber.replace(/\D/g, "");
      // La tarjeta debe tener 16 dígitos
      return /^\d{16}$/.test(cardNumber);
    }

    function isValidCodeCvv(codeCvv) {
      // El CVV debe tener exactamente 3 dígitos
      return /^\d{3}$/.test(codeCvv);
    }

    function isValidVencimiento(vencimiento) {
      // La fecha de vencimiento debe tener el formato MM/YY
      // y el mes debe estar en el rango de 01-12 y el año debe ser mayor que el actual
      const today = new Date();
      const currentYear = today.getFullYear() % 100;
      const currentMonth = today.getMonth() + 1;

      // Validar el formato
      if (!/^\d{2}\/\d{2}$/.test(vencimiento)) {
        return false;
      }

      // Verificar si el mes y el año están en el rango deseado
      const expMonth = parseInt(vencimiento.substring(0, 2), 10);
      const expYear = parseInt(vencimiento.substring(3), 10);

      return (
        expMonth >= 1 &&
        expMonth <= 12 &&
        (expYear > currentYear ||
          (expYear === currentYear && expMonth >= currentMonth))
      );
    }
    //! Jose Perazza
    if (selectedMethod === "creditCard") {
      const cardNumberInput = document.getElementById("cardNumber");
      const codeCvvInput = document.getElementById("codeCvv");
      const vencimientoInput = document.getElementById("vencimiento");
      const cardNumber = cardNumberInput.value;
      const codeCvv = codeCvvInput.value;
      const vencimiento = vencimientoInput.value;

      if (!isValidCardNumber(cardNumber) || !isValidCodeCvv(codeCvv)) {
        // Muestra un mensaje de error si los datos de la tarjeta no son válidos
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, ingrese datos válidos para la tarjeta de crédito/débito.",
        });
        paymentDataIsValid = false;
      } else if (!isValidVencimiento(vencimiento)) {
        // Muestra un mensaje de error si la fecha de vencimiento no es válida
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, Verifique la fecha de vencimiento. Debe tener el formato MM/YY y el mes debe estar en el rango de 01-12 y el año debe ser mayor que el actual.",
        });
        paymentDataIsValid = false;
      } else {
        // Los datos son válidos, muestra un mensaje de éxito
        Swal.fire({
          icon: "success",
          title: "Aprobado",
          text: "Los datos de su tarjeta han sido guardados con éxito. ¡Gracias!",
        });
        paymentDataIsValid = true;
      }

      // Si los datos son válidos, guárdalos
      paymentData.cardNumber = cardNumber;
      paymentData.codeCvv = codeCvv;
      paymentData.vencimiento = vencimiento;
    } else if (selectedMethod === "bankAccount") {
      const accountNumberInput = document.getElementById("accountNumber");
      const accountNumber = accountNumberInput.value;
      function isValidAccountNumber(accountNumber) {
        // Verificar si la entrada es una cadena y no está vacía
        if (typeof accountNumber !== "string" || accountNumber.trim() === "") {
          return false;
        }

        // Eliminar espacios en blanco de la entrada
        accountNumber = accountNumber.replace(/\s/g, "");

        // Verificar que la entrada consista solo en dígitos y que su longitud no supere 20
        if (/^\d{16}$/.test(accountNumber)) {
          return true;
        }

        return false;
      }
      //! Martin Rodriguez
      // Validaciones para transferencia bancaria
      if (!isValidAccountNumber(accountNumber)) {
        // Número de cuenta inválido
        accountNumberInput.classList.add("invalid");
        accountNumberInput.setAttribute("maxlength", "20");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, ingrese un número de cuenta válido.",
        });
        paymentDataIsValid = false;
        return;
      } else {
        accountNumberInput.classList.remove("invalid");
        accountNumberInput.removeAttribute("maxlength");
        Swal.fire({
          icon: "success",
          title: "Aprobado",
          text: "Su numero de cuenta ha sido guardada con exito. Gracias!",
        });
        paymentDataIsValid = true;
      }

      // Si los datos son válidos, guárdalos
      paymentData.accountNumber = accountNumber;
      console.log(accountNumber);
    }

    // Cerrar el modal
    document.getElementById("paymentModal").style.display = "none";
    const selectedPaymentDisplay = document.getElementById(
      "selectedPaymentDisplay"
    );

    if (selectedMethod === "creditCard") {
      selectedPaymentDisplay.textContent = "Tarjeta de Crédito/Débito";
    } else {
      selectedPaymentDisplay.textContent = "Cuenta Bancaria";
    }

    // Aquí puedes hacer algo con los datos, como enviarlos al servidor
    console.log("Datos de pago:", paymentData);

    // Luego, puedes habilitar el botón "Finalizar Compra" si se cumple alguna condición, por ejemplo:
    // document.getElementById("finalizarCompra").disabled = false;
  });

//! Validaciones

//! Juan Ramella
document
  .getElementById("finalizarCompra")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Verifica si se ha seleccionado un tipo de envío
    const tipoEnvio = document.getElementById("tipoEnvio").value;
    if (tipoEnvio === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, seleccione un tipo de envío.",
      });
      return;
    }

    // Verifica si se ha seleccionado una forma de pago
    const paymentMethod = document.getElementById("paymentMethod").value;
    if (paymentMethod === "defaultOption") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, seleccione una forma de pago.",
      });
      return;
    }

    let isValid = true;

    // Realiza validaciones de dirección, número y esquina en tiempo real
    const calleInput = document.getElementById("calle");
    const numeroInput = document.getElementById("direccion");
    const esquinaInput = document.getElementById("esquina");

    if (!/^[A-Za-z\s]+$/.test(calleInput.value.trim())) {
      calleInput.classList.add("invalid");
      isValid = false;
    } else {
      calleInput.classList.remove("invalid");
    }

    if (!/^[0-9]+$/.test(numeroInput.value.trim())) {
      numeroInput.classList.add("invalid");
      isValid = false;
    } else {
      numeroInput.classList.remove("invalid");
    }

    if (!/^[A-Za-z\s]+$/.test(esquinaInput.value.trim())) {
      esquinaInput.classList.add("invalid");
      isValid = false;
    } else {
      esquinaInput.classList.remove("invalid");
    }

    if (!isValid) {
      // Muestra un mensaje de error si no se completan los campos
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, complete todos los campos requeridos correctamente.",
      });
      return;
    }
    if (!paymentDataIsValid) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, complete y verifique los datos de pago correctamente antes de continuar.",
      });
      return;
    }

    if (paymentDataIsValid && isValid) {
      // Muestra el mensaje de éxito con SweetAlert
      Swal.fire({
        icon: "success",
        title: "Compra exitosa",
        text: "Gracias por tu compra, recibiras un mensaje en tu casilla de correo electronico con tu boleta e información de envio.",
      }).then((result) => {
        if (result.isConfirmed) {
          clearCart();
          location.reload();
        }
      });
    }

    //! Camila Altez
    function clearCart() {
      localStorage.removeItem("cart");
      renderCart();
      updateCartTotal();
    }
  });
////////////////////////////////
// Evento que se ejecuta cuando se carga el DOM
document.addEventListener("DOMContentLoaded", () => {
  if (currentCart.length === 0) {
    loadDefaultProduct();
  }
  renderCart();
  updateCartTotal();
});
