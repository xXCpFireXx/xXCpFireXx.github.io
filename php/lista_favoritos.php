<?php
session_start(); // Iniciar sesión
include 'conex.php';

// Inicializar la respuesta como un array
$response = array();
$response['success'] = false; // Inicialmente, establecer success en false
$response['data'] = array();  // Inicializar data como un array

// Verificar si el usuario está autenticado y tiene un perfil
if (isset($_SESSION['id_perfil'])) {
    // Obtener el ID del perfil del usuario desde la sesión
    $id_perfil = $_SESSION['id_perfil'];

    // Consultar las ofertas favoritas del usuario
    $query = "SELECT ofertas.id_ofertas, ofertas.nombreEmpresa, ofertas.cargoEmpresa, ofertas.funcionEmpresa, ofertas.lugar, ofertas.tiempo, ofertas.img, ofertas.categoria 
              FROM favoritos 
              JOIN ofertas ON favoritos.id_oferta = ofertas.id_ofertas 
              WHERE favoritos.id_perfil = '$id_perfil'";
    $result = mysqli_query($conex, $query);

    // Verificar si la consulta devolvió resultados
    if ($result && mysqli_num_rows($result) > 0) {
        // Almacenar las ofertas en la respuesta
        while ($row = mysqli_fetch_assoc($result)) {
            $response['data'][] = $row;
        }
        // Respuesta exitosa
        $response['success'] = true;
    } else {
        // No se encontraron ofertas favoritas
        $response['error'] = 'Todavía no has agregado alguna oferta';
    }
} else {
    // El usuario no está autenticado
    $response['error'] = 'El usuario no está autenticado.';
}

// Devolver la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
