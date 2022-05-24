<?php

// Para pruebas de conexión  y llamadas a la base de datos 

require ("Conf.php");
require_once ("ControlBD.php");
$bd = ControlBD::getInstance();

require("Usuario.php");
$usuarios = new Usuarios();

$resultado = "hola <br>";
echo $resultado;

//$res = getArrayResult("select * from usuarios");
//$res = getJsonResult("select * from usuarios");
//echo $res;
?>
<!DOCTYPE html>
<html>
<head>
	<title>Pruebas</title>
</head>
<body>


<?php

$bd->conectarPrueba();

$query = "select * from usuarios";
$respuesta = $bd->seleccionar($query);
echo $respuesta;

echo "<pre>";
echo $respuesta;
echo "</pre>";

$otraRespuesta = $bd->seleccionarJSON($query);
//echo $respuesta;

echo "<pre>";
echo "hey";
echo "hola".$otraRespuesta[0]['nombre'];
echo "</pre>";

//$texto = getArrayResult("select * from usuarios");
//echo $texto;
$user = "alex";
echo "<pre>";
echo ($usuarios->getUsuario($user));
var_dump($usuarios->getUsuario($user));
echo "</pre>";
echo "<pre>";
echo ($usuarios->getDatos($user));
var_dump($usuarios->getDatos($user));
echo "</pre>";




?>
</body>
</html>
