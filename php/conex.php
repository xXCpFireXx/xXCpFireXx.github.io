<?php
$servername = "roundhouse.proxy.rlwy.net";
$username = "root";
$password = "CpzAmCegSUeUoykaqJuLEgdHDUyVIahf";
$database = "railway";

// Crear conexión
$conex = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conex->connect_error) {
    die("Conexión fallida: " . $conex->connect_error);
} 

?>
