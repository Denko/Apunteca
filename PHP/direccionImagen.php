<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
	/*Para conexión con App Ionic

 	//http://stackoverflow.com/questions/18382740/cors-not-working-php
 	if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
 
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
 
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
 
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
 
        exit(0);
    }
	*/

	
	require_once("ControlBD.php");
	require("Conf.php");
	require("Usuario.php");
	$bd = ControlBD::getInstance();	
	$usuarios = new Usuarios();

    $nombreUsuario = $_POST['usuarioB'];

    $respuesta = $usuarios->getURL($nombreUsuario);
    //$respuesta = $usuarios->getURL("alex");

    //echo $usuarios->getURL("alex");
    //echo $usuarios->getURL($nombreUsuario);
    $response = array("success"=>true, "data"=>$respuesta);


echo json_encode($response);


 ?>