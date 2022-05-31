<?php

require_once("ControlBD.php");
require("Conf.php");
require("Usuario.php");

$bd = ControlBD::getInstance();

$nombreUsuario = $_POST['inputUsuario'];
$password = $_POST['inputPassword'];
$password2 = $_POST['inputPassword2'];
$nombre = $_POST['inputNombre'];
$email = $_POST['inputEmail'];
$imagen = null;
$centro = $_POST['inputCentro'];
$estudios = $_POST['inputEstudios'];
$comentario = $_POST['inputComentario'];

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
    }
 }

//Comprobamos que el nombre_usuario no coincida con otro
$usuario = new Usuarios();
if($usuario->existe($nombreUsuario)){
    echo "el usuario ya existe";
    return false;
}else{
    $usuario->addUsuario();
    $query = "INSERT INTO usuarios (nombre_usuario, password, nombre, email, centro, estudios, comentario, imagen) VALUES ('".$nombreUsuario."', '".$password."', '".$nombre."', '".$email."', '".$centro."', '".$estudios."', '".$comentario."', '".$imagen."')";
    $this->bd->ejecutar($query);
    echo "Usuario registrado";
    return true;
}




?>