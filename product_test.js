

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
    filtered.reverse();
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