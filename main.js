document.addEventListener("DOMContentLoaded", () => {
  // NAVBAR SOM FØRST ER GENNEMSIGTIG OG BAGEFTER SOLID
  const navbar = document.querySelector(".navbar");
  const searchIcon = document.querySelector(".search-icon");
  const shopIcon = document.querySelector(".shop-icon");

  window.addEventListener("scroll", function () {
    if (!navbar || !searchIcon || !shopIcon) return;

    if (window.scrollY > 1) {
      navbar.classList.add("scrolled", "solid");
      navbar.classList.remove("transparent");
      searchIcon.src = "img/search-icon_black.png";
      shopIcon.src = "img/shop-icon_black.png";
    } else {
      navbar.classList.remove("scrolled", "solid");
      navbar.classList.add("transparent");
      searchIcon.src = "img/search_icon-white.png";
      shopIcon.src = "img/shop_icon-white.png";
    }
  });

  // SMOOTH SCROLL PÅ FORSIDE PIL
  const arrow = document.querySelector('.arrow');
  if (arrow) {
    arrow.addEventListener('click', function () {
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }

  // TOP BAR SOM SKIFTER TEKST
  const messages = [
    "Gaver til alle anledninger – sammensæt din egen gavekurv",
    "Bestil online – afhent i butikken eller få leveret direkte",
    "Støt lokalt – vi samarbejder med fynske leverandører",
    "Giv en gave med omtanke – pakket med kærlighed i Langeskov",
    "Håndplukkede delikatesser og interiør – fra Fyn til din hoveddør"
  ];
  let index = 0;
  const changingText = document.getElementById("changing-text");

  function changeText() {
    if (!changingText) return;
    changingText.classList.remove("show-text");
    setTimeout(() => {
      changingText.textContent = messages[index];
      index = (index + 1) % messages.length;
      changingText.classList.add("show-text");
    }, 50);
  }

  if (changingText) {
    changeText();
    setInterval(changeText, 3500);
  }

  // GALLERI MED LEVERANDØRER PÅ FORSIDE
  const carousel = document.querySelector(".carousel");
  if (carousel) {
    let isDragging = false;
    let startX;
    let scrollLeft;

    const dragStart = (e) => {
      if (e.type === "mousedown" && e.button !== 0) return;
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      scrollLeft = carousel.scrollLeft;
      e.preventDefault();
    };

    const dragging = (e) => {
      if (!isDragging) return;
      const x = e.pageX;
      const walk = x - startX;
      carousel.scrollLeft = scrollLeft - walk;
    };

    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };

    const blockScroll = (e) => {
      e.preventDefault();
    };

    carousel.addEventListener("mousedown", dragStart);
    window.addEventListener("mousemove", dragging);
    window.addEventListener("mouseup", dragStop);
    carousel.addEventListener("wheel", blockScroll, { passive: false });
    carousel.classList.add("custom-drag-cursor");

    // Pilene
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const img = carousel.querySelector("img");

    if (img && prevBtn && nextBtn) {
      const imgWidth = img.offsetWidth + 13;

      prevBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: -imgWidth, behavior: "smooth" });
      });

      nextBtn.addEventListener("click", () => {
        carousel.scrollBy({ left: imgWidth, behavior: "smooth" });
      });
    }
  }

  
  // KATEGORI FILTRERING OG PAGINATION PÅ PRODUKTSIDE
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
    ];

  const productsPerPage = 16;
  let currentPage = 1;
  let activeCategory = "alle";

  const productGrid = document.querySelector(".product-grid");
  const pagination = document.querySelector(".pagination");
  const categoryButtons = document.querySelectorAll(".image-circle");

  // Hovedrender-funktion
  function renderProducts() {
    productGrid.innerHTML = "";

    // Filtrering
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

  // Pagination rendering
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

  // Pagination klik
  pagination.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      e.preventDefault();
      currentPage = parseInt(e.target.dataset.page);
      renderProducts();
    }
  });

  // Kategori-filtrering
  categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
      const selected = this.getAttribute("data-category");

      if (this.classList.contains("active")) {
        // Reset
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        activeCategory = "alle";
      } else {
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        activeCategory = selected;
      }

      currentPage = 1; // Start forfra ved filter
      renderProducts();
    });
  });

  // Første rendering
  renderProducts();

});
