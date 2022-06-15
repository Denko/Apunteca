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

    $nombreUsuario = $_POST['inputUsuario'];
    $password = $_POST['inputPassword'];
	$passwordCodificado = $_POST['passwordCodificado'];

//    $nombreUsuario = $_POST['nombre'];
//    $password = $_POST['password'];

   // echo $nombreUsuario;
    //echo $password;

/*
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$nombre = $request->nombre;
	$pass = $request->pass;

*/

	if ($usuarios->comprobarUsuario($nombreUsuario, $passwordCodificado)) {

		$datos = $usuarios->getDatos($nombreUsuario);
		//$response = json_encode($datos);
		$response = array("success"=>true, "perfil"=>$datos);
		
	}
	else {
			$response = array("success"=>false, "error"=>"El nombre y/o la contraseña son incorrectos");
	}
echo json_encode($response);





 ?>