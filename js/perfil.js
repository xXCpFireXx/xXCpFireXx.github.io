// Realizar una solicitud AJAX para obtener los datos del perfil
var xhr = new XMLHttpRequest();
xhr.open('GET', '../php/perfil.php'); // Cambio en la ruta del archivo perfil.php
xhr.onload = function () {
    if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        if (data.error) {
            console.error(data.error);
        } else {
            document.getElementById('nombre_estudiante').textContent = data.nombreEstudiante;
            document.getElementById('carrera').querySelector('p').textContent = data.carrera;
            document.getElementById('email').querySelector('p').textContent = data.correo;
            document.getElementById('id').querySelector('p').textContent = data.id;
            document.getElementById('tel').querySelector('p').textContent = data.telefono;
            document.getElementById('identificacion').querySelector('p').textContent = data.identificacion;

            // Obtener la imagen de perfil y establecer su src
            var fotoPerfil = document.getElementById('foto_perfil');
            fotoPerfil.src = data.foto_perfil;
        }
    }
};
xhr.send();