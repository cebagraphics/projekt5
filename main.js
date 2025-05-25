
  document.addEventListener("DOMContentLoaded", () => {

  // Søgefunktion (pop-up)
const searchIcon = document.querySelector(".search-icon");
  const popup = document.getElementById("search-popup");
  const closeBtn = document.getElementById("close-search-popup");

  if (searchIcon && popup && closeBtn) {
    searchIcon.addEventListener("click", (e) => {
      e.preventDefault();
      popup.classList.remove("hidden");
    });

    closeBtn.addEventListener("click", () => {
      popup.classList.add("hidden");
    });

    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.add("hidden");
      }
    });
  }

  // TOP BAR SOM SKIFTER TEKST 
    const messageHandler = {
        messages: [
            "Gaver til alle anledninger – sammensæt din egen gavekurv",
            "Bestil online – afhent i butikken eller få leveret direkte",
            "Støt lokalt – vi samarbejder med fynske leverandører",
            "Giv en gave med omtanke – pakket med kærlighed i Langeskov",
            "Håndplukkede delikatesser og interiør – fra Fyn til din hoveddør"
        ],
        index: 0,
        nextMessage() {
            const msg = this.messages[this.index];
            this.index = (this.index + 1) % this.messages.length;
            return msg;
        }
    };

    const el = document.getElementById("changing-text");
    if (!el) return;

    for (let i = 0; i < messageHandler.messages.length; i++) {
        console.log("Besked nr.", i + 1, ":", messageHandler.messages[i]);
    }

    function change() {
        el.classList.remove("show-text");
        setTimeout(() => {
            const newText = messageHandler.nextMessage();
            el.textContent = newText;
            console.log("Current message:", newText);
            el.classList.add("show-text");
        }, 50);
    }

    change();
    setInterval(change, 3500);
  });



// NAVBAR SOM FØRST ER GENNEMSIGTIG OG BAGEFTER SOLID
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar-frontpage");
  const searchIcon = document.querySelector(".search-icon-frontpage");
  const shopIcon = document.querySelector(".shop-icon-frontpage");

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

// NAVBAR TIL BURGERMENU
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



  // DRAGGABLE + CLICK IMAGE SLIDER - JOHANNE
  // Udgangspunkt i denne video: https://www.youtube.com/watch?app=desktop&v=7HPsdVQhpRw

const wrappers = document.querySelectorAll(".wrapper");

wrappers.forEach((wrapper) => {
const carousel = wrapper.querySelector(
  ".local-suppliers-section__carousel, .popular-giftbaskets-section__carousel, .product-categories-section__carousel");
  const prevBtn = wrapper.querySelector(".prev");
  const nextBtn = wrapper.querySelector(".next");

  let isDragging = false;
  let startX;
  let scrollLeft;

  const dragStart = (e) => {
    if (e.type === "mousedown" && e.button !== 0) return;
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX || e.touches?.[0]?.pageX;
    scrollLeft = carousel.scrollLeft;
    e.preventDefault();
  };

  const dragging = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches?.[0]?.pageX;
    const walk = x - startX;
    carousel.scrollLeft = scrollLeft - walk;
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  carousel.addEventListener("mousedown", dragStart);
  window.addEventListener("mousemove", dragging);
  window.addEventListener("mouseup", dragStop);


  carousel.addEventListener("touchstart", dragStart, { passive: false });
  carousel.addEventListener("touchmove", dragging, { passive: false });
  carousel.addEventListener("touchend", dragStop);

  carousel.addEventListener("wheel", function(e) {
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault(); // Kun blokér hvis brugeren ruller vandret
  }
}, { passive: false });

  carousel.classList.add("custom-drag-cursor");

  const img = carousel.querySelector("img");
  const imgWidth = img.offsetWidth + 15;

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -imgWidth, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: imgWidth, behavior: "smooth" });
  });


});










