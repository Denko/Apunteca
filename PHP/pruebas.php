<?php

require_once("ControlBD.php");
require("Conf.php");
require("Apunte.php");
require("Usuario.php");

$bd = ControlBD::getInstance();

//$bd->conectarPrueba();



$usuarios = new Usuarios();
$apuntes = new Apuntes();

$lista = $apuntes->getApuntesUsuario('1');
//$lista.length();

echo json_encode($lista);
//echo $usuarios->getTodos();
//echo json_encode($usuarios->getTodos());
/*
$propietario = '1';
//$archivo = $_FILES['fileArchivo'];
$ruta = 'apuntes/alex_3.pdf';
$nombre = 'apunte prueba';
$asignatura = 'asignatura prueba';
$centro = 'centro prueba';
$descripcion = 'descrip prueba';
$fechaSubida = 'fecha prueba';
*/

// Para comprobar que se añaden bien los apuntes a la base de datos
//$apuntes->addApunte($propietario, $ruta, $nombre, $centro, $asignatura, $descripcion, $fechaSubida)

//Se muestra el numero cod_apunte del apunte que se va a añadir
//echo $apuntes->ultimoCodApunte();



?> 