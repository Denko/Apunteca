<?php

require_once("ControlBD.php");
require("Conf.php");
require("Apunte.php");
require("Usuario.php");

$bd = ControlBD::getInstance();

$usuarios = new Usuarios();
$apuntes = new Apuntes();

$cod_usuario = $_POST['cod_usuario'];
$cod_apunte = $_POST['cod_apunte'];
$compartido = $_POST['compartido'];

$apuntes->cambiarCompartido($cod_usuario,$cod_apunte,$compartido);

// De Prueba $lista = $apuntes->getApuntesUsuario('9');

echo true;


?> 