function subirHojaVida() {
    // Obtener el archivo seleccionado
    const archivo = document.getElementById('archivo').files[0];
    if (archivo) {
        // Crear un objeto FormData para enviar el archivo al servidor
        const formData = new FormData();
        formData.append('archivo', archivo);

        // Enviar el archivo al servidor usando fetch y FormData
        fetch('../php/hojaVida.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Redirigir al usuario a ofertas.html si todo se ha realizado correctamente
                window.location.href = '../html/ofertas.html';
            } else {
                throw new Error('Error al subir el archivo');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Mostrar un mensaje de error utilizando Toastify
            Toastify({
                text: 'Error al subir el archivo',
                duration: 3000,
                gravity: 'top',
                position: 'right',
                backgroundColor: 'linear-gradient(to right, #FF6B6B, #FF6B6B)',
                stopOnFocus: true
            }).showToast();
        });
    } else {
        console.error('Error: No se ha seleccionado ningún archivo');
        // Mostrar un mensaje de error utilizando Toastify
        Toastify({
            text: 'No se ha seleccionado ningún archivo',
            duration: 3000,
            gravity: 'top',
            position: 'right',
            backgroundColor: 'linear-gradient(to right, #FF6B6B, #FF6B6B)',
            stopOnFocus: true
        }).showToast();
    }
}
