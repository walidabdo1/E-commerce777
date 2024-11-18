
const wishList = document.querySelector(".wishlist");
const clearBtn = document.querySelector(".clearBtn");
const noWish = document.querySelector(".noWish");
const acceptUnFavAll = document.querySelector(".acceptUnFavAll");
let wish = JSON.parse(localStorage.getItem("WishArray")) || [];

function updateWishlistDisplay() {
  if (wish.length < 1) {
    clearBtn.classList.add("d-none");
    noWish.classList.remove("d-none");
  } else {
    displayWish();
    noWish.classList.add("d-none");
    clearBtn.classList.remove("d-none");
  }
}

updateWishlistDisplay();
function displayWish() {
  let box = "";
  for (let i = 0; i < wish.length; i++) {
    box += `
      <li class="row justify-content-between py-3 align-items-center border-1 border-bottom">
        <div class="item-details d-flex gap-4 flex-column flex-md-row align-items-center text-center text-md-start col-4">
          <div class="img-cart-container">
            <img src="${wish[i].imgSrc}" alt="" />
          </div>
          <div class="item-text-info">
            <h5>${wish[i].name}</h5>
            <p class="text-secondary">${wish[i].cat}</p>
          </div>
        </div>
        <div class="col-3 text-center text-md-start">${wish[i].price}</div>
        <div class="col-2 d-flex flex-column flex-md-row align-items-center text-center text-md-start">
          <button class="btn btn-danger crudBtn deleBtn" onClick="deleItemWish(${i})">
            <i class='fa-solid fa-heart-crack'></i>
          </button>
        </div>
      </li>
    `;
  }
  wishList.innerHTML = box;
}

function deleItemWish(i) {
  wish.splice(i, 1);
  localStorage.setItem("WishArray", JSON.stringify(wish));
  displayWish();
  updateWishlistDisplay();
  updateWishlistCount();
}

acceptUnFavAll.addEventListener("click", () => {
  alert("Wishlist cleared");
  
  clearWish();
});

// Update wishlist count in the header
function updateWishlistCount() {
  const numWish = document.querySelector(".num-wish");
  if (numWish) {
    numWish.textContent = wish.length.toString();
  }
}

// Call this function whenever the wishlist is modified
function onWishlistChanged() {
  displayWish();
  updateWishlistCount();
  updateWishlistDisplay();
}

// Initial setup
onWishlistChanged();

// Function to add item to wishlist (called from script.js)
function addToWishlist(productId, name, price, cat, imgSrc) {
  const newItem = { id: productId, name, price, cat, imgSrc };
  wish.push(newItem);
  localStorage.setItem("WishArray", JSON.stringify(wish));
  onWishlistChanged();
}

// Function to remove item from wishlist (called from script.js)
function removeFromWishlist(productId) {
  wish = wish.filter(item => item.id !== productId);
  localStorage.setItem("WishArray", JSON.stringify(wish));
  onWishlistChanged();
}

// Export functions to be used in script.js
window.wishlistFunctions = {
  addToWishlist,
  removeFromWishlist,
  updateWishlistCount
};




// //  Aside loading Section  //
const loadingDiv = document.querySelector(".loading");

window.onload = function () {
  loadingDiv.classList.replace("opacity-1", "opacity-0");

  setTimeout(() => {
    loadingDiv.classList.add("d-none");
  }, 500);
};

function clearWish() {
  wish = [];
  localStorage.setItem("WishArray", JSON.stringify(wish));
  clearBtn.classList.add("d-none");
  noWish.classList.remove("d-none");
  displayWish();
}
acceptUnFavAll.addEventListener("click", () => {
  alert("Clear Done");
  clearWish();
});














