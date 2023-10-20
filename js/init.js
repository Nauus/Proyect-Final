const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
};

document.addEventListener('DOMContentLoaded', function () {
  const btnSwitch = document.querySelector('#switch');
  const btnSpooky = document.querySelector('#spooky');
  const darkModeEnabled = localStorage.getItem('darkModeEnabled');
  const spookyModeEnabled = localStorage.getItem('spookyModeEnabled');

  function enableDarkMode() {
    document.body.classList.add('dark');
    document.body.classList.remove('spooky'); // Asegura que no estén activos ambos modos
    btnSwitch.classList.add('active');
    btnSpooky.classList.remove('active');
    localStorage.setItem('darkModeEnabled', 'true');
    localStorage.setItem('spookyModeEnabled', 'false');
  }

  function disableDarkMode() {
    document.body.classList.remove('dark');
    btnSwitch.classList.remove('active');
    localStorage.setItem('darkModeEnabled', 'false');
  }

  function enableSpookyMode() {
    document.body.classList.add('spooky');
    document.body.classList.remove('dark'); // Asegura que no estén activos ambos modos
    btnSpooky.classList.add('active');
    btnSwitch.classList.remove('active');
    localStorage.setItem('spookyModeEnabled', 'true');
    localStorage.setItem('darkModeEnabled', 'false');
  }

  function disableSpookyMode() {
    document.body.classList.remove('spooky');
    btnSpooky.classList.remove('active');
    localStorage.setItem('spookyModeEnabled', 'false');
  }

  if (darkModeEnabled === 'true') {
    enableDarkMode();
  }

  if (spookyModeEnabled === 'true') {
    enableSpookyMode();
  }

  btnSwitch.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  btnSpooky.addEventListener('click', () => {
    if (document.body.classList.contains('spooky')) {
      disableSpookyMode();
    } else {
      enableSpookyMode();
    }
  });
});






document.addEventListener("DOMContentLoaded", function() {
  // Obtener el botón y el elemento de audio
  var spookyButton = document.getElementById("spooky");
  var sound = document.getElementById("sound");

  // Agregar un controlador de eventos al botón para reproducir el sonido al hacer clic
  spookyButton.addEventListener("click", function() {
      sound.play();
  });
});










