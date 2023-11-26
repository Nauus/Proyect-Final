/*const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
*/


const CATEGORIES_URL = "http://localhost:3001/json/cats";
const PUBLISH_PRODUCT_URL ="http://localhost:3001/json/sell";
const PRODUCTS_URL = "http://localhost:3001/json/cats_products";
const PRODUCT_INFO_URL = "";    //ESTO ESTA SIENDO YA DEFINIDO EN PRODUCTINFOJS
const PRODUCT_INFO_COMMENTS_URL = "";  //ESTO ESTA SIENDO YA DEFINIDO EN PRODUCTINFOJS
const CART_INFO_URL = "http://localhost:3001/json/user_cart";
const CART_BUY_URL = "http://localhost:3001/json/cart";
const EXT_TYPE = ".json";

//NO AGREGUE CADA LINK CORRESPONDIENTE PARA NO MAREAR MAS EL CODIGO
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
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
