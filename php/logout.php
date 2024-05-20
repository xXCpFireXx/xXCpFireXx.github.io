<?php
session_start(); // Iniciar sesión

// Verificar si hay una sesión activa
if (isset($_SESSION['email'])) {
    // Destruir la sesión actual
    session_destroy();

    // Redirigir al formulario de inicio de sesión u otra página
    header('Location: ../html/login.html'); // Redireccionar al formulario de inicio de sesión
    exit;
} else {
    // No hay sesión activa, redirigir a la página de inicio de sesión
    header('Location: ../html/login.html'); // Redireccionar al formulario de inicio de sesión
    exit;
}
?>
