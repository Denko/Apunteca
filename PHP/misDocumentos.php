<?php

require_once("ControlBD.php");
require("Conf.php");
require("Apunte.php");
require("Usuario.php");

$bd = ControlBD::getInstance();

$usuarios = new Usuarios();
$apuntes = new Apuntes();



$cod_usuario = $_POST['cod_usuario'];

$lista = $apuntes->getApuntesUsuario($cod_usuario);

// De Prueba $lista = $apuntes->getApuntesUsuario('9');

echo json_encode($lista);


?> 