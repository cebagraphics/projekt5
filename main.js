
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
        "Støt lokalt – vi samarbejder med fynske producenter",
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
            index = (index + 1) % messages.length;
            el.classList.add("show-text");
        }, 50);
    }

    change();
    setInterval(change, 3500);
});


    // TOP BAR SOM SKIFTER TEKST SLUT


