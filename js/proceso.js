
function verificarFase() {
    // Realizar una solicitud AJAX para obtener el estado de completado del usuario
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../php/completado.php');
    xhr.onload = function () {
        if (xhr.status === 200) {
            var faseCompletada = xhr.responseText.trim();
            if (faseCompletada === '0') {
                window.location.href = 'preinscripcion.html'; // Redirigir a preinscripcion.html
            } else if (faseCompletada === '1') {
                window.location.href = 'taller.html';; // Redirigir a la siguiente fase (hojaVida.html)
            } else if (faseCompletada === '2') {
                window.location.href = 'hojaVida.html'; // Redirigir a la siguiente fase (hojaVida.html)
            } else if (faseCompletada === '3') {
                Toastify({
                    text: 'Ya completaste tus primeros PASOS en el proceso de la practica, es hora de ver algunas OFERTAS',
                    duration: 5000, // Duración del toast en milisegundos (5 segundos en este caso)
                    gravity: 'top', // Posición del toast (arriba)
                    position: 'center', // Posición horizontal del toast (centrado)
                    backgroundColor: '#17A589',
                }).showToast();
            }
        } else {
            console.error('Error al comprobar estado de completado.');
        }
    };
    xhr.send();
}

function siguiente() {
    // Obtener el estado del checkbox
    const completado = document.getElementById('completado').checked;

    // Si el checkbox está marcado
    if (completado) {
        // Hacer una solicitud AJAX para enviar los datos al servidor
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../php/actualizar_taller.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // La solicitud se completó con éxito, puedes redirigir al usuario o mostrar algún mensaje
                console.log('Datos enviados correctamente');
            }
        };
        // Enviar los datos al servidor
        xhr.send('completado=1');
        window.location.href = '../html/hojaVida.html';
    } else {
        // El checkbox no está marcado, puedes mostrar un mensaje de advertencia
        console.log('Debes marcar el checkbox antes de continuar');
    }
}