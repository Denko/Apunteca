<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


	
	require_once("ControlBD.php");
	require("Conf.php");
	require("Apunte.php");
	$bd = ControlBD::getInstance();	
	$apunte1 = new Apuntes();
	$apunte2 = new Apuntes();
	$apunte3 = new Apuntes();

    $cod_usuario = $_POST['cod_usuario'];
    $cod_apunte = $_POST['cod_apunte'];



    $propietario = $apunte1->getPropietario($cod_apunte);

	if ($propietario == $cod_usuario){
		$apunte2->borrarApunteBiblioteca($cod_apunte,$cod_usuario);
		$apunte3->borrarApunteApuntes($cod_apunte);
	}else{
		$apunte2->borrarApunteBiblioteca($cod_apunte,$cod_usuario);
	}
	
    echo true;


 ?>