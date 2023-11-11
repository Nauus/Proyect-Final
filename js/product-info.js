const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const addToCartButton = document.querySelector(".agregar-al-carrito");

if (productId) {
  localStorage.setItem("selectedProductId", productId);

  const productDetailsUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
  const productCommentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

  function cargarComentarios(product) {
    fetch(productCommentsUrl)
      .then((response) => response.json())
      .then((comments) => {
        const commentsContainer = document.getElementById("comments-container");
        comments.forEach((comment) => {
          const score = comment.score;
          const commentDiv = document.createElement("div");
          commentDiv.classList.add("comment");
          const scoreElement = document.createElement("div");
          scoreElement.innerHTML = `${comment.user} - ${
            comment.dateTime
          } - <span>${getStarIcons(score)}</span> `;
          scoreElement.classList.add("pintada");
          const commentText = document.createElement("div");
          commentText.textContent = `${comment.description}`;
          commentDiv.appendChild(scoreElement);
          commentDiv.appendChild(commentText);
          commentDiv.appendChild(document.createElement("hr"));

          commentsContainer.appendChild(commentDiv);
          function getStarIcons(rating) {
            let stars = "";
            for (let i = 0; i < rating; i++) {
              stars += "★";
            }
            return stars;
          }
        });
      })
      .catch((error) => {
        console.error("Error al obtener comentarios:", error);
      });
  }

  fetch(productDetailsUrl)
    .then((response) => response.json())
    .then((product) => {
      const titleElement = document.getElementById("product-title");
      const descriptionElement = document.getElementById("product-description");
      const costElement = document.getElementById("product-cost");

      const categoryElement = document.getElementById("product-category");
      const relatedProductsContainer =
        document.getElementById("related-products");
      titleElement.textContent = product.name;
      descriptionElement.textContent = product.description;
      costElement.textContent = `Precio: ${product.cost} ${product.currency}`;

      categoryElement.textContent = `Categoría: ${product.category}`;
      $(document).ready(function () {
        // Código para obtener los detalles del producto y las imágenes

        // Limpia el carrusel actual
        $(".slider-for").html("");
        $(".slider-nav").html("");

        // Agrega las imágenes al carrusel principal y las miniaturas
        product.images.forEach((imageUrl, index) => {
          const slideDiv = document.createElement("div");
          slideDiv.classList.add("carousel-item");
          if (index === 0) {
            slideDiv.classList.add("active");
          }

          const image = document.createElement("img");
          image.src = imageUrl;
          image.alt = "Imagen de producto";

          slideDiv.appendChild(image);
          $(".slider-for").append(slideDiv);

          const thumbnail = document.createElement("div");
          thumbnail.innerHTML = `<img src="${imageUrl}" alt="Miniatura">`;
          $(".slider-nav").append(thumbnail);
        });

        // Inicializa los carruseles Slick
        $(".slider-for").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: ".slider-nav",
        });

        $(".slider-nav").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: ".slider-for",
          dots: true,
          centerMode: true,
          focusOnSelect: true,
        });
      });

      product.relatedProducts.forEach((relatedProduct) => {
        const relatedProductElement = document.createElement("div");
        relatedProductElement.classList.add("col-md-6");
        relatedProductElement.classList.add("Recommended-Product");
        relatedProductElement.innerHTML = `
        <h3>${relatedProduct.name}</h3>
        <img src="${relatedProduct.image}" alt="${relatedProduct.name}">
      `;

        // Agrega el evento click para redirigir al usuario al producto
        relatedProductElement.addEventListener("click", () => {
          window.location.href = `product-info.html?id=${relatedProduct.id}`;
        });

        relatedProductsContainer.appendChild(relatedProductElement);
      });

      cargarComentarios(product);

      //!
      addToCartButton.addEventListener("click", () => {
        const productDetails = {
          id: product.id,
          name: product.name,
          image: product.images[0],
          price: product.cost,
          currency: product.currency,
          quantity: 1,
        };

        // Obtener el carrito de compras actual desde el almacenamiento local
        const currentCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Verificar si el producto ya está en el carrito
        const existingProductIndex = currentCart.findIndex(
          (item) => item.id === productDetails.id
        );

        if (existingProductIndex !== -1) {
          // Si el producto ya está en el carrito, simplemente aumenta la cantidad
          currentCart[existingProductIndex].quantity += 1;
          console.log(
            "Ya existe en el carrito, lo agregué nuevamente y su cantidad aumentó."
          );
        } else {
          // Si el producto no está en el carrito, agrégalo
          currentCart.push(productDetails);
          console.log("Agregado por primera vez al carrito.");
        }

        // Guardar el carrito actualizado en el almacenamiento local
        localStorage.setItem("cart", JSON.stringify(currentCart));
      });
    })
    .catch((error) => {
      console.error("Error al obtener detalles del producto:", error);
    });
} else {
  console.error("ID de producto no válido.");
}

const commentForm = document.getElementById("comment-form");
commentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const commentText = document.getElementById("comment").value;
  const rating = document.querySelector('input[name="rating"]:checked').value;

  if (rating < 1 || rating > 5) {
    alert("La puntuación debe estar entre 1 y 5.");
    return;
  }

  const currentUser = localStorage.getItem("currentUser");
  const currentDateTime = new Date().toLocaleString().replace(/\//g, "-");

  const commentsContainer = document.getElementById("comments-container");
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");
  const scoreElement = document.createElement("div");
  scoreElement.innerHTML = `${currentUser} - ${currentDateTime} - <span>${getStarIcons(
    rating
  )}</span>`; // Usamos getStarIcons para mostrar las estrellas
  scoreElement.classList.add("pintada");
  const commentTextElement = document.createElement("div");
  commentTextElement.textContent = `${commentText}`;
  commentDiv.appendChild(scoreElement);
  commentDiv.appendChild(commentTextElement);
  commentDiv.appendChild(document.createElement("hr"));
  commentsContainer.appendChild(commentDiv);
  document.getElementById("comment").value = "";
  document.querySelector('input[name="rating"]:checked').checked = false;
  function getStarIcons(rating) {
    let stars = "";
    for (let i = 0; i < rating; i++) {
      stars += "★";
    }
    return stars;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let agregarAlCarritoButton = document.querySelector(".agregar-al-carrito");

  agregarAlCarritoButton.addEventListener("click", function () {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
      showClass: {
        popup: "animate__animated animate__fadeIn", // Animación de entrada
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut", // Animación de salida
      },
    });

    Toast.fire({
      icon: "success",
      title: "Producto agregado al carrito",
    });
  });
});
