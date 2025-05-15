
  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
    }
  });

  window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const searchIcon = document.querySelector(".search-icon");
  const shopIcon = document.querySelector(".shop-icon");

  if (window.scrollY > 50) {
    navbar.classList.remove("transparent");
    navbar.classList.add("solid");

    // Skift til sorte ikoner
    searchIcon.src = "img/search-icon_black.png";
    shopIcon.src = "img/shop-icon_black.png";
  } else {
    navbar.classList.remove("solid");
    navbar.classList.add("transparent");

    // Skift tilbage til hvide ikoner
    searchIcon.src = "img/search_icon-white.png";
    shopIcon.src = "img/shop_icon-white.png";
  }
});


  
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });



  document.querySelector('.arrow').addEventListener('click', function () {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });


  // TOP BAR SOM SKIFTER TEKST START

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

    // TOP BAR SOM SKIFTER TEKST SLUT

// Galleri med leverandører på forside
const carousel = document.querySelector(".carousel");

let isDragging = false;
let startX;
let scrollLeft;

// Start drag - kun med venstre museknap
const dragStart = (e) => {
  if (e.type === "mousedown" && e.button !== 0) return;

  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  scrollLeft = carousel.scrollLeft;

  // Stopper native scroll hvis man forsøger at bruge touchpad
  e.preventDefault();
};

// Drag bevægelse
const dragging = (e) => {
  if (!isDragging) return;

  const x = e.pageX;
  const walk = x - startX;
  carousel.scrollLeft = scrollLeft - walk;
};

// Stop drag
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

// Blokér normal scroll (touchpad, scrollhjul)
const blockScroll = (e) => {
  e.preventDefault();
};

// Event listeners
carousel.addEventListener("mousedown", dragStart);
window.addEventListener("mousemove", dragging);
window.addEventListener("mouseup", dragStop);
carousel.addEventListener("wheel", blockScroll, { passive: false });

// Bonus: sørg for korrekt cursor (valgfrit)
carousel.classList.add("custom-drag-cursor");
