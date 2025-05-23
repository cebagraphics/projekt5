 
 // TOP BAR SOM SKIFTER TEKST 
  document.addEventListener("DOMContentLoaded", () => {
      const messages = [
          "Gaver til alle anledninger – sammensæt din egen gavekurv",
          "Bestil online – afhent i butikken eller få leveret direkte",
          "Støt lokalt – vi samarbejder med fynske leverandører",
          "Giv en gave med omtanke – pakket med kærlighed i Langeskov",
          "Håndplukkede delikatesser og interiør – fra Fyn til din hoveddør"
      ];

      let index = 0;
      const el = document.getElementById("changing-text");
      if (!el) return;

      function change() {
          el.classList.remove("show-text");
          setTimeout(() => {
              el.textContent = messages[index];
              console.log("Current message:", messages[index]);
              index = (index + 1) % messages.length;
              el.classList.add("show-text");
          }, 50);
      }

      change();
      setInterval(change, 3500);


const allProducts = [
      { title: "Summerbird heartmade", price: "229,95 kr", image: "img/summerbird-heartmade.png", category: "spise" },
      { title: "Speedtsberg vase blomst", price: "129,95 kr", image: "img/vase-blomst.png", category: "interiør" },
      { title: "Summerbird flødeboller 6 stk", price: "89,95 kr", image: "img/summerbird-flodeboller.png", category: "spise" },
      { title: "SpicebySpice likør n19", price: "149,95 kr", image: "img/spicebyspice.png", category: "drikke" },
      { title: "Speedtsberg keramik flag", price: "149,95 kr", image: "img/flag.png", category: "interiør" },
      { title: "Summerbird collection 48 stk", price: "229,95 kr", image: "img/summerbird-boks.png", category: "spise" },
      { title: "Spring Copenhagen Frost", price: "449,95 kr", image: "img/springcopenhagen-pingvin.png", category: "interiør" },
      { title: "Speedtsberg vase", price: "59,95 kr", image: "img/vase.png", category: "interiør" },
      { title: "Spring Copenhagen Peanut", price: "399,95 kr", image: "img/springcopenhagen-egern.png", category: "interiør" },
      { title: "Kær løgchutney", price: "49,95 kr", image: "img/log-chutney.png", category: "spise" },
      { title: "Vase opsætning", price: "149,95 kr", image: "img/vase-opsaetning.png", category: "interiør" },
      { title: "Spring Copenhagen Svaneunge", price: "399,95 kr", image: "img/springcopenhagen-svane.png", category: "interiør" },
      { title: "Speedtsberg svane med krone", price: "69,95 kr", image: "img/svane-med-krone.png", category: "interiør" },
      { title: "Summerbird praliné cocoa 100g", price: "89,95 kr", image: "img/summerbird-praline.png", category: "spise" },
      { title: "Spring Copenhagen Clever", price: "299,95 kr", image: "img/springccopenhagen-ugle.png", category: "interiør" },
      { title: "SpicebySpice baconsalt", price: "89,95 kr", image: "img/spicebyspice-baconsalt.png", category: "spise" },
      { title: "Meraki duftpinde - Fresh linen", price: "189,95 kr", image: "img/merakiduftpinde.jpg", category: "andet" },
      { title: "Meraki badeolie - Velvet mood", price: "220 kr", image: "img/merakibadeolie.jpg.webp", category: "andet" },
    ];

const productsPerPage = 16;
let currentPage = 1;
let activeCategory = "alle";

const productGrid = document.querySelector(".product-grid");
  const pagination = document.querySelector(".pagination");
  const categoryButtons = document.querySelectorAll(".category__image-circle");

  function renderProducts() {
    productGrid.innerHTML = "";

    const filtered = activeCategory === "alle"
      ? allProducts
      : allProducts.filter(p => p.category === activeCategory);

    const totalPages = Math.ceil(filtered.length / productsPerPage);
    if (currentPage > totalPages) currentPage = 1;

    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const pageProducts = filtered.slice(start, end);

    pageProducts.forEach(product => {
      const html = `
        <div class="product-card">
          <div class="product-box">
            <img src="${product.image}" alt="${product.title}" data-category="${product.category}">
           <button class="add-to-cart">+</button>
            </div>
          <p class="product-title">${product.title}</p>
          <p class="product-price">${product.price}</p>
        </div>
      `;
      productGrid.insertAdjacentHTML("beforeend", html);
    });

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = i;
      link.dataset.page = i;
      link.classList.toggle("active", i === currentPage);
      pagination.appendChild(link);
    }
  }

  categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
      const selected = this.getAttribute("data-category");

      if (this.classList.contains("active")) {
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        activeCategory = "alle";
      } else {
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        activeCategory = selected;
      }

      currentPage = 1;
      renderProducts();
    });
  });

  pagination.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      e.preventDefault();
      currentPage = parseInt(e.target.dataset.page);
      renderProducts();
    }
  });

  productGrid.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
      const productCard = e.target.closest(".product-card, .giftwrapping-card");
      const productTitle = productCard.querySelector(".product-title").textContent;
    }
  });

  // Første load
  renderProducts();



