const CATEGORIES_URL = "http://localhost:3001/json/cats";
const PUBLISH_PRODUCT_URL ="";
const PRODUCTS_URL = "http://localhost:3001/json/cats_products";

const PRODUCT_INFO_URL = "";    //ESTO ESTA SIENDO YA DEFINIDO EN PRODUCTINFOJS
const PRODUCT_INFO_COMMENTS_URL = "";  //ESTO ESTA SIENDO YA DEFINIDO EN PRODUCTINFOJS
const CART_INFO_URL = "";
const CART_BUY_URL = "";
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
