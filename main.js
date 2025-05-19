// NAVBAR SOM FØRST ER GENNEMSIGTIG OG BAGEFTER SOLID
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const searchIcon = document.querySelector(".search-icon");
  const shopIcon = document.querySelector(".shop-icon");

  if (window.scrollY > 1) {
    navbar.classList.add("scrolled");
    navbar.classList.remove("transparent");
    navbar.classList.add("solid");

    // Skift til sorte ikoner
    searchIcon.src = "img/search-icon_black.png";
    shopIcon.src = "img/shop-icon_black.png";
  } else {
    navbar.classList.remove("scrolled");
    navbar.classList.add("transparent");
    navbar.classList.remove("solid");

    // Skift tilbage til hvide ikoner
    searchIcon.src = "img/search_icon-white.png";
    shopIcon.src = "img/shop_icon-white.png";
  }
});

// Nav
        function showNav__sidepanel(){
            const nav__sidepanel = document.querySelector('.nav__sidepanel')
            nav__sidepanel.style.display = 'flex'}
        function hideNav__sidepanel(){
            const nav__sidepanel = document.querySelector('.nav__sidepanel')
            nav__sidepanel.style.display = 'none'}     


// SMOOTH SCROLL PÅ FORSIDE PIL
  document.querySelector('.arrow').addEventListener('click', function () {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });



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
  });

  

// Find alle wrappers (som hver indeholder én carousel + pile)
const wrappers = document.querySelectorAll(".wrapper");

wrappers.forEach((wrapper) => {
  const carousel = wrapper.querySelector(".local-suppliers-section__carousel, .popular-giftbaskets-section__carousel");
  const prevBtn = wrapper.querySelector(".prev");
  const nextBtn = wrapper.querySelector(".next");

  let isDragging = false;
  let startX;
  let scrollLeft;

  // Mouse drag start
  const dragStart = (e) => {
    if (e.type === "mousedown" && e.button !== 0) return;
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX || e.touches?.[0]?.pageX;
    scrollLeft = carousel.scrollLeft;
    e.preventDefault();
  };

  // Mouse/touch move
  const dragging = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches?.[0]?.pageX;
    const walk = x - startX;
    carousel.scrollLeft = scrollLeft - walk;
  };

  // Mouse/touch end
  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const blockScroll = (e) => {
    e.preventDefault();
  };

  // Mouse events
  carousel.addEventListener("mousedown", dragStart);
  window.addEventListener("mousemove", dragging);
  window.addEventListener("mouseup", dragStop);

  // Touch events
  carousel.addEventListener("touchstart", dragStart, { passive: false });
  carousel.addEventListener("touchmove", dragging, { passive: false });
  carousel.addEventListener("touchend", dragStop);

  carousel.addEventListener("wheel", blockScroll, { passive: false });

  carousel.classList.add("custom-drag-cursor");

  // Scroll på klik
  const img = carousel.querySelector("img");
  const imgWidth = img.offsetWidth + 15;

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -imgWidth, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: imgWidth, behavior: "smooth" });
  });
});







