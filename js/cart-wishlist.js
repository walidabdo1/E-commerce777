function setupCartButtons() {
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = this.closest('.item').dataset.productId;
        addToCart(productId);
      });
    });
  }
  
  function setupWishlistButtons() {
    const wishlistButtons = document.querySelectorAll('.wishlist-heart');
    wishlistButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = this.closest('.item').dataset.productId;
        addToWishlist(productId);
      });
    });
  }
  
  function addToCart(productId) {
    const productElement = document.querySelector(`.item[data-product-id="${productId}"]`);
    const product = {
      id: productId,
      name: productElement.querySelector('.pro_name').textContent,
      price: productElement.querySelector('.img-info span').textContent,
      imgSrc: productElement.querySelector('img').src,
      count: 1
    };
  
    let cart = JSON.parse(localStorage.getItem('CartArray')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === productId);
    
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].count += 1;
    } else {
      cart.push(product);
    }
  
    localStorage.setItem('CartArray', JSON.stringify(cart));
    updateCartCount();
    alert('تمت إضافة المنتج إلى سلة التسوق!');
  }
  
  function addToWishlist(productId) {
    const productElement = document.querySelector(`.item[data-product-id="${productId}"]`);
    const product = {
      id: productId,
      name: productElement.querySelector('.pro_name').textContent,
      price: productElement.querySelector('.img-info span').textContent,
      imgSrc: productElement.querySelector('img').src
    };
  
    let wishlist = JSON.parse(localStorage.getItem('WishArray')) || [];
    const existingProductIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingProductIndex === -1) {
      wishlist.push(product);
      localStorage.setItem('WishArray', JSON.stringify(wishlist));
      updateWishlistCount();
      alert('تمت إضافة المنتج إلى قائمة الرغبات!');
    } else {
      alert('هذا المنتج موجود بالفعل في قائمة الرغبات الخاصة بك!');
    }
  }
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('CartArray')) || [];
    const cartCount = cart.reduce((total, item) => total + item.count, 0);
    document.querySelector('.num-cart').textContent = cartCount;
  }
  
  function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('WishArray')) || [];
    document.querySelector('.num-wish').textContent = wishlist.length;
  }
  
  // تحديث العدادات عند تحميل الصفحة
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateWishlistCount();
  });
  