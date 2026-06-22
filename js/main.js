// =====================
// CART STATE
// =====================
let cart = [];
let cartCount = 0;

// =====================
// NAVBAR TOGGLE
// =====================
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// =====================
// CART DRAWER
// =====================
function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  drawer.classList.toggle('open');
  overlay.classList.toggle('open');
}

function addToCart(btn) {
  const card = btn.closest('.product-card');
  const name = card.querySelector('h4').textContent;
  const price = card.querySelector('.current').textContent;
  const icon = card.querySelector('.img-placeholder i').className;

  btn.classList.add('added');
  btn.innerHTML = '<i class="fas fa-check"></i> Added!';
  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = '<i class="fas fa-shopping-bag"></i> Add to Cart';
  }, 2000);

  cart.push({ name, price, icon, id: Date.now() });
  cartCount++;
  updateCartBadge();
  renderCart();
  showToast(`"${name}" added to cart 🛍️`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  cartCount = Math.max(0, cartCount - 1);
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  document.querySelectorAll('.nav-actions .badge').forEach((b, i) => {
    if (i === 1) b.textContent = cartCount;
  });
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p></div>';
    footer.style.display = 'none';
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    const price = parseFloat(item.price.replace('$', ''));
    total += price;
    return `
      <div class="cart-item">
        <div class="cart-item-img"><i class="${item.icon}"></i></div>
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <span>${item.price}</span>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
      </div>`;
  }).join('');

  document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
  footer.style.display = 'block';
}

// =====================
// WISHLIST
// =====================
function toggleWishlist() {
  showToast('Wishlist coming soon! ❤️');
}

// =====================
// SEARCH
// =====================
function toggleSearch() {
  showToast('Search feature coming soon! 🔍');
}

// =====================
// PRODUCT FILTER
// =====================
function filterProducts(tag, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.product-card').forEach(card => {
    const tags = card.dataset.tag || '';
    if (tag === 'all' || tags.includes(tag)) {
      card.classList.remove('hidden');
      card.style.animation = 'fadeIn 0.3s ease forwards';
    } else {
      card.classList.add('hidden');
    }
  });
}

// =====================
// COUNTDOWN TIMER
// =====================
function startCountdown() {
  let h = 8, m = 24, s = 36;
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('mins');
  const secsEl = document.getElementById('secs');
  if (!hoursEl) return;

  setInterval(() => {
    s--;
    if (s < 0) { s = 59; m--; }
    if (m < 0) { m = 59; h--; }
    if (h < 0) { h = 23; m = 59; s = 59; }
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// =====================
// NEWSLETTER
// =====================
function subscribeNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  showToast(`Subscribed successfully! Welcome 🎉`);
  input.value = '';
}

// =====================
// TOAST
// =====================
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// =====================
// NAVBAR SCROLL
// =====================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.style.background = window.scrollY > 50
    ? 'rgba(15,14,23,0.98)'
    : 'rgba(15,14,23,0.85)';
});

// =====================
// INIT
// =====================
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();

  // Animate cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .category-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s';
    observer.observe(el);
  });
});
