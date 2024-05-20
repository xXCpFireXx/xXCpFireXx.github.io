<?php
session_start(); // Iniciar sesión

include '../php/conex.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del formulario
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Consulta SQL para verificar las credenciales
    $sql = "SELECT * FROM perfilestudiante WHERE correo = '$email' AND contraseña = '$password'";
    $result = $conex->query($sql);

    if ($result->num_rows == 1) {
        // Usuario autenticado correctamente
        $_SESSION['email'] = $email; // Guardar el email en la sesión

        // Obtener la carrera del estudiante de la base de datos
        $row = $result->fetch_assoc();
        $carrera_del_estudiante = $row['carrera']; // Suponiendo que la columna se llame 'carrera'

        // Debug: Verificar la carrera del estudiante obtenida
        var_dump($carrera_del_estudiante);

        // Guardar la carrera del estudiante en la sesión
        $_SESSION['carrera_estudiante'] = $carrera_del_estudiante;

        $_SESSION['id_perfil'] = $row['id']; // Suponiendo que el ID del perfil se encuentra en la columna 'id'


        header('Location: ../html/perfil.html'); // Redireccionar al perfil
        exit;
    } else {
        // Credenciales incorrectas, redirigir al formulario de inicio de sesión con indicación de error
        header('Location: ../html/login.html?error=1'); // Redireccionar al formulario de inicio de sesión con mensaje de error
        exit;
    }
} else {
    // Si se intenta acceder a este script de forma directa sin enviar datos POST, redirigir al formulario de inicio de sesión
    header('Location: ../html/login.html'); // Redireccionar al formulario de inicio de sesión
    exit;
}
?>