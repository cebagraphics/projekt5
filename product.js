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
const categoryButtons = document.querySelectorAll(".image-circle");

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

// Første load
renderProducts();
