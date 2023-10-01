const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


if (productId) {
  localStorage.setItem('selectedProductId', productId);

  const productDetailsUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
  const productCommentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;


  //Belen


  function cargarComentarios (product) {
    fetch(productCommentsUrl)
      .then(response => response.json())
      .then(comments => {
        const commentsContainer = document.getElementById('comments-container');
        comments.forEach(comment => {
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
          function getStarIcons (rating) {
            let stars = '';
            for (let i = 0; i < rating; i++) {
              stars += '★';
            }
            return stars;
          }
        });
      })
      .catch(error => {
        console.error('Error al obtener comentarios:', error);
      });
  }


  //Camila


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


      //Jose


      const carouselInner = document.querySelector('#imageCarousel .carousel-inner');

      // Limpia el carrusel actual
      carouselInner.innerHTML = '';

      // Agrega las imágenes al carrusel y la imagen principal
      product.images.forEach((imageUrl, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('carousel-item');
        if (index === 0) {
          slideDiv.classList.add('active'); // La primera imagen se establece como activa
        }

        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = 'Imagen de producto';


        slideDiv.appendChild(image);
        carouselInner.appendChild(slideDiv);
      });


      // Nahuel M


      product.relatedProducts.forEach(relatedProduct => {
        const relatedProductElement = document.createElement('div');
        relatedProductElement.classList.add("col-md-6");
        relatedProductElement.classList.add("Recommended-Product");
        relatedProductElement.innerHTML = `
          <h3>${relatedProduct.name}</h3>
          <img src="${relatedProduct.image}" alt="${relatedProduct.name}">
        `;

        // Agrega el evento click para redirigir al usuario al producto
        relatedProductElement.addEventListener('click', () => {
          window.location.href = `product-info.html?id=${relatedProduct.id}`; // Reemplaza 'product.html' con la URL de tu página de detalles del producto
        });

        relatedProductsContainer.appendChild(relatedProductElement);
      });
      cargarComentarios(product);

      // ...
    })
    .catch(error => {
      console.error('Error al obtener detalles del producto:', error);
    });

} else {
  console.error('ID de producto no válido.');
}


// Martin Rodriguez



const commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const commentText = document.getElementById('comment').value;
  const rating = document.querySelector('input[name="rating"]:checked').value;

  if (rating < 1 || rating > 5) {
    alert('La puntuación debe estar entre 1 y 5.');
    return;
  }


  // Nacho Ignacio Juan



  const currentUser = localStorage.getItem('currentUser');
  const currentDateTime = new Date().toLocaleString().replace(/\//g, '-');

  const commentsContainer = document.getElementById('comments-container');
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');
  const scoreElement = document.createElement('div');
  scoreElement.innerHTML = `${currentUser} - ${currentDateTime} - <span>${getStarIcons(rating)}</span>`; // Usamos getStarIcons para mostrar las estrellas
  scoreElement.classList.add('pintada');
  const commentTextElement = document.createElement('div');
  commentTextElement.textContent = `${commentText}`;
  commentDiv.appendChild(scoreElement);
  commentDiv.appendChild(commentTextElement);
  commentDiv.appendChild(document.createElement('hr'));
  commentsContainer.appendChild(commentDiv);
  document.getElementById('comment').value = '';
  document.querySelector('input[name="rating"]:checked').checked = false;
  function getStarIcons (rating) {
    let stars = '';
    for (let i = 0; i < rating; i++) {
      stars += '★';
    }
    return stars;
  }
});

//Nahuel A

