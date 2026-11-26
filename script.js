document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    const phases = document.querySelector(".phases-section");
    const gallery = document.querySelector(".gallery-section");
    const phaseViews = [...document.querySelectorAll(".phase-view")];
    const phaseButtons = document.querySelectorAll("[data-phase]");
    const homeButtons = document.querySelectorAll("[data-home]");
    const galleryLink = document.querySelector("[data-gallery-link]");

    function showHome() {
        phaseViews.forEach(phase => phase.hidden = true);
        hero.hidden = false;
        phases.hidden = false;
        gallery.hidden = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function showPhase(id) {
        const selected = document.getElementById(id);
        if (!selected) return;
        hero.hidden = true;
        phases.hidden = true;
        gallery.hidden = true;
        phaseViews.forEach(phase => phase.hidden = phase !== selected);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    phaseButtons.forEach(button => {
        button.addEventListener("click", () => showPhase(button.dataset.phase));
    });
    homeButtons.forEach(button => button.addEventListener("click", showHome));

    if (galleryLink) {
        galleryLink.addEventListener("click", event => {
            event.preventDefault();
            showHome();
            requestAnimationFrame(() => gallery.scrollIntoView({ behavior: "smooth", block: "start" }));
        });
    }

    // Biblioteca fotográfica: cada imagen tiene título, categoría y descripción.
    const photos = [
        { src: "imagenes/comunidad-entrada..png", alt: "Entrada de Las Manuelas", category: "COMUNIDAD", title: "Entrada principal", description: "Acceso a la Urbanización Las Manuelas, en San José de Barlovento." },
        { src: "imagenes/comunidad-calles..jpeg", alt: "Calles de Las Manuelas", category: "COMUNIDAD", title: "Calles de la comunidad", description: "Vista de las calles y de la distribución de la urbanización." },
        { src: "imagenes/comunidad-dentista..jpeg", alt: "Espacio de atención odontológica", category: "COMUNIDAD", title: "Atención odontológica", description: "Espacio comunitario destinado a los servicios de salud dental." },
        { src: "imagenes/comunidad-musica..png", alt: "Espacio de formación musical", category: "COMUNIDAD", title: "Formación musical", description: "Espacio dedicado a la formación musical y cultural de la comunidad." },
        { src: "imagenes/comunidad-universidad..jpeg", alt: "Espacio de formación en salud", category: "COMUNIDAD", title: "Formación en salud", description: "Área vinculada a la formación universitaria en el ámbito de la salud." },
        { src: "imagenes/acer-antes.jpg", alt: "Computadora Acer antes del mantenimiento", category: "EQUIPO ACER", title: "Estado inicial de la computadora", description: "Registro del equipo antes de realizar las actividades de mantenimiento." },
        { src: "imagenes/acer-interior-ilustrativa..png", alt: "Vista ilustrativa de componentes internos de laptop", category: "MANTENIMIENTO", title: "Componentes internos de la laptop", description: "Imagen ilustrativa de los componentes internos y de los materiales utilizados para la limpieza. No corresponde a una fotografía documental del procedimiento.", illustrative: true },
        { src: "imagenes/acer-final..jpeg", alt: "Computadora Acer después del mantenimiento", category: "EQUIPO ACER", title: "Resultado final", description: "Presentación de la computadora después de las actividades de mantenimiento." }
    ];

    const image = document.getElementById("galleryImage");
    const category = document.getElementById("galleryCategory");
    const title = document.getElementById("galleryTitle");
    const description = document.getElementById("galleryDescription");
    const counter = document.getElementById("galleryCounter");
    const dotsContainer = document.getElementById("galleryDots");
    const thumbsContainer = document.getElementById("galleryThumbnails");
    const prev = document.querySelector(".gallery-prev");
    const next = document.querySelector(".gallery-next");
    const playButton = document.getElementById("galleryPlay");

    if (!image || !dotsContainer || !thumbsContainer) return;

    let current = 0;
    let playing = true;
    let timer = null;
    const interval = 5000;
    const dots = [];
    const thumbs = [];

    function showPhoto(index) {
        current = (index + photos.length) % photos.length;
        const photo = photos[current];

        image.style.opacity = "0.25";
        window.setTimeout(() => {
            image.src = photo.src;
            image.alt = photo.alt;
            image.onload = () => { image.style.opacity = "1"; };
            // Si el archivo no carga, el navegador mostrará el texto alternativo.
        }, 120);

        category.textContent = photo.category + (photo.illustrative ? " · ILUSTRATIVA" : "");
        title.textContent = photo.title;
        description.textContent = photo.description;
        counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === current);
            dot.setAttribute("aria-pressed", String(i === current));
        });
        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle("active", i === current);
            thumb.setAttribute("aria-pressed", String(i === current));
        });
    }

    photos.forEach((photo, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "gallery-dot";
        dot.setAttribute("aria-label", `Ver fotografía ${index + 1}: ${photo.title}`);
        dot.addEventListener("click", () => { showPhoto(index); restartTimer(); });
        dotsContainer.appendChild(dot);
        dots.push(dot);

        const thumb = document.createElement("button");
        thumb.type = "button";
        thumb.className = "gallery-thumb";
        thumb.setAttribute("aria-label", `Seleccionar ${photo.title}`);
        const thumbImage = document.createElement("img");
        thumbImage.src = photo.src;
        thumbImage.alt = "";
        thumb.appendChild(thumbImage);
        thumb.addEventListener("click", () => { showPhoto(index); restartTimer(); });
        thumbsContainer.appendChild(thumb);
        thumbs.push(thumb);
    });

    function stopTimer() {
        if (timer !== null) {
            window.clearInterval(timer);
            timer = null;
        }
    }
    function startTimer() {
        stopTimer();
        if (playing) timer = window.setInterval(() => showPhoto(current + 1), interval);
        playButton.textContent = playing ? "Ⅱ Pausar" : "▶ Reproducir";
        playButton.setAttribute("aria-label", playing ? "Pausar presentación" : "Reanudar presentación");
    }
    function restartTimer() {
        if (playing) startTimer();
    }

    prev.addEventListener("click", () => { showPhoto(current - 1); restartTimer(); });
    next.addEventListener("click", () => { showPhoto(current + 1); restartTimer(); });
    playButton.addEventListener("click", () => {
        playing = !playing;
        startTimer();
    });

    const galleryShell = document.querySelector(".gallery-shell");
    galleryShell.addEventListener("mouseenter", stopTimer);
    galleryShell.addEventListener("mouseleave", () => { if (playing) startTimer(); });
    galleryShell.addEventListener("focusin", stopTimer);
    galleryShell.addEventListener("focusout", () => { if (playing) startTimer(); });

    showPhoto(0);
    startTimer();
});
