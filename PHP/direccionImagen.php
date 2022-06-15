<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


	
	require_once("ControlBD.php");
	require("Conf.php");
	require("Usuario.php");
	$bd = ControlBD::getInstance();	
	$usuarios = new Usuarios();

    $nombreUsuario = $_POST['usuarioB'];

    

    $respuesta = $usuarios->getURL($nombreUsuario);


    $response = array("success"=>true, "data"=>$respuesta);


echo json_encode($response);


 ?>