<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once("ControlBD.php");
require("Conf.php");
require("Usuario.php");

$bd = ControlBD::getInstance();

$centro = null;
$estudios = null;
$comentario = null;
$imagen = null;

$nombreUsuario = $_POST['inputUsuario'];
$password = $_POST['inputPassword'];
$password2 = $_POST['inputPassword2'];
$nombre = $_POST['inputNombre'];
$email = $_POST['inputEmail'];
$imagen = $_FILES['inputImagen'];
$centro = $_POST['inputCentro'];
$estudios = $_POST['inputEstudios'];
$comentario = $_POST['inputComentario'];

echo $nombreUsuario;

//Si se sube una imagen
if(isset($_FILES['inputImagen'])){
        $errors= array();
        $file_name = $_FILES['inputImagen']['name'];
        $file_size = $_FILES['inputImagen']['size'];
        $file_tmp = $_FILES['inputImagen']['tmp_name'];
        $file_type = $_FILES['inputImagen']['type'];
        $file_ext=strtolower(end(explode('.',$_FILES['inputImagen']['name'])));
    
        $expensions= array("jpeg","jpg","png");
   
    if(in_array($file_ext,$expensions)=== false){
        $errors[]="extensión no permitida, sube archivo JPG, JPEG or PNG file.";
    }
   
    if($file_size > 20971520) {
        $errors[]='Archivos menores de 20 MB';
    }
   
    if(empty($errors)==true) {
        //Cambiamos el nombre del archivo al nombre del usuario para que no coincida con otros
        $file_name = $nombreUsuario.".".$file_ext;
        move_uploaded_file($file_tmp,"img/".$file_name);
        $imagen = "img/".$file_name;
        echo "Success";
    }else{
        print_r($errors);
        //$imagen = null;
        //Ponemos la imagen por defecto
        $imagen = "img/default.png";
    }
 }


//Comprobamos que el nombre_usuario no coincida con otro
$usuario = new Usuarios();
//$usuario->addUsuario($nombreUsuario, $password, $nombre, $email, $imagen, $centro, $estudios, $comentario);


if($usuario->existe($nombreUsuario)){
    //echo "el usuario ya existe";
    //return false;
    $response = array("success"=>false, "respuesta"=>"El nombre de usuario ya existe");
}else{
    //$usuario->addUsuario();
    $query = "INSERT INTO usuarios (nombre_usuario, password, nombre, email, centro, estudios, comentario, imagen) VALUES ('".$nombreUsuario."', '".$password."', '".$nombre."', '".$email."', '".$centro."', '".$estudios."', '".$comentario."', '".$imagen."')";
    $bd->ejecutar($query);
    //echo "Usuario registrado";
    //return true;
    //$response = array("success"=>true, "respuesta"=>"Usuario registrado");
    $response["success"] = true;

}

echo json_encode($response);


?>