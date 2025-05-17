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

  // JS-FILTRERING BASERET PÅ DATA-CATEGORY
 const categoryButtons = document.querySelectorAll('.image-circle');
  const productCards = document.querySelectorAll('.product-card');

  let activeCategory = 'alle'; // Starter med at vise alle produkter

  categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
      const selectedCategory = this.getAttribute('data-category');

      // Hvis man klikker på den samme kategori igen → reset til "alle"
      const isAlreadyActive = this.classList.contains('active');

      if (isAlreadyActive) {
        // Nulstil aktiv kategori
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        activeCategory = 'alle';
      } else {
        // Sæt ny aktiv kategori
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        activeCategory = selectedCategory;
      }

      // Filtrér produkterne
      productCards.forEach(card => {
        const img = card.querySelector('img');
        const productCategory = img?.getAttribute('data-category');
        if (!productCategory) return;

        card.style.display = (activeCategory === productCategory || activeCategory === 'alle')
          ? 'block'
          : 'none';
      });
    });
  });
});
