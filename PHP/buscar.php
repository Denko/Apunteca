<?php

require_once("ControlBD.php");
require("Conf.php");
require("Apunte.php");
require("Usuario.php");

$bd = ControlBD::getInstance();

$usuarios = new Usuarios();
$apuntes = new Apuntes();



$textoBusqueda = $_POST['texto_busqueda'];

$lista = $apuntes->buscarApuntes($textoBusqueda);

// de prueba $lista = $apuntes->buscarApuntes('tema');

echo json_encode($lista);


?> 