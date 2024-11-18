// Loading Section
const loadingDiv = document.querySelector(".loading");

window.onload = function () {
  loadingDiv.classList.replace("opacity-1", "opacity-0");
  setTimeout(() => {
    loadingDiv.classList.add("d-none");
  }, 500);
};

// Cart and Wishlist
const numWish = document.querySelector(".num-wish");
const numCart = document.querySelector(".num-cart");
let addBtns = document.querySelectorAll(".btn-add, .special-btn-add");
let favBtns = document.querySelectorAll(".fav");
let cart = JSON.parse(localStorage.getItem("CartArray")) || [];
let wish = JSON.parse(localStorage.getItem("WishArray")) || [];

// Function to check login status and update navigation buttons
function updateNavButtons() {
  const token = localStorage.getItem('token');
  const signinBtn = document.getElementById('signinBtn');
  const signupBtn = document.getElementById('signupBtn');
  const signoutBtn = document.getElementById('signoutBtn');

  if (token) {
      if (signinBtn) signinBtn.style.display = 'none';
      if (signupBtn) signupBtn.style.display = 'none';
      if (signoutBtn) signoutBtn.style.display = 'block';
  } else {
      if (signinBtn) signinBtn.style.display = 'block';
      if (signupBtn) signupBtn.style.display = 'block';
      if (signoutBtn) signoutBtn.style.display = 'none';
  }
}

const signoutBtn = document.getElementById('signoutBtn');
if (signoutBtn) {
  signoutBtn.addEventListener('click', function() {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      updateNavButtons();
      window.location.href = 'index.html'; 
  });
}

// Add to cart function
function addToCart(e) {
  const button = e.target;
  const item = button.closest('.item');
  const productId = item.dataset.productId;
  const token = localStorage.getItem('token'); 

  if (!token) {
      window.location.href = 'Signin.html';
      return; 
  }

  if (!button.classList.contains("btn-remove")) {
    const newItem = {
      id: productId,
      name: item.querySelector('h6 a').innerHTML,
      price: item.querySelector('.item-text-con span:first-child').innerHTML,
      cat: item.querySelector('.item-text-con .small').innerHTML,
      count: 1,
      imgSrc: item.querySelector('img').getAttribute('src'),
    };

    cart.push(newItem);
    localStorage.setItem("CartArray", JSON.stringify(cart));
    button.classList.add("btn-remove");
    button.innerHTML = "Remove Cart";
  } else {
    cart = cart.filter(cartItem => cartItem.id !== productId);
    localStorage.setItem("CartArray", JSON.stringify(cart));
    button.classList.remove("btn-remove");
    button.innerHTML = "Add Cart";
  }
  
  displayCart(); 
  updateNavButtons(); 
}

window.onload = function() {
  updateNavButtons();
};


// تعريف دالة setupCartButtons
function setupCartButtons() {
  // جلب جميع الأزرار الخاصة بإضافة المنتجات من خلال الفئات "btn-add" و "special-btn-add"
  addBtns = document.querySelectorAll(".btn-add, .special-btn-add");

  // استخدام حلقة forEach للتكرار على كل زر تم جلبه
  addBtns.forEach((btn) => {
    // العثور على العنصر الأقرب الذي يحتوي على الفئة "item" (الذي يمثل المنتج)
    const item = btn.closest('.item');

    // الحصول على معرف المنتج من البيانات المخزنة في العنصر
    const productId = item.dataset.productId;

    // التحقق مما إذا كان المنتج موجودًا في السلة باستخدام some
    if (cart.some(cartItem => cartItem.id === productId)) {
      // إذا كان المنتج موجودًا، أضف الفئة "btn-remove" إلى الزر
      btn.classList.add("btn-remove");

      // تغيير النص داخل الزر إلى "Remove Cart" ليشير إلى أنه يمكن إزالة المنتج
      btn.innerHTML = "Remove Cart";
    }
     else {
      // إذا لم يكن المنتج موجودًا، قم بإزالة الفئة "btn-remove" من الزر
      btn.classList.remove("btn-remove");

      // تغيير النص داخل الزر إلى "Add Cart" ليشير إلى أنه يمكن إضافة المنتج
      btn.innerHTML = "Add Cart";
    }

    // إضافة حدث النقر لكل زر، حيث سيتم استدعاء الدالة addToCart عند النقر
    btn.addEventListener("click", addToCart);
  });
}



