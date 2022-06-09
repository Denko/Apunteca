<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


	
	require_once("ControlBD.php");
	require("Conf.php");
	require("Apunte.php");
	$bd = ControlBD::getInstance();	
	$apuntes = new Apuntes();


    $cod_usuario = $_POST['cod_usuario'];
    $cod_apunte = $_POST['cod_apunte'];

    $fecha = date("m.d.y");
	
    $apuntes->addBiblioteca($cod_usuario, $cod_apunte, $fecha);

    return true;


 ?>