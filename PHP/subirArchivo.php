<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require_once("ControlBD.php");
require("Conf.php");
require("Apunte.php");

$bd = ControlBD::getInstance();

$apuntes = new Apuntes();

$propietario = $_POST['propietario'];
$archivo = $_FILES['fileArchivo'];
$nombre = $_POST['nombreArchivo'];
$asignatura = $_POST['asignaturaArchivo'];
$centro = $_POST['centroArchivo'];
$descripcion = $_POST['descripcionArchivo'];

$suCodApunte = $apuntes->ultimoCodApunte()+1;

$errors= array();

if(isset($_FILES['fileArchivo'])){
        
    $file_name = $_FILES['fileArchivo']['name'];
    $file_size = $_FILES['fileArchivo']['size'];
    $file_tmp = $_FILES['fileArchivo']['tmp_name'];
    $file_type = $_FILES['fileArchivo']['type'];
    //$file_ext=strtolower(end(explode('.',$_FILES['fileArchivo']['name'])));
    $file_ext= pathinfo($_FILES['fileArchivo']['name'], PATHINFO_EXTENSION);

    $expensions= array("pdf","txt","odt","doc"."docx");

    if(in_array($file_ext,$expensions)=== false){
        $errors[]="extensión no permitida, sube archivo con extensión .pdf, .txt, .odt, .doc, .docx., .ppt, .pptx, .xls, .xlsx, .pages";
    }

    if($file_size > 50971520) {
        $errors[]='Archivos menores de 50 MB';
    }

    //Si no hay errores
    if(empty($errors)==true) {
        //Cambiamos el nombre del archivo al nombre del usuario + cod_apunte para que no coincida con otros
        //cod_apunte lo sacamos cogiendo el último apunte de  la lista +1
        $file_name = $propietario."_".$suCodApunte.".".$file_ext;
        move_uploaded_file($file_tmp,"apuntes/".$file_name);
        $ruta = "apuntes/".$file_name;

        $fechaSubida = date("m.d.y"); 

        //Añadimos el apunte a la base de datos
        $apuntes->addApunte($propietario, $ruta, $nombre, $centro, $asignatura, $descripcion, $fechaSubida, $file_ext);
        //Añade el apunte a la tabla biblioteca
        $apuntes->addBiblioteca($propietario, $suCodApunte, $fechaSubida);
        
        echo true;

        //$response = array("success"=>true, "datos"=>$ruta);
    }else{
        //print_r($errors);
        echo false;
        //$response = array("success"=>false, "perfil"=>$errors);
    }
}


//echo json_encode($response);




?>