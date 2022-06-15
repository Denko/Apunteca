<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');


	
	require_once("ControlBD.php");
	require("Conf.php");
	require("Usuario.php");
	$bd = ControlBD::getInstance();	
	$usuarios = new Usuarios();

    $correoRecibido = $_POST['correoRecuperarCuenta'];
    //$correoRecibido = 'alexarcosarria@gmail.com';

    if ($usuarios->existeCorreo($correoRecibido)) {
        
        $datos = $usuarios->getDatosAccesoPorCorreo($correoRecibido);

        $passwordDecodificado = base64_decode($datos['password']);
        

        //echo $datos['nombre_usuario'];
        //echo $datos['password'];

        $cabecera = 'From: alejandro@apunteca.es';
        $asunto = 'Apunteca: Recuperación de datos de acceso';
        $mensaje = 'Hola, te enviamos tus datos de acceso a Apunteca:' . "\n\n" . 'Tu usuario es: '. $datos['nombre_usuario']  . "\n\n" . 'Tu contraseña es: ' . $passwordDecodificado . "\n\n" . 'Saludos,' . "\n" . 'Apunteca';
        
        mail($correoRecibido, $asunto, $mensaje, $cabecera);

        $response = array("success"=>true, "exito"=>"El correo se ha enviado correctamente");

    }
    else {
        $response = array("success"=>false, "error"=>"El correo no existe");
    }
        

echo json_encode($response);


 ?>