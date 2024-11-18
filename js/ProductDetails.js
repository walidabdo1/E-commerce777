document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        const product = data.data;
        document.getElementById("product-title").textContent = product.title;
        document.getElementById("product-brand").textContent =
          product.brand.name;
        const averageRating = product.ratingsAverage;
        const totalStars = 5;
        let starsHtml = "";
        for (let i = 1; i <= totalStars; i++) {
          if (i <= averageRating) {
            starsHtml += '<i class="fa fa-star rating-color me-2"></i>';
          } else {
            starsHtml += '<i class="fa fa-star-o rating-color me-2"></i>';
          }
        }

        document.getElementById(
          "product-rating"
        ).innerHTML = `${averageRating}  ${starsHtml}`;
        document.getElementById("product-quantity").textContent =
          product.quantity;
        document.getElementById(
          "product-price"
        ).textContent = `$${product.price}`;
        document.getElementById("product-description").textContent =
          product.description;
        document.getElementById("selected-image").src = product.imageCover;

        const thumbnailsContainer = document.getElementById("image-thumbnails");
        thumbnailsContainer.innerHTML = "";
        if (product.images && product.images.length > 0) {
          product.images.forEach((image) => {
            const thumbnail = document.createElement("img");
            thumbnail.src = image;
            thumbnail.style.width = "50px";
            thumbnail.onclick = () => {
              document.getElementById("selected-image").src = image;
            };
            thumbnailsContainer.appendChild(thumbnail);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        document.getElementById("product-details").innerHTML =
          "Error loading product details.";
      });
  } else {
    document.getElementById("product-details").innerHTML =
      "No product ID found.";
  }
});
