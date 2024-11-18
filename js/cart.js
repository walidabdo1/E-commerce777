//  Aside loading Section  //
const loadingDiv = document.querySelector(".loading");

window.onload = function () {
  loadingDiv.classList.replace("opacity-1", "opacity-0");

  setTimeout(() => {
    loadingDiv.classList.add("d-none");
  }, 500);
};
// cart items //

const cartList = document.querySelector(".cartlist");
const totalPriceEle = document.querySelector(".total-price");
const payBtn = document.querySelector(".payBtn");
const noCart = document.querySelector(".noCart");
const acceptPay = document.querySelector(".acceptPay");
let cart = JSON.parse(localStorage.getItem("CartArray")) || [];
let totalPrice = 0;
if (cart.length < 1) {
  payBtn.classList.add("d-none");
  noCart.classList.remove("d-none");
} else {
  displayCart();
  noCart.classList.add("d-none");
  payBtn.classList.remove("d-none");
}

function displayCart() {
  let box = "";
  totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    box += `
      <li
              class="row justify-content-between py-3 align-items-center border-1 border-bottom"
            >
              <div
                class="item-details d-flex gap-4 flex-column flex-md-row align-items-center col-4 text-center text-md-start"
              >
                <div class="img-cart-container">
                  <img
                    src="${cart[i].imgSrc}"
                    alt="${cart[i].name}"
                  />
                </div>
                <div class="item-text-info">
                  <h5>${cart[i].name}</h5>
                  <p class="text-secondary">cat</p>
                </div>
              </div>
              <div class="col-2">${cart[i].price}</div>
              <div
                class="col-3 d-flex flex-column flex-md-row align-items-center text-center text-md-start"
              >
                <input
                  type="number"
                  class="form-control inputCount  text-center w-100"
                  value="${cart[i].count}"
                  disabled
                />
                <button class="btn btn-warning crudBtn editBtn" onClick="editItem(${i})">edit</button>
                <button class="btn btn-danger crudBtn deleBtn" onClick="deleItem(${i})" ><i class="fa-solid fa-trash-can"></i></button>
              </div>
              <div class="col-2 text-center text-md-start">$${
                cart[i].price.substring(1) * cart[i].count
              }</div>
            </li>
    `;
    totalPrice += cart[i].price.substring(1) * cart[i].count;
  }
  cartList.innerHTML = box;
  totalPriceEle.innerHTML = `Total Price Is : <b class="text-success">${totalPrice} $</b>    `;
}

function deleItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("CartArray", JSON.stringify(cart));
  inputsCount.splice(i, 1);
  btnsEdit.splice(i, 1);
  displayCart();
  if (cart.length < 1) {
    resetCart();
  }
}
let inputsCount = [];
let btnsEdit = [];


function editItem(i) {
  var input = document.querySelectorAll(".inputCount")[i];  
  var btn = document.querySelectorAll(".editBtn")[i]; 

  input.disabled = false; // اجعل الحقل قابل للتعديل
  btn.innerHTML = "Done"; // تغيير النص إلى "Done"
  input.focus(); // ضع التركيز على الحقل

  input.onblur = function () {
    cart[i].count = +input.value ;
    localStorage.setItem("CartArray", JSON.stringify(cart));  

    input.disabled = true; 
    btn.innerHTML = "Edit";  

    displayCart(); 
  };
}



function resetCart() {
  cart = [];
  inputsCount = [];
  btnsEdit = [];
  localStorage.setItem("CartArray", JSON.stringify(cart));
  payBtn.classList.add("d-none");
  noCart.classList.remove("d-none");
  displayCart();
}


acceptPay.addEventListener("click", () => {
  alert("Pay Done");
  resetCart();
});
