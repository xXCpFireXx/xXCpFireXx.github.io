<?php
include '../php/conex.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombreEstudiante = $_POST['nombreEstudiante'];
    $tipoIdentificacion = $_POST['tipoIdentificacion'];
    $identificacion = $_POST['identificacion'];
    $telefono = $_POST['telefono'];
    $id = $_POST['id'];
    $sede = $_POST['sede'];
    $carrera = $_POST['carrera'];
    $periodoAcademico = $_POST['periodoAcademico'];
    $creditosAprobados = $_POST['creditosAprobados'];
    $estadoPractica = $_POST['estadoPractica'];
    $salud = $_POST['salud'];

    // Insertar datos en la tabla de preinscripción
    $sql = "INSERT INTO preinscripcion (nombreEstudiante, tipoIdentificacion, identificacion, telefono, id, sede, carrera, periodoAcademico, creditosAprobados, estadoPractica, salud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conex->prepare($sql);
    $stmt->bind_param("sssssssssss", $nombreEstudiante, $tipoIdentificacion, $identificacion, $telefono, $id, $sede, $carrera, $periodoAcademico, $creditosAprobados, $estadoPractica, $salud);
    //"sssssssssss" indica que tienes 11 parámetros, y todos deben ser tratados como cadenas de texto. 

    if ($stmt->execute()) {
        // Actualizar el campo 'completado' a '1'
        $sql_update = "UPDATE perfilestudiante SET completado = 1 WHERE id = ?";
        $stmt_update = $conex->prepare($sql_update);
        $stmt_update->bind_param("s", $id);
        $stmt_update->execute();
        
        //siguiente paso del proceso
        header("Location: ../html/taller.html");
        exit;
    } else {
        echo "Error: " . $conex->error;
    }
}
?>

