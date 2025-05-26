// KONTAKTFORMULAR
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Submit event registreret!");

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name) {
            alert("Udfyld venligst dit navn.");
            return;
        }

        if (!email) {
            alert("Udfyld venligst din email.");
            return;
        }

        // Enkel email-validering
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Indtast venligst en gyldig emailadresse.");
            return;
        }

        if (!message) {
            alert("Skriv venligst en besked.");
            return;
        }

        // Hvis alt er okay:
        alert("Tak for din besked, " + name + "! Vi vender tilbage hurtigst muligt.");
        form.reset();
    });
});