<?php
session_start(); // Iniciar sesión

include 'conex.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar que haya un archivo subido
    if (isset($_FILES['archivo'])) {
        $archivo = $_FILES['archivo'];

        // Verificar que sea un archivo de tipo .docx
        $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
        if ($extension === 'docx') {
            // Obtener el ID del perfil del usuario desde la sesión
            $email = $_SESSION['email'];
            $sql = "SELECT id FROM perfilestudiante WHERE correo = '$email'";
            $result = $conex->query($sql);

            if ($result->num_rows == 1) {
                $row = $result->fetch_assoc();
                $id_perfil = $row['id'];

                // Mover el archivo a una ubicación específica
                $carpeta_destino = '../assets/';
                $ruta_archivo = $carpeta_destino . $archivo['name'];
                move_uploaded_file($archivo['tmp_name'], $ruta_archivo);

                // Insertar el archivo y el ID de perfil en la tabla hojavida
                $sql_insert_hojavida = "INSERT INTO hojavida (HojaVida_subida, id_perfil) VALUES ('$ruta_archivo', $id_perfil)";
                if ($conex->query($sql_insert_hojavida) === TRUE) {
                    // Actualizar el campo 'completado' en la tabla perfilestudiante
                    $sql_update_perfil = "UPDATE perfilestudiante SET completado = 3 WHERE id = $id_perfil";
                    if ($conex->query($sql_update_perfil) === TRUE) {
                        // Redireccionar al usuario a ofertas.html si todo se ha realizado correctamente
                        header('Location: ../html/ofertas.html');
                        exit;
                    } else {
                        echo "Error al actualizar el campo 'completado': " . $conex->error;
                    }
                } else {
                    echo "Error al insertar el archivo en la tabla 'hojavida': " . $conex->error;
                }
            } else {
                echo "Error: No se encontró el perfil del usuario";
            }
        } else {
            echo "Error: El archivo debe ser de tipo .docx";
        }
    } else {
        echo "Error: No se ha seleccionado ningún archivo";
    }
} else {
    echo "Acceso denegado";
}
?>
