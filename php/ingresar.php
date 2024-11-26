<?php

$server = "localhost";
$user = "root";
$pass = "";
$db = "tugrua";

$conexion = mysqli_connect($server, $user, $pass, $db);

if (!$conexion) {
    // Mostrar un mensaje de error detallado
    die("Error de conexión: " . mysqli_connect_error());
} else {
    echo "Conexión exitosa a la base de datos.";
}


?>