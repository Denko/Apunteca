<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


	
	require_once("ControlBD.php");
	require("Conf.php");
	require("Apunte.php");
	$bd = ControlBD::getInstance();	

	$apunte = new Apuntes();


    $cod_apunte = $_POST['cod_apunte'];

    $apunte->sumarDescarga($cod_apunte);



    echo true;


 ?>