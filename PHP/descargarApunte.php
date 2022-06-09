<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


	
	require_once("ControlBD.php");
	require("Conf.php");
	require("Apunte.php");
	$bd = ControlBD::getInstance();	

	$apunte = new Apuntes();


    //$cod_apunte = $_POST['cod_apunte'];

    $cod_apunte = 3;

    $ruta = "/PHP/".$apunte->getRuta($cod_apunte);
    $tipo_archivo = $apunte->getTipoArchivo($cod_apunte);
    $nombre = $cod_apunte.".".$tipo_archivo;

    header('Content-Type: application/pdf');
    header("Content-Transfer-Encoding: Binary");
    header("Content-disposition: attachment; filename=$nombre");
    readfile($ruta);



    echo true;


 ?>