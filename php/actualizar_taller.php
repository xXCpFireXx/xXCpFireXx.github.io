<?php
session_start(); // Iniciar sesión

include 'conex.php';

// Verificar que la sesión esté iniciada
if (!isset($_SESSION['email'])) {
    header('Location: ../html/login.html'); // Redireccionar al formulario de inicio de sesión si no hay sesión activa
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener el ID del perfil del usuario desde la sesión
    $email = $_SESSION['email'];
    $sql = "SELECT id FROM perfilestudiante WHERE correo = '$email'";
    $result = $conex->query($sql);

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $id_perfil = $row['id'];

        // Actualizar la tabla "perfilestudiante" con el campo "completado"
        $sql_update_perfil = "UPDATE perfilestudiante SET completado = 2 WHERE id = $id_perfil";
        if ($conex->query($sql_update_perfil) === TRUE) {
            echo "Datos actualizados correctamente en la tabla 'perfilestudiante'. ";
        } else {
            echo "Error al actualizar los datos en la tabla 'perfilestudiante': " . $conex->error;
        }

        // Insertar un nuevo registro en la tabla "tallervirtual"
        $sql_insert_taller = "INSERT INTO tallervirtual (accesoTaller, clasificacion, id_perfil) VALUES (1, 1, $id_perfil)";
        header('Location: ../html/hojaVida.html');
        if ($conex->query($sql_insert_taller) === TRUE) {
            echo "Nuevo registro insertado correctamente en la tabla 'tallervirtual'.";            
        } else {
            echo "Error al insertar el nuevo registro en la tabla 'tallervirtual': " . $conex->error;
        }

    } else {
        echo "Error: No se encontró el perfil del usuario";
    }
} else {
    echo "Acceso denegado";
}
?>
