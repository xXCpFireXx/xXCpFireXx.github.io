<?php
session_start(); // Iniciar sesión
include 'conex.php';

// Función para obtener una oferta aleatoria de la base de datos
function obtenerOfertaAleatoria() {
    global $conex;
    $sql = "SELECT * FROM ofertas ORDER BY RAND() LIMIT 1";
    $result = $conex->query($sql);

    // Verificar si hay resultados y mostrarlos
    if ($result->num_rows > 0) {
        $oferta = $result->fetch_assoc();

        // Obtener la URL completa de la imagen
        $rutaImagen = $oferta['img'];

        // Si la URL de la imagen no comienza con "http" o "https", agregar la ruta base
        if (!preg_match("~^(?:f|ht)tps?://~i", $rutaImagen)) {
            $rutaImagen = "http://localhost/wesearch/wesearch/" . $rutaImagen;
        }

        // Agregar la URL de la imagen a los datos de la oferta
        $oferta['img'] = $rutaImagen;
        
        //return $ofertas;
        // Devolver la oferta como JSON
        echo json_encode($oferta);
    } else {
        //return false;
        // Si no se encontraron ofertas, devolver un mensaje de error como JSON
        echo json_encode(array("error" => "No se encontraron ofertas"));
    }
}

// Función para obtener la categoría correspondiente a la carrera del estudiante
function obtenerCategoriaPorCarrera($carrera) {
    // Definir las categorías correspondientes a cada carrera
    $categorias = array(
        'Ingenieria de Software' => 1,
        'Psicologia' => 2,
        // Agrega más carreras y categorías según sea necesario
    );

    // Verificar si la carrera del estudiante tiene una categoría asignada
    if (array_key_exists($carrera, $categorias)) {
        return $categorias[$carrera];
    } else {
        // Si la carrera no tiene una categoría asignada, retornar un valor predeterminado
        return null;
    }
}

// Función para obtener ofertas filtradas por la categoría correspondiente a la carrera del estudiante
function obtenerOfertasFiltradasPorCarrera($carrera) {
    global $conex;
    // Obtener la categoría correspondiente a la carrera del estudiante
    $categoria = obtenerCategoriaPorCarrera($carrera);
    if ($categoria !== null) {
        // Consultar las ofertas filtradas por la categoría
        $sql = "SELECT * FROM ofertas WHERE categoria = $categoria ORDER BY RAND() LIMIT 1";
        $result = $conex->query($sql);
        if ($result->num_rows > 0) {
            // Si se encuentran ofertas, devolver la primera oferta encontrada
            return $result->fetch_assoc();
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// Manejar la solicitud AJAX para obtener una oferta aleatoria filtrada por la carrera del estudiante
if (isset($_GET['obtener_oferta'])) {
    // Se obtiene la carrera del estudiante del login
    if (isset($_SESSION['carrera_estudiante'])) {
        $carreraEstudiante = $_SESSION['carrera_estudiante'];
        // echo "Carrera del estudiante: " . $carreraEstudiante; // Esta línea causa el error, así que la comentamos o eliminamos
        $oferta = obtenerOfertasFiltradasPorCarrera($carreraEstudiante);
        if ($oferta) {
            // Devuelve la oferta como JSON
            echo json_encode($oferta);
        } else {
            echo json_encode(array("error" => "No se encontraron ofertas para la carrera del estudiante"));
        }
    } else {
        echo json_encode(array("error" => "No se ha proporcionado la carrera del estudiante"));
    }
    exit(); // Terminar el script después de manejar la solicitud AJAX
}
?>