<?php
session_start(); // Iniciar sesión

include '../php/conex.php';

// Verificar si el usuario ha iniciado sesión
if (isset($_SESSION['email'])) {
    // Obtener el correo electrónico del usuario
    $email = $_SESSION['email'];

    // Consulta SQL para obtener los datos del estudiante
    $sql = "SELECT * FROM perfilEstudiante WHERE correo = '$email'";
    $result = $conex->query($sql);

    if ($result->num_rows == 1) {
        // Obtener los datos del estudiante
        $row = $result->fetch_assoc();

        // Agregar la ruta de la imagen de perfil a los datos
        $row['foto_perfil'] = $row['foto'];

        // Agregar el ID del perfil del estudiante a los datos
        $row['id_perfil'] = $row['id']; // Suponiendo que el ID del perfil se llama 'id'


        header('Content-Type: application/json'); // Establecer el tipo de contenido como JSON
        echo json_encode($row);
    } else {
        // No se encontró el estudiante
        header('Content-Type: application/json'); // Establecer el tipo de contenido como JSON
        echo json_encode(array('error' => 'No se encontró el estudiante.'));
    }
} else {
    // Si el usuario no ha iniciado sesión, devolver un error
    header('Content-Type: application/json'); // Establecer el tipo de contenido como JSON
    echo json_encode(array('error' => 'Usuario no autenticado.'));
}
?>
