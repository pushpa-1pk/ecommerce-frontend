const productId = new URLSearchParams(window.location.search).get("id");
const productDetailContainer = document.getElementById("product-detail");
const loader = document.getElementById("loader");

if (!productId) {
  loader.textContent = "Invalid product ID.";
} else {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
      loader.style.display = "none";
      productDetailContainer.innerHTML = `
        <div class="col-md-6">
          <img src="${product.image}" class="img-fluid border" alt="${product.title}" style="max-height: 500px;">
        </div>
        <div class="col-md-6">
          <h2>${product.title}</h2>
          <p class="text-muted">${product.category}</p>
          <p>${product.description}</p>
          <h4 class="text-primary">₹${product.price}</h4>

          <div class="mb-3">
            <label for="variation">Size</label>
            <select class="form-select" id="variation">
              <option value="Small">Small</option>
              <option value="Medium" selected>Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div class="mb-3 d-flex align-items-center">
            <label class="me-2">Qty:</label>
            <button class="btn btn-outline-secondary" onclick="updateQty(-1)">−</button>
            <input id="qty" type="text" value="1" class="form-control mx-2" style="width: 60px;" readonly>
            <button class="btn btn-outline-secondary" onclick="updateQty(1)">+</button>
          </div>

          <button class="btn btn-success" onclick='addToCart(${product.id})'>Add to Cart</button>
        </div>
      `;
    })
    .catch(error => {
      loader.textContent = "Error loading product.";
      console.error(error);
    });
}

// Quantity logic
function updateQty(change) {
  const qtyInput = document.getElementById("qty");
  let qty = parseInt(qtyInput.value);
  qty = Math.max(1, qty + change);
  qtyInput.value = qty;
}

// Add to cart logic
function addToCart(id) {
  const size = document.getElementById("variation").value;
  const qty = parseInt(document.getElementById("qty").value);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Optional: Check if already in cart
  const existing = cart.find(item => item.id === id && item.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, size, qty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart!");
}

// Place this in both product.js and app.js (or in a shared script)
const cartCount = JSON.parse(localStorage.getItem("cart") || "[]").length;
document.querySelectorAll('#cart-count').forEach(el => el.textContent = cartCount);
