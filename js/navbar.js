function verificarOfertas() {
    // Realizar una solicitud AJAX para obtener el estado de completado del usuario
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../php/completado.php');
    xhr.onload = function () {
        console.log(xhr.status);
        if (xhr.status === 200) {
            var completado = parseInt(xhr.responseText.trim());
            if (completado === 3) {
                window.location.href = 'ofertas.html'; // Redirigir a ofertas.html
            } else {
                // Mostrar un toast utilizando Toastify
                Toastify({
                    text: 'Primero debes iniciar o terminar las fases de la práctica en la pestaña PROCESO',
                    duration: 5000, // Duración del toast en milisegundos (5 segundos)
                    gravity: 'top', // Posición del toast (arriba)
                    position: 'center', // Posición horizontal del toast (centrado)
                    backgroundColor: '#ff0000', // Color de fondo del toast (rojo)
                }).showToast();
            } 
        } else {
            console.error('Error al comprobar estado de completado.');
        }
    };
    xhr.send();
}

function verificarFavoritos() {
    // Realizar una solicitud AJAX para obtener el estado de completado del usuario
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../php/completado.php');
    xhr.onload = function () {
        if (xhr.status === 200) {
            var faseCompletada = xhr.responseText.trim();
            if (faseCompletada === '3') {
                window.location.href = 'favoritos.html'; // Redirigir a preinscripcion.html
            } else {
            // Mostrar un toast utilizando Toastify en el else
            Toastify({
                text: 'Primero debes iniciar o terminar las fases de la práctica en la pestaña PROCESO',
                duration: 5000, // Duración del toast en milisegundos (5 segundos en este caso)
                gravity: 'top', // Posición del toast (arriba)
                position: 'center', // Posición horizontal del toast (centrado)
                backgroundColor: '#ff0000', // Color de fondo del toast (rojo en este caso)
            }).showToast();
        } 
    } else {
        console.error('Error al comprobar estado de completado.');
    }
    };
    xhr.send();
}

document.addEventListener('DOMContentLoaded', function () {
    // Obtener el botón de cancelar por su ID
    var btnCancelar = document.getElementById('btnCancelar');

    // Agregar el evento de clic al botón
    btnCancelar.addEventListener('click', function () {
        // Redirigir al usuario a perfil.html al hacer clic en el botón
        window.location.href = 'perfil.html';
    });
});