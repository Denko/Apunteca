<?php

class Apuntes{

    private $bd;
    private $tabla;

    function __construct()
		{
			$this->bd = ControlBD::getInstance();
			$this->tabla = "apuntes";
		}

    function addApunte($propietario, $ruta, $nombre, $centro, $asignatura, $descripcion, $fechaSubida) {
        //$pass = md5($pass);
        $query = "INSERT INTO apuntes (propietario, ruta, nombre, centro, asignatura, compartido, descripcion, num_descargas, fecha_subida) VALUES ('".$propietario."', '".$ruta."', '".$nombre."', '".$centro."', '".$asignatura."', '1', '".$descripcion."', '0', '".$fechaSubida."')";
        $this->bd->ejecutar($query);
    }

    function ultimoCodApunte(){
        $query = "SELECT cod_apunte FROM apuntes ORDER BY cod_apunte DESC LIMIT 1";
        $this->bd->ejecutar($query);
        $fila = $this->bd->getFila();
        return $fila[0];
    }

    function borrarApunte($cod_apunte)
    {
        //Comprobar primero si el usuario user es el propietario del apunte

        $query = "DELETE FROM ".$this->tabla." WHERE cod_apunte = '".$cod_apunte."'";
        $this->bd->ejecutar($query);
    }

    function borrarDeBiblioteca($cod_apunte,$cod_usuario){
        $query = "DELETE FROM biblioteca WHERE cod_apunte = '".$cod_apunte."' AND cod_usuario = '".$cod_usuario."'";
        $this->bd->ejecutar($query);
    }

    function addBiblioteca($propietario, $suCodApunte, $fechaSubida){
        $query = "INSERT INTO biblioteca (codigo_apunte, cod_usuario, fecha) VALUES ('".$suCodApunte."', '".$propietario."', '".$fechaSubida."')";
        $this->bd->ejecutar($query);
        
    }

    function cambiarCompartido($cod_usuario,$cod_apunte,$compartido){

        $fechaHoy = date("m.d.y");

        if($compartido == '1'){
            $query = "UPDATE apuntes SET compartido = '0' WHERE cod_apunte = '".$cod_apunte."'";
            $this->bd->ejecutar($query);
            $query = "DELETE FROM biblioteca WHERE codigo_apunte = '".$cod_apunte."'";
            $this->bd->ejecutar($query);
            $query = "INSERT INTO biblioteca (codigo_apunte, cod_usuario, fecha) VALUES ('".$cod_apunte."', '".$cod_usuario."', '".$fechaHoy."')";
            $this->bd->ejecutar($query);
        }else{
            $query = "UPDATE apuntes SET compartido = '1' WHERE cod_apunte = '".$cod_apunte."'";
            $this->bd->ejecutar($query);
        }  
        
    }

    //TODO
    //Devuelve 
    function getApuntesUsuario($cod_usuario)
    {
        $query = "select apuntes.cod_apunte, apuntes.propietario, apuntes.ruta, apuntes.nombre, apuntes.centro, apuntes.asignatura, apuntes.compartido, apuntes.descripcion, apuntes.num_descargas, apuntes.fecha_subida from biblioteca join apuntes on biblioteca.cod_apunte = apuntes.cod_apunte where biblioteca.cod_usuario = '".$cod_usuario."'";
        //$this->bd->ejecutar($query);
        $lista = array();
        $lista = $this->bd->seleccionar($query);
        return $lista;
    }

    function getDatosApunte($cod_apunte){
        $query = "SELECT * FROM apuntes WHERE cod_apunte = '".$cod_apunte."'";
        $this->bd->ejecutar($query);
        $fila = $this->bd->getFila();
        return $fila;
    }






}

?>