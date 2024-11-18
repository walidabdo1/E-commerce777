function redirectToProductDetails(productId) {
  window.location.href = `productDetails.html?id=${productId}`;
}

let currentPage = 1;
const itemsPerPage = 40;
let selectedCategory = "";
let selectedBrand = "";

async function fetchCategories() {
  try {
    let response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    let finalRes = await response.json();
    let categoriesHTML =
      '<li data-filter="all" class="category-active"><a href="#" onclick="filterByCategory(\'\')">All</a></li>';
    finalRes.data.forEach((category) => {
      categoriesHTML += `<li data-filter="${category.name}"><a href="#" onclick="filterByCategory('${category._id}')">${category.name}</a></li>`;
    });
    document.getElementById("categories").innerHTML = categoriesHTML;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

async function fetchBrands() {
  try {
    let response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
    let finalRes = await response.json();
    let brandsHTML = "";
    finalRes.data.forEach((brand) => {
      brandsHTML += `<li><a href="#" onclick="filterByBrand('${brand._id}')">${brand.name}</a></li>`;
    });
    document.getElementById("brands").innerHTML = brandsHTML;
  } catch (error) {
    console.error("Error fetching brands:", error);
  }
}

async function twnData(page) {
  try {
    let url = `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${itemsPerPage}`;
    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }
    if (selectedBrand) {
      url += `&brand=${selectedBrand}`;
    }
    let response = await fetch(url);
    let finalRes = await response.json();
    let cartona = "";
    for (let i = 0; i < finalRes.data.length; i++) {
      const product = finalRes.data[i];
      cartona += `        
        <div class="col-md-3 col-sm-4 col-6 position-relative walid">          
          <div class="item border-end" data-product-id="${
            product.id
          }">            
            <div class="image position-relative my-3" onclick="redirectToProductDetails('${product.id}')">              
              <img src="${product.imageCover}" alt="${product.title
        .split(" ")
        .slice(0, 2)
        .join(" ")}">              
              <div class="sell-offer ${
                product.discount ? "bg-danger" : "d-none"
              }">${
        product.discount ? `-${product.discount}%` : ""
      }</div>            
            </div>            
            <div class="img-info text-center">              
              <span>$${product.price}</span>              
              <div class="price d-flex justify-content-between flex-column">                
                <small class="me-2">${
                  product.category.name
                }</small>                
                <a class="pro_name mb-2">${product.title
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}</a>                
                <button class="btn btn-add">Add Cart</button>                
                <button class="wishlist-heart"><i class="fa-solid fa-heart"></i></button>              
              </div>            
            </div>          
          </div>        
        </div>      
      `;
    }
    document.querySelector(
      ".count"
    ).innerHTML = `<span class="text-info me-1">${finalRes.data.length}</span> products found in this page`;
    document.getElementById("twn-pro").innerHTML = cartona;
    setupCartButtons(); // تهيئة أزرار السلة
    setupWishlistButtons();
    updatePagination(finalRes.metadata);
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById(
      "twn-pro"
    ).innerHTML = `<p>Error loading products</p>`;
  }
}

// تعديل: تأكد من عدم تكرار المستمعات
function setupCartButtons() {
  const addCartButtons = document.querySelectorAll('.btn.btn-add');
  addCartButtons.forEach(button => {
    button.removeEventListener('click', handleAddToCart); // إزالة أي مستمعات سابقة
    button.addEventListener('click', handleAddToCart); // إضافة المستمع الجديد
  });
}

function handleAddToCart(event) {
  event.stopPropagation();  // يمنع إعادة التوجيه
  const productId = event.target.closest('.item').getAttribute('data-product-id');
  addToCart(productId);
}

// تعديل: دالة إضافة المنتج إلى السلة
function addToCart(productId) {
  console.log(`Product ${productId} added to cart`);
  // كود إضافة المنتج إلى السلة هنا
}

function updatePagination(metadata) {
  const totalProducts = metadata.totalProducts;
  const totalPages = metadata.numberOfPages;
  let Pagination = document.querySelector(".pagination");

  Pagination.style.visibility = "visible";

  document
    .getElementById("prev-btn")
    .classList.toggle("disabled", metadata.currentPage === 1);
  document
    .getElementById("next-btn")
    .classList.toggle("disabled", metadata.currentPage === totalPages);

  document
    .getElementById("page-1")
    .classList.toggle("active", metadata.currentPage === 1);
  document
    .getElementById("page-2")
    .classList.toggle("active", metadata.currentPage === 2);

  if (totalPages === 0) {
    document.getElementById("next-btn").classList.add("disabled");
    Pagination.style.visibility = "hidden";
    document.getElementById(
      "twn-pro"
    ).innerHTML = `<p class="alert alert-secondary" role="alert">No products found. Try to choose another category or brand</p>`;
  }
  if (totalPages < 2) {
    document.getElementById("page-2").classList.add("disabled");
  } else {
    document.getElementById("page-2").classList.remove("disabled");
  }
}

function nextPage() {
  if (currentPage < 2) {
    currentPage++;
    twnData(currentPage);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    twnData(currentPage);
  }
}

function goToPage(page) {
  currentPage = page;
  twnData(currentPage);
}

function filterByCategory(categoryId) {
  selectedCategory = categoryId;
  selectedBrand = "";
  currentPage = 1;
  twnData(currentPage);
}

function filterByBrand(brandId) {
  selectedBrand = brandId;
  selectedCategory = "";
  currentPage = 1;
  twnData(currentPage);
}

// Initial setup
fetchCategories();
fetchBrands();
twnData(currentPage);

// Brand logos
$(document).ready(function () {
  $(".customer-logos").slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: true,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });
});

