let totalPriceText = document.querySelector(".total-price");
function displayCart() {
  let totalPrice = 0;
  numCart.innerHTML = cart.length;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += parseFloat(cart[i].price.replace('$', '')) * cart[i].count;
  }
  totalPriceText.innerHTML = "$ " + totalPrice.toFixed(2);
}

displayCart();

// Super deals section
async function getData() {
  try {
    let response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
    let finalRes = await response.json();

    let slide1 = "";
    let slide2 = "";

    for (let i = 0; i < 8 && i < finalRes.data.length; i++) {
      slide1 += `
        <div class="item sale col-6 col-md-4 col-lg-3 p-0 position-relative pb-4" data-product-id="${finalRes.data[i].id}">
          <div class="item-img-con">
            <img
              src="${finalRes.data[i].imageCover}"
              alt="${finalRes.data[i].title.split(" ").slice(0,2).join(" ")}"
              class="w-100"
            />
          </div>
          <div class="item-text-con d-flex flex-column gap-1 align-items-center px-2 mb-3">
            <span>$${finalRes.data[i].price}</span>
            <span class="small text-secondary">${finalRes.data[i].category.name}</span>
            <h6><a href="">${finalRes.data[i].title.split(" ").slice(0,2).join(" ")}</a></h6>
          </div>
          <button class="btn special-btn-add">Add Cart</button>
          <button class="wishlist-heart fav"><i class="fa-solid fa-heart"></i></button>
        </div>
      `;
    }

    for (let i = 8; i < 16 && i < finalRes.data.length; i++) {
      slide2 += `
        <div class="item sale col-6 col-md-4 col-lg-3 p-0 position-relative pb-4" data-product-id="${finalRes.data[i].id}">
          <div class="item-img-con">
            <img
              src="${finalRes.data[i].imageCover}"
              alt="${finalRes.data[i].title.split(" ").slice(0,2).join(" ")}"
              class="w-100"
            />
          </div>
          <div class="item-text-con d-flex flex-column gap-1 align-items-center mb-3 px-2">
            <span>$${finalRes.data[i].price}</span>
            <span class="small text-secondary">${finalRes.data[i].category.name}</span>
            <h6><a href="">${finalRes.data[i].title.split(" ").slice(0,2).join(" ")}</a></h6>
          </div>
          <button class="btn special-btn-add">Add Cart</button>
          <button class="wishlist-heart fav"><i class="fa-solid fa-heart"></i></button>
        </div>
      `;
    }

    document.querySelector(".owl-carousel").innerHTML = `
      <div class="carousel-slide row py-4">${slide1}</div>
      <div class="carousel-slide row py-4">${slide2}</div>
    `;
    
    $(".owl-carousel").trigger('destroy.owl.carousel');
    $(".owl-carousel").owlCarousel({
      loop: false,
      margin: 10,
      nav: true,
      items: 1,
      dots: true
    });
    
    setupCartButtons();
    setupWishlistButtons();
  } catch (error) {
    console.error("Error fetching data:", error);
    document.querySelector(".owl-carousel").innerHTML = "<p>Error loading products</p>";
  }
}
getData();

