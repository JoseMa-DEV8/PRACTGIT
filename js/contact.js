/**
 * Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el script.
 */
document.addEventListener('DOMContentLoaded', iniciarEventos);

/**
 * Función que inicializa los eventos de la página.
 */
function iniciarEventos() {
    iniciarFormulario();
    iniciarAbout();
}

/**
 * Inicializa el formulario de contacto.
 */
function iniciarFormulario() {
    /**
     * Referencia al formulario de contacto.
     * @type {HTMLFormElement | null}
     */
    const contactForm = document.getElementById('contactForm');

    // Verifica si el formulario existe antes de agregar el evento
    if (contactForm) {
        contactForm.addEventListener('submit', manejarEnvioFormulario);
    } else {
        console.error("El formulario de contacto no se encontró en la página.");
    }
}

/**
 * Maneja el evento de envío del formulario de contacto.
 * @param {Event} e - Evento de envío del formulario.
 */
function manejarEnvioFormulario(e) {
    e.preventDefault(); // Previene la recarga de la página

    /**
     * Nombre ingresado en el formulario.
     * @type {string}
     */
    const name = document.getElementById('name')?.value || '';

    /**
     * Mensaje ingresado en el formulario.
     * @type {string}
     */
    const message = document.getElementById('message')?.value || '';

    // Verifica si el nombre y el mensaje no están vacíos
    if (name.trim() !== '' && message.trim() !== '') {
        alert(`¡Gracias por tu mensaje, ${name}!`);
        document.getElementById('contactForm').reset(); // Resetea el formulario después del envío
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

/**
 * Inicializa la sección "About" si existe.
 */
function iniciarAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        console.log("Sección About encontrada.");
    } else {
        console.error("La sección About no se encontró en la página.");
    }
}
