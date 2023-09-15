
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log(productId);


if (productId) {
  const productDetailsUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
  console.log(productDetailsUrl);
  const productCommentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

  /////////////////////////////////////////////////////////////////        BELEN        /////////////////////////////////////////////////////////////////////////////////////////////////
  function cargarComentarios(product) {
    fetch(productCommentsUrl)
      .then(response => response.json())
      .then(comments => {
        const commentsContainer = document.getElementById('comments-container');
        comments.forEach(comment => {
          // Crear elementos HTML para mostrar comentarios
          const score = comment.score;
          const commentDiv = document.createElement('div');
          commentDiv.classList.add('comment');
          const scoreElement = document.createElement('div');
          scoreElement.innerHTML = `${comment.user} - ${comment.dateTime} - <span>${getStarIcons(score)}</span> `;
          scoreElement.classList.add('pintada');
          const commentText = document.createElement('div');
          commentText.textContent = `${comment.description}`;
          commentDiv.appendChild(scoreElement);
          commentDiv.appendChild(commentText);
          commentDiv.appendChild(document.createElement('hr'));

          commentsContainer.appendChild(commentDiv);
        });
      })
      .catch(error => {
        console.error('Error al obtener comentarios:', error);
      });
  }

  /////////////////////////////////////////////////////////////  NAHUEL /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  fetch(productDetailsUrl)
    .then(response => response.json())
    .then(product => {
      const titleElement = document.getElementById('product-title');
      const descriptionElement = document.getElementById('product-description');
      const costElement = document.getElementById('product-cost');
      const soldCountElement = document.getElementById('product-soldCount');
      const categoryElement = document.getElementById('product-category');
      const relatedProductsContainer = document.getElementById('related-products');
      titleElement.textContent = product.name;
      descriptionElement.textContent = product.description;
      costElement.textContent = `Precio: ${product.cost} ${product.currency}`;
      soldCountElement.textContent = `Vendidos: ${product.soldCount}`;
      categoryElement.textContent = `Categoría: ${product.category}`;

//////////////////////////////////////////////////////////////////////////// JOSE //////////////////////////////////////////////////////////////////////////////////////////////
      const carouselInner = document.querySelector('#imageCarousel .carousel-inner');
      carouselInner.innerHTML = '';
      product.images.forEach((imageUrl, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('carousel-item');
        if (index === 0) {
          slideDiv.classList.add('active');
        }
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = 'Imagen de producto';
        image.classList.add('d-block', 'w-100');
        slideDiv.appendChild(image);
        carouselInner.appendChild(slideDiv);
      });
/////////////////////////////////////////////////////////////////////////// MARTIN ///////////////////////////////////////////////////////////////////////////////////////////////
      product.relatedProducts.forEach(relatedProduct => {
        const relatedProductElement = document.createElement('div');
        relatedProductElement.classList.add("col-md-6");
        relatedProductElement.innerHTML = `
          <h3>${relatedProduct.name}</h3>
          <img src="${relatedProduct.image}" alt="${relatedProduct.name}">
        `;
        relatedProductsContainer.appendChild(relatedProductElement);
      });

      cargarComentarios(product);
    })
    .catch(error => {
      console.error('Error al obtener detalles del producto:', error);
    });
/////////////////////////////////////////////////////////////////////////// NAHUEL M /////////////////////////////////////////////////////////////////////////////////////////////
} else {
  console.error('ID de producto no válido.');
}

const commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const commentText = document.getElementById('comment').value;
  const rating = document.querySelector('input[name="rating"]:checked').value;

  // Validar la puntuación
  if (rating < 1 || rating > 5) {
    alert('La puntuación debe estar entre 1 y 5.');
    return;
  }
/////////////////////////////////////////////////////////////////////////// JUAN IGNACIO NACHO /////////////////////////////////////////////////////////////////////////////////////////////
  // Obtener información del usuario actual y fecha/hora
  const currentUser = localStorage.getItem('currentUser');
  const currentDateTime = new Date().toLocaleString().replace(/\//g, '-');

  // Crear y mostrar el comentario
  const commentsContainer = document.getElementById('comments-container');
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');
  const scoreElement = document.createElement('div');
  scoreElement.innerHTML = `${currentUser} - ${currentDateTime} - <span>${getStarIcons(rating)}</span>`;
  scoreElement.classList.add('pintada');
  const commentTextElement = document.createElement('div');
  commentTextElement.textContent = `${commentText}`;
  commentDiv.appendChild(scoreElement);
  commentDiv.appendChild(commentTextElement);
  commentDiv.appendChild(document.createElement('hr'));
  commentsContainer.appendChild(commentDiv);

  // Limpiar el formulario
  document.getElementById('comment').value = '';
  document.querySelector('input[name="rating"]:checked').checked = false;
  
  alert('Comentario agregado con éxito. (Este mensaje es solo para demostración, no se envía al servidor)');
  
  
  function getStarIcons(rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
      stars += '★';
    }
    return stars;
  }
});
/////////////////////////////////////////////////////////////////////////// CAMILA /////////////////////////////////////////////////////////////////////////////////////////////