async function twnData() {
  try {
    let response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
    let finalRes = await response.json();

    let cartona = "";
    for (let i = 17; i < 25; i++) {
      cartona += `
        <div class="item sale col-6 col-md-4 col-lg-3 p-0" data-product-id="${finalRes.data[i].id}">
          <div class="item-img-con">
            <img
              src="${finalRes.data[i].imageCover}"
              alt="${finalRes.data[i].title.split(" ").slice(0,2).join(" ")}"
              class="w-100"
            />
          </div>
          <div class="item-text-con d-flex flex-column gap-1 align-items-center px-2">
            <span>$${finalRes.data[i].price}</span>
            <span class="small text-secondary">${finalRes.data[i].category.name}</span>
            <h6><a href="">${finalRes.data[i].title.split(" ").slice(0,2).join(" ")}</a></h6>
          </div>
          <button class="btn-add">Add Cart</button>
          <button class="wishlist-heart fav"><i class="fa-solid fa-heart"></i></button>
        </div>
      `;
    }
    document.getElementById("twn-pro").innerHTML = cartona;
    setupCartButtons();
    setupWishlistButtons();
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("twn-pro").innerHTML = "<p>Error loading products</p>";
  }
}
twnData();

// Trends section
async function trendData() {
  try {
    let response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
    let finalRes = await response.json();

    let cartona = "";
    for (let i = 30; i < 40 && i < finalRes.data.length; i++) {
      cartona += `
        <div class="trend p-4 rounded-3 bg-white position-relative" data-product-id="${finalRes.data[i].id}">
          <div class="new"></div>
          <button class="wishlist-heart fav"><i class="fa-solid fa-heart"></i></button>
          <img
            src="${finalRes.data[i].imageCover}"
            alt="${finalRes.data[i].title.split(" ").slice(0,2).join(" ")}"
            class="w-75 m-auto d-block mb-3"
          />
          <span class="small text-secondary">${finalRes.data[i].category.name}</span>
          <div class="d-flex justify-content-between gap-3">
            <h6 class="fw-normal">${finalRes.data[i].title.split(" ").slice(0,2).join(" ")}</h6>
            <h6 class="fw-normal">$${finalRes.data[i].price}</h6>
          </div>
        </div>
      `;
    }

    document.getElementById("trend").innerHTML = cartona;
    setupWishlistButtons();
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("trend").innerHTML = "<p>Error loading products</p>";
  }
}

trendData();

// Wishlist functionality
function addToWishlist(e) {
  const button = e.target.closest('.fav');
  const item = button.closest('.item, .trend');
  const productId = item.dataset.productId;
  
  if (!button.classList.contains("wish-remove")) {
    const newItem = {
      id: productId,
      name: item.querySelector('h6').innerHTML,
      price: item.querySelector('.item-text-con span:first-child, h6:last-child').innerHTML,
      cat: item.querySelector('.small').innerHTML,
      imgSrc: item.querySelector('img').getAttribute('src'),
    };

    wish.push(newItem);
    localStorage.setItem("WishArray", JSON.stringify(wish));
    button.classList.add("wish-remove");
    button.innerHTML = "<i class='fa-solid fa-heart-crack'></i>";
  } else {
    wish = wish.filter(wishItem => wishItem.id !== productId);
    localStorage.setItem("WishArray", JSON.stringify(wish));
    button.classList.remove("wish-remove");
    button.innerHTML = "<i class='fa-solid fa-heart'></i>";
  }
  displayWish();
}

function setupWishlistButtons() {
  favBtns = document.querySelectorAll(".fav");
  favBtns.forEach((btn) => {
    const item = btn.closest('.item, .trend');
    const productId = item.dataset.productId;
    if (wish.some(wishItem => wishItem.id === productId)) {
      btn.classList.add("wish-remove");
      btn.innerHTML = "<i class='fa-solid fa-heart-crack'></i>";
    } else {
      btn.classList.remove("wish-remove");
      btn.innerHTML = "<i class='fa-solid fa-heart'></i>";
    }
    btn.addEventListener("click", addToWishlist);
  });
}

function displayWish() {
  console.log("Updating wishlist display. Current wishlist:", wish);
  numWish.innerHTML = wish.length;
}

displayWish();

// Call this function after loading products
function onProductsLoaded() {
  setupCartButtons();
  setupWishlistButtons();
}
