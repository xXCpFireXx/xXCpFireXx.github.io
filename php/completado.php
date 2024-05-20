<?php
session_start(); // Iniciar sesión

include '../php/conex.php';

// Verificar si el usuario ha iniciado sesión
if (isset($_SESSION['email'])) {
    // Obtener el correo electrónico del usuario
    $email = $_SESSION['email'];

    // Consulta SQL para obtener el estado de completado del usuario
    $sql = "SELECT completado FROM perfilestudiante WHERE correo = '$email'";
    $result = $conex->query($sql);

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        echo $row['completado'];
    } else {
        echo '0'; // Si no se encuentra el usuario, se asume que no ha completado ninguna fase
    }
} else {
    echo '0'; // Si el usuario no ha iniciado sesión, se asume que no ha completado ninguna fase
}
?>
