<?php

require_once("ControlBD.php");
require("Conf.php");
require("Apunte.php");


$bd = ControlBD::getInstance();

$apuntes = new Apuntes();

$cod_usuario = $_POST['cod_usuario'];
$cod_apunte = $_POST['cod_apunte'];
$compartido = $_POST['compartido'];

if ($compartido == 1) {
    $apuntes->setCompartido($cod_apunte, 1);
} else {
    $apuntes->setCompartido($cod_apunte, 0);
    $apuntes->borrarNoCompartidosDeBiblioteca($cod_apunte, $cod_usuario);
}

echo true;


?> 