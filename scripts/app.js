document.addEventListener("DOMContentLoaded", () => {
  // ==== Navbar Collapse Functionality ====
  const toggler = document.querySelector(".navbar-toggler");
  const navCollapse = document.querySelector("#mainNavbar");
  const navLinks = document.querySelectorAll(".nav-link");

  const bsCollapse = new bootstrap.Collapse(navCollapse, {
    toggle: false,
  });

  toggler.addEventListener("click", function () {
    if (navCollapse.classList.contains("show")) {
      bsCollapse.hide();
    } else {
      bsCollapse.show();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 991 && navCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });

  // ==== Product Grid Rendering ====
  const loader = document.getElementById("loader");
  const grid = document.querySelector(".product-grid");

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      loader.style.display = "none";
      renderProducts(data);
    })
    .catch((err) => {
      loader.textContent = "Failed to load products.";
      console.error("Error:", err);
    });

  function renderProducts(products) {
    grid.innerHTML = "";
    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
          <button>Add to Cart</button>
        </a>
      `;
      grid.appendChild(card);
    });
  }

  // Place this in both product.js and app.js (or in a shared script)
const cartCount = JSON.parse(localStorage.getItem("cart") || "[]").length;
document.querySelectorAll('#cart-count').forEach(el => el.textContent = cartCount);


  // ==== Update Cart Count ====
  // const cartCount = document.getElementById("cart-count");
  // if (cartCount) {
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];
  //   cartCount.textContent = cart.length;
  // }
});

