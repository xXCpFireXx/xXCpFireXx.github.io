document.addEventListener("DOMContentLoaded", function() {

    var ofertasRechazadas = []; // Array para almacenar las ofertas rechazadas por el usuario
    var ofertasFavoritas = []; // Array para almacenar las ofertas agregadas a favoritos por el usuario
    var ofertaActual; // Variable para almacenar la oferta actual mostrada en el DOM

    function mostrarOferta(oferta) {
        document.getElementById('nombreEmpresa').textContent = oferta.nombreEmpresa;
        document.getElementById('cargoEmpresa').textContent = oferta.cargoEmpresa;
        document.getElementById('lugar').textContent = oferta.lugar;
        document.getElementById('tiempo').textContent = oferta.tiempo;

        var funciones = oferta.funcionEmpresa.split("\n");
        var ul = document.getElementById('funcionEmpresa');
        ul.innerHTML = ""; // Limpiar la lista de funciones antes de agregar nuevas
        funciones.forEach(function(funcion) {
            var li = document.createElement('li');
            li.textContent = funcion;
            ul.appendChild(li);
        });

        // Mostrar la imagen de la empresa
        document.querySelector('.icono').src = oferta.img;

        // Obtener el ID de la oferta y almacenarlo en el botón "favorite-btn"
        var idOferta = oferta.id_ofertas; 
        document.querySelector('.favorite-btn').setAttribute('data-id-oferta', idOferta);

        // Mostrar el contenedor de ofertas
        document.querySelector('.card_ofertas').style.display = 'block';

        // Guardar la oferta actual en la variable global
        ofertaActual = oferta;
    }

    function mostrarOfertaAleatoria() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../php/ofertas.php?obtener_oferta=true", true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var oferta = JSON.parse(xhr.responseText);
                if (oferta.error) {
                    console.error("Error al obtener la oferta:", oferta.error);
                } else {
                    // Verificar si la oferta ya fue rechazada o está en favoritos
                    if (!ofertasRechazadas.includes(oferta.id_ofertas) && !ofertasFavoritas.includes(oferta.id_ofertas)) {
                        mostrarOferta(oferta);
                    } else {
                        // Si la oferta ya fue rechazada o está en favoritos, obtener otra oferta
                        mostrarOfertaAleatoria();
                    }
                }
            } else {
                console.error("Error al cargar la oferta:", xhr.statusText);
            }
        };
        xhr.send();
    }
    
    // Función para ocultar el contenedor de ofertas cuando ya no hay más disponibles
    function ocultarContenedorOfertas() {
        document.getElementById('ofertas-container').style.display = 'none';
    }
    
    // Verificar si no hay más ofertas disponibles después de intentar obtener una oferta aleatoria
    function verificarOfertasDisponibles() {
        if (ofertasRechazadas.length + ofertasFavoritas.length >=4) {
            mostrarToastNoOfertasDisponibles(); // Mostrar el Toastify si no hay más ofertas disponibles
            ocultarContenedorOfertas(); // Ocultar el contenedor de ofertas cuando no hay más disponibles
        }
    }

    function mostrarToastNoOfertasDisponibles() {
        Toastify({
            text: 'No hay más ofertas disponibles',
            duration: 2000,
            gravity: 'top',
            position: 'center',
            backgroundColor: '#BDA325'
        }).showToast();
    }

    mostrarOfertaAleatoria();

    document.querySelector('.close-btn').onclick = function() {
        var idOferta = document.querySelector('.favorite-btn').getAttribute('data-id-oferta');
        ofertasRechazadas.push(idOferta); // Agregar la oferta a las rechazadas
    
        // Añadir clase para activar la animación de salida
        document.querySelector('.card_ofertas').classList.add('oculto');

        // Esperar 2 segundos antes de mostrar el nuevo div
        setTimeout(function() {
            // Remover la clase "oculto" para mostrar el nuevo div
            document.querySelector('.card_ofertas').classList.remove('oculto');
            // Llamar a la función para obtener y mostrar una nueva oferta aleatoria
            mostrarOfertaAleatoria();
            // Verificar si no hay más ofertas disponibles después de rechazar una oferta
            verificarOfertasDisponibles();
        }, 2000); 
        // Mostrar un toast utilizando Toastify
        Toastify({
            text: 'La oferta fue rechazada',
            duration: 2000, // Duración del toast en milisegundos (2 segundos)
            gravity: 'top', // Posición del toast (arriba)
            position: 'center', // Posición horizontal del toast (centrado)
            backgroundColor: '#ff0000', // Color de fondo del toast (rojo)
        }).showToast();
    };
    
    document.querySelector('.favorite-btn').onclick = function() {
        var idOferta = this.getAttribute('data-id-oferta');
        console.log("ID de la oferta:", idOferta); // Agregar este console.log para verificar el ID de la oferta
        // Agregar la oferta a las favoritas
        ofertasFavoritas.push(idOferta);

        // Verificar si el ID de la oferta está definido
        if (idOferta !== null) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../php/favoritos.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        try {
                            var data = JSON.parse(xhr.responseText);
                            if (data.success) {
                                Toastify({
                                    text: data.message,
                                    duration: 2000,
                                    gravity: 'top',
                                    position: 'center',
                                    backgroundColor: '#28B463',
                                }).showToast();
                                console.log(data.message); // Muestra el mensaje en la consola
                                // Aquí puedes realizar cualquier acción adicional si la operación fue exitosa

                                // Girar hacia la derecha y desvanecer
                                document.querySelector('.card_ofertas').classList.add('oculto2');

                                // Esperar 2 segundos antes de reaparecer en el centro
                                setTimeout(function() {
                                    // Quitar la clase de girar y desvanecer
                                    document.querySelector('.card_ofertas').classList.remove('oculto2');
                                    // Llamar a la función para obtener y mostrar una nueva oferta aleatoria
                                    mostrarOfertaAleatoria();
                                    // Verificar si no hay más ofertas disponibles después de rechazar una oferta
                                    verificarOfertasDisponibles();
                                }, 2000); // Esperar 2000 milisegundos (2 segundos)
                            } else {
                                console.error(data.error); // Muestra el mensaje de error en la consola
                                // Aquí puedes manejar el error de alguna manera apropiada
                                Toastify({
                                    text: data.error,
                                    duration: 2000,
                                    gravity: 'top',
                                    position: 'center',
                                    backgroundColor: '#ff0000',
                                }).showToast();
                            }
                        } catch (error) {
                            console.error("Error al analizar la respuesta JSON:", error);
                        }
                    } else {
                        console.error("Error en la solicitud: " + xhr.status);
                    }
                }
            };
            xhr.send("id_oferta=" + idOferta);
        } else {
            console.error("ID de la oferta no definido.");
        }
    };
});