// function redirectToProductDetails(productId) {
//   window.location.href = `productDetails.html?id=${productId}`;
// }

// let currentPage = 1;
// const itemsPerPage = 40;
// let selectedCategory = "";
// let selectedBrand = "";

// async function fetchCategories() {
//   try {
//     let response = await fetch(
//       "https://ecommerce.routemisr.com/api/v1/categories"
//     );
//     let finalRes = await response.json();
//     let categoriesHTML =
//       '<li data-filter="all" class="category-active"><a href="#" onclick="filterByCategory(\'\')">All</a></li>';
//     finalRes.data.forEach((category) => {
//       categoriesHTML += `<li data-filter="${category.name}"><a href="#" onclick="filterByCategory('${category._id}')">${category.name}</a></li>`;
//     });
//     document.getElementById("categories").innerHTML = categoriesHTML;
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//   }
// }

// async function fetchBrands() {
//   try {
//     let response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
//     let finalRes = await response.json();
//     let brandsHTML = "";
//     finalRes.data.forEach((brand) => {
//       brandsHTML += `<li><a href="#" onclick="filterByBrand('${brand._id}')">${brand.name}</a></li>`;
//     });
//     document.getElementById("brands").innerHTML = brandsHTML;
//   } catch (error) {
//     console.error("Error fetching brands:", error);
//   }
// }

// async function twnData(page) {
//   try {
//     let url = `https://ecommerce.routemisr.com/api/v1/products?page=${page}&limit=${itemsPerPage}`;
//     if (selectedCategory) {
//       url += `&category=${selectedCategory}`;
//     }
//     if (selectedBrand) {
//       url += `&brand=${selectedBrand}`;
//     }
//     let response = await fetch(url);
//     let finalRes = await response.json();
//     let cartona = "";
//     for (let i = 0; i < finalRes.data.length; i++) {
//       const product = finalRes.data[i];
//       cartona += `        
//         <div class="col-md-3 col-sm-4 col-6 position-relative walid">          
//           <div class="item border-end" data-product-id="${
//             product.id
//           }" onclick="redirectToProductDetails('${product.id}')">            
//             <div class="image position-relative my-3">              
//               <img src="${product.imageCover}" alt="${product.title
//         .split(" ")
//         .slice(0, 2)
//         .join(" ")}">              
//               <div class="sell-offer ${
//                 product.discount ? "bg-danger" : "d-none"
//               }">${
//         product.discount ? `-${product.discount}%` : ""
//       }</div>            
//             </div>            
//             <div class="img-info text-center">              
//               <span>$${product.price}</span>              
//               <div class="price d-flex justify-content-between flex-column">                
//                 <small class="me-2">${
//                   product.category.name
//                 }</small>                
//                 <a class="pro_name mb-2">${product.title
//                   .split(" ")
//                   .slice(0, 2)
//                   .join(" ")}</a>                
//                 <button class="btn btn-add">Add Cart</button>                
//                 <button class="wishlist-heart"><i class="fa-solid fa-heart"></i></button>              
//               </div>            
//             </div>          
//           </div>        
//         </div>      
//       `;
//     }
//     document.querySelector(
//       ".count"
//     ).innerHTML = `<span class="text-info me-1">${finalRes.data.length}</span> products found in this page`;
//     document.getElementById("twn-pro").innerHTML = cartona;
//     setupCartButtons();
//     setupWishlistButtons();
//     updatePagination(finalRes.metadata);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     document.getElementById(
//       "twn-pro"
//     ).innerHTML = `<p>Error loading products</p>`;
//   }
// }

// function updatePagination(metadata) {
//   const totalProducts = metadata.totalProducts;
//   const totalPages = metadata.numberOfPages;
//   let Pagination = document.querySelector(".pagination");

//   Pagination.style.visibility = "visible";

//   document
//     .getElementById("prev-btn")
//     .classList.toggle("disabled", metadata.currentPage === 1);
//   document
//     .getElementById("next-btn")
//     .classList.toggle("disabled", metadata.currentPage === totalPages);

//   document
//     .getElementById("page-1")
//     .classList.toggle("active", metadata.currentPage === 1);
//   document
//     .getElementById("page-2")
//     .classList.toggle("active", metadata.currentPage === 2);

//   if (totalPages === 0) {
//     document.getElementById("next-btn").classList.add("disabled");
//     Pagination.style.visibility = "hidden";
//     document.getElementById(
//       "twn-pro"
//     ).innerHTML = `<p class="alert alert-secondary" role="alert">No products found Try To Choice another category or brand</p>`;
//   }
//   if (totalPages < 2) {
//     document.getElementById("page-2").classList.add("disabled");
//   } else {
//     document.getElementById("page-2").classList.remove("disabled");
//   }
// }

// function nextPage() {
//   if (currentPage < 2) {
//     currentPage++;
//     twnData(currentPage);
//   }
// }

// function prevPage() {
//   if (currentPage > 1) {
//     currentPage--;
//     twnData(currentPage);
//   }
// }

// function goToPage(page) {
//   currentPage = page;
//   twnData(currentPage);
// }

// function filterByCategory(categoryId) {
//   selectedCategory = categoryId;
//   selectedBrand = "";
//   currentPage = 1;
//   twnData(currentPage);
// }

// function filterByBrand(brandId) {
//   selectedBrand = brandId;
//   selectedCategory = "";
//   currentPage = 1;
//   twnData(currentPage);
// }

// // Initial setup
// fetchCategories();
// fetchBrands();
// twnData(currentPage);

// // Brand logos
// $(document).ready(function () {
//   $(".customer-logos").slick({
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 1000,
//     arrows: true,
//     dots: false,
//     pauseOnHover: false,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 4,
//         },
//       },
//       {
//         breakpoint: 520,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//     ],
//   });
// });
