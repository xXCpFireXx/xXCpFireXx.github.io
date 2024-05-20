<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "wesearch";

// Crear conexión
$conex = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conex->connect_error) {
    die("Conexión fallida: " . $conex->connect_error);
} 

?>
