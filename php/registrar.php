<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = $_POST['usuario'];
    $apellido = $_POST['contraseña'];
    $email = $_POST['email']
    $contraseña = $POST['contraseña']
    $valcontraseña = $POST['valcontraseña']

    // Aquí puedes procesar los datos, guardarlos en una base de datos o enviar un correo
    echo "Gracias, $nombre. Hemos recibido tu mensaje: '$mensaje'.";
}
?>