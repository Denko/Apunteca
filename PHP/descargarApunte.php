<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


	
	require_once("ControlBD.php");
	require("Conf.php");
	require("Apunte.php");
	$bd = ControlBD::getInstance();	

	$apunte = new Apuntes();


    $cod_apunte = $_POST['cod_apunte'];

    //$cod_apunte = 3;

    $ruta = "/PHP/".$apunte->getRuta($cod_apunte);
    $tipo_archivo = $apunte->getTipoArchivo($cod_apunte);
    $nombre = $cod_apunte.".".$tipo_archivo;

    if($tipo_archivo == "pdf"){
        header('Content-Type: application/pdf');
    }
    else if($tipo_archivo == "docx"){
        header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    }
    else if($tipo_archivo == "xlsx"){
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
    else if($tipo_archivo == "pptx"){
        header('Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation');
    }
    else if($tipo_archivo == "txt"){
        header('Content-Type: text/plain');
    }
    else if($tipo_archivo == "doc"){
        header('Content-Type: application/msword');
    }
    else if($tipo_archivo == "odt"){
        header('Content-Type: application/vnd.oasis.opendocument.text');
    }



    header("Content-Transfer-Encoding: Binary");
    header("Content-disposition: attachment; filename=$nombre");
    readfile($ruta);



    echo true;


 ?>