// KURV
const cartPopup = document.getElementById("cart-popup");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const shopIcon = document.getElementById("shop-icon");

let cart = [];

// Fælles funktion til at håndtere tilføjelse
function handleAddToCartClick(e) {
  if (e.target.classList.contains("add-to-cart")) {
    const card = e.target.closest(".product-card, .giftwrapping-card");
    if (!card) return;

    // Automatisk vælg 'Ja tak, pak hele min ordre' hvis det er gaveindpakning
    if (card.classList.contains("giftwrapping-card")) {
    const wrapCheckbox = document.getElementById("giftwrap-checkbox");
    if (wrapCheckbox) {
        wrapCheckbox.checked = true;
    }
    }

    const title = card.querySelector(".product-title").textContent;
    const priceText = card.querySelector(".product-price").textContent;
    const price = parseFloat(priceText.replace(",", ".").replace(" kr", ""));

    const existing = cart.find(item => item.title === title);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ title, price, quantity: 1 });
    }

    updateCart();
    showCart();
  }
}

// Lyt på begge grids
const giftGrid = document.querySelector(".giftwrapping-grid");

if (productGrid) {
  productGrid.addEventListener("click", handleAddToCartClick);
}

if (giftGrid) {
  giftGrid.addEventListener("click", handleAddToCartClick);
}

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.title}</span>
      <div class="item-controls">
        <button class="decrease" data-index="${index}">−</button>
        <span>${item.quantity}</span>
        <button class="increase" data-index="${index}">+</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2).replace(".", ",") + " kr";
}

cartItems.addEventListener("click", function (e) {
  const index = parseInt(e.target.dataset.index);

  if (e.target.classList.contains("increase")) {
    cart[index].quantity += 1;
    updateCart();
  }

  if (e.target.classList.contains("decrease")) {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    updateCart();
  }
});

function showCart() {
  cartPopup.classList.remove("hidden");
  setTimeout(() => cartPopup.classList.add("show"), 10);
}

cartPopup.addEventListener("click", function (e) {
  e.stopPropagation(); // Undgå at klik inde i kurven lukker popup’en
});

document.addEventListener("click", function (e) {
  const isInsideCart = e.target.closest("#cart-popup");
  const isAddToCart = e.target.classList.contains("add-to-cart");

  if (!isInsideCart && !isAddToCart && cartPopup.classList.contains("show")) {
    cartPopup.classList.remove("show");
    setTimeout(() => cartPopup.classList.add("hidden"), 300);
  }
});

const customMessageCheckbox = document.getElementById("custom-message-checkbox");
const customMessageTextarea = document.getElementById("custom-message");

customMessageCheckbox.addEventListener("change", function () {
  if (this.checked) {
    customMessageTextarea.classList.remove("hidden");
  } else {
    customMessageTextarea.classList.add("hidden");
  }
});


// 🛒 Klik på shop-ikonet viser kurv-popup
shopIcon.addEventListener("click", function (event) {
  event.preventDefault();
  cartPopup.classList.remove("hidden");
  cartPopup.classList.add("show");
});

});

let sortering = "Standard"; // Default sortering

// Filter-knap og dropdown
const filterToggle = document.getElementById("filterToggle");
const filterDropdown = document.getElementById("filterDropdown");
const filterSelect = document.getElementById("filterSelect");

filterToggle.addEventListener("click", () => {
  filterDropdown.classList.toggle("hidden");
});

filterSelect.addEventListener("change", () => {
  activeCategory = filterSelect.value;
  currentPage = 1;
  renderProducts();
});

// Lyt til kategori-knapper
categoryButtons.forEach(button => {
  button.addEventListener("click", function () {
    const selected = this.getAttribute("data-category");

    if (this.classList.contains("active")) {
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      activeCategory = "alle";
    } else {
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
      activeCategory = selected;
    }

    currentPage = 1;
    renderProducts();
  });
});

// Lyt til sorteringsdropdown
const sortSelect = document.getElementById("sorter");
sortSelect.addEventListener("change", function () {
  sortering = this.value;
  renderProducts();
});

// Pris-konvertering
function parsePrice(priceString) {
  return parseFloat(priceString.replace("kr", "").replace(",", ".").trim());
}

// Opdateret render-funktion med sortering
function renderProducts() {
  productGrid.innerHTML = "";

  // Filter først
  let filtered = activeCategory === "alle"
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  // Sortér bagefter
  if (sortering === "Pris: Lav til høj") {
    filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (sortering === "Pris: Høj til lav") {
    filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  } else if (sortering === "Nyeste") {
    filtered.reverse(); // Simpel logik for "nyeste"
  }

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  if (currentPage > totalPages) currentPage = 1;

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageProducts = filtered.slice(start, end);

  pageProducts.forEach(product => {
    const html = `
      <div class="product-card">
        <div class="product-box">
          <img src="${product.image}" alt="${product.title}" data-category="${product.category}">
         <button class="add-to-cart">+</button>
          </div>
        <p class="product-title">${product.title}</p>
        <p class="product-price">${product.price}</p>
      </div>
    `;
    productGrid.insertAdjacentHTML("beforeend", html);
  });

  renderPagination(totalPages);
}