<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


	
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