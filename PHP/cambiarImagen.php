<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once("ControlBD.php");
require("Conf.php");
require("Usuario.php");

$bd = ControlBD::getInstance();

$usuarios = new Usuarios();

$nombreUsuario = $_POST['formDatosUsuario'];
$imagen = $_FILES['formNuevaImagen'];


$errors= array();

//Si se sube una imagen
if(isset($_FILES['formNuevaImagen'])){
        
        $file_name = $_FILES['formNuevaImagen']['name'];
        $file_size = $_FILES['formNuevaImagen']['size'];
        $file_tmp = $_FILES['formNuevaImagen']['tmp_name'];
        $file_type = $_FILES['formNuevaImagen']['type'];
        $file_ext=strtolower(end(explode('.',$_FILES['formNuevaImagen']['name'])));
    
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
        $nombreImagen = "img/".$file_name;
        $usuarios->updateImagenUsuario($nombreUsuario, $nombreImagen);
        
        echo true;
    }else{
        //print_r($errors);
        //$imagen = null;
        //Ponemos la imagen por defecto
        //$imagen = "img/default.png";
        echo false;
    }
 }









?>