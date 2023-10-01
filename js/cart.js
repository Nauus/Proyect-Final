
function createProductListItem(productData) {
    const listItem = document.createElement('li');
  
    
    const img = document.createElement('img');
    img.src = productData.images[0]; 
    img.alt = productData.name;
    listItem.appendChild(img);
  

    const title = document.createElement('h5');
    title.textContent = productData.name;
    listItem.appendChild(title);
  
    
    const price = document.createElement('p');
    price.textContent = ` ${productData.cost} ${productData.currency}`;
    listItem.appendChild(price);

   
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Ver Detalles';
    button.addEventListener('click', () => {

    });
    listItem.appendChild(button);
  
    return listItem;
}

  

  const productId = localStorage.getItem('selectedProductId'); 
  
  if (productId) {
    loadProductDetails(productId);
  }
function loadProductDetails(productId) {
    const productDetailsUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
  
    fetch(productDetailsUrl)
      .then(response => response.json())
      .then(productData => {
        const productListItem = createProductListItem(productData);
        const productList = document.getElementById('product-list'); 
  
      
        productList.appendChild(productListItem);
      })
      .catch(error => {
        console.error('Error al obtener detalles del producto:', error);
      });
}





