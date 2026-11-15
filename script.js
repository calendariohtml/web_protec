
// =====================================
// 1. FOTOGRAFÍAS DE LA BIBLIOTECA
// =====================================

const fotografias = [
    {
        imagen: "imagenes/comunidad-01.jpg",
        titulo: "Urbanización Las Manuelas",
        descripcion: "Vista de la comunidad donde se desarrolla el proyecto."
    },
    {
        imagen: "imagenes/comunidad-02.jpg",
        titulo: "Calles de la comunidad",
        descripcion: "Registro fotográfico de las vías y espacios comunitarios."
    },
    {
        imagen: "imagenes/computadora-01.jpg",
        titulo: "Computadora Acer",
        descripcion: "Equipo portátil objeto de la evaluación técnica."
    },
    {
        imagen: "imagenes/mantenimiento-01.jpg",
        titulo: "Proceso de mantenimiento",
        descripcion: "Registro de las actividades realizadas durante el proyecto."
    }
];


// =====================================
// 2. ELEMENTOS DEL CARRUSEL
// =====================================

const imagenPrincipal = document.getElementById("imagenCarrusel");
const tituloImagen = document.getElementById("tituloImagen");
const textoImagen = document.getElementById("textoImagen");

const botonAnterior = document.getElementById("anterior");
const botonSiguiente = document.getElementById("siguiente");

const miniaturas = document.querySelectorAll(".miniatura");
const carrusel = document.querySelector(".carrusel");

let indiceActual = 0;
let temporizador;


// =====================================
// 3. MOSTRAR UNA FOTOGRAFÍA
// =====================================

function mostrarFotografia(indice) {

    indiceActual = indice;

    imagenPrincipal.src = fotografias[indiceActual].imagen;

    imagenPrincipal.alt = fotografias[indiceActual].titulo;

    tituloImagen.textContent = fotografias[indiceActual].titulo;

    textoImagen.textContent = fotografias[indiceActual].descripcion;

    miniaturas.forEach((miniatura, posicion) => {

        miniatura.classList.remove("activa");

        if (posicion === indiceActual) {
            miniatura.classList.add("activa");
        }

    });

}


// =====================================
// 4. AVANZAR Y RETROCEDER
// =====================================

function siguienteFotografia() {

    let nuevoIndice = (indiceActual + 1) % fotografias.length;

    mostrarFotografia(nuevoIndice);

}


function anteriorFotografia() {

    let nuevoIndice =
        (indiceActual - 1 + fotografias.length) % fotografias.length;

    mostrarFotografia(nuevoIndice);

}


// =====================================
// 5. BOTONES DEL CARRUSEL
// =====================================

botonSiguiente.addEventListener("click", () => {

    siguienteFotografia();
    reiniciarCarrusel();

});


botonAnterior.addEventListener("click", () => {

    anteriorFotografia();
    reiniciarCarrusel();

});


// =====================================
// 6. SELECCIÓN DE MINIATURAS
// =====================================

miniaturas.forEach((miniatura, posicion) => {

    miniatura.addEventListener("click", () => {

        mostrarFotografia(posicion);
        reiniciarCarrusel();

    });

});


// =====================================
// 7. CARRUSEL AUTOMÁTICO
// =====================================

function iniciarCarrusel() {

    temporizador = setInterval(() => {

        siguienteFotografia();

    }, 4000);

}


function detenerCarrusel() {

    clearInterval(temporizador);

}


function reiniciarCarrusel() {

    detenerCarrusel();
    iniciarCarrusel();

}


// =====================================
// 8. PAUSAR AL PASAR EL RATÓN
// =====================================

carrusel.addEventListener("mouseenter", detenerCarrusel);

carrusel.addEventListener("mouseleave", iniciarCarrusel);


// =====================================
// 9. INICIAR LA BIBLIOTECA
// =====================================

mostrarFotografia(0);

iniciarCarrusel();
