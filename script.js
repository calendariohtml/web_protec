
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    const phases = document.querySelector(".phases-section");
    const gallery = document.querySelector(".gallery-section");

    const phaseViews = document.querySelectorAll(".phase-view");
    const phaseButtons = document.querySelectorAll("[data-phase]");
    const homeButtons = document.querySelectorAll("[data-home]");

    const galleryLink = document.querySelector(
        '.navigation a[href="#galeria"]'
    );

    // Mostrar la página principal
    function showHome() {
        phaseViews.forEach(phase => {
            phase.hidden = true;
        });

        hero.hidden = false;
        phases.hidden = false;
        gallery.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Mostrar una fase específica
    function showPhase(id) {
        const selectedPhase = document.getElementById(id);

        if (!selectedPhase) return;

        hero.hidden = true;
        phases.hidden = true;
        gallery.hidden = true;

        phaseViews.forEach(phase => {
            phase.hidden = phase !== selectedPhase;
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Botones "Ver más"
    phaseButtons.forEach(button => {
        button.addEventListener("click", () => {
            showPhase(button.dataset.phase);
        });
    });

    // Botones "Inicio" y "Volver al inicio"
    homeButtons.forEach(button => {
        button.addEventListener("click", showHome);
    });

    // Acceso a la galería
    if (galleryLink) {
        galleryLink.addEventListener("click", event => {
            event.preventDefault();

            showHome();

            gallery.scrollIntoView({
                behavior: "smooth"
            });
        });
    }
});
