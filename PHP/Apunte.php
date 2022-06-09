<?php

class Apuntes{

    private $bd;
    private $tabla;

    function __construct()
		{
			$this->bd = ControlBD::getInstance();
			$this->tabla = "apuntes";
		}

    function addApunte($propietario, $ruta, $nombre, $centro, $asignatura, $descripcion, $fechaSubida, $tipo_archivo) {
        //$pass = md5($pass);
        $query = "INSERT INTO apuntes (propietario, ruta, nombre, centro, asignatura, compartido, descripcion, num_descargas, fecha_subida, tipo_archivo) VALUES ('".$propietario."', '".$ruta."', '".$nombre."', '".$centro."', '".$asignatura."', '1', '".$descripcion."', '0', '".$fechaSubida."', '".$tipo_archivo."')";
        $this->bd->ejecutar($query);
    }

    function ultimoCodApunte(){
        $query = "SELECT cod_apunte FROM apuntes ORDER BY cod_apunte DESC LIMIT 1";
        $this->bd->ejecutar($query);
        $fila = $this->bd->getFila();
        return $fila[0];
    }

    function borrarDeBiblioteca($cod_apunte,$cod_usuario){
        $query = "DELETE FROM biblioteca WHERE cod_apunte = '".$cod_apunte."' AND cod_usuario = '".$cod_usuario."'";
        $this->bd->ejecutar($query);
    }

    function addBiblioteca($propietario, $suCodApunte, $fechaSubida){
        $query = "INSERT INTO biblioteca (cod_apunte, cod_usuario, fecha) VALUES ('".$suCodApunte."', '".$propietario."', '".$fechaSubida."')";
        $this->bd->ejecutar($query);
        
    }

    function getPropietario($cod_apunte){
        $query = "SELECT propietario FROM apuntes WHERE cod_apunte = '".$cod_apunte."'";
        $this->bd->ejecutar($query);
        $fila = $this->bd->getFila();
        return $fila[0];
    }

    function getRuta($cod_apunte){
        $query = "SELECT ruta FROM apuntes WHERE cod_apunte = '".$cod_apunte."'";
        $this->bd->ejecutar($query);
        $fila = $this->bd->getFila();
        return $fila[0];
    }

    function getTipoArchivo($cod_apunte){
        $query = "SELECT tipo_archivo FROM apuntes WHERE cod_apunte = '".$cod_apunte."'";
        $this->bd->ejecutar($query);
        $fila = $this->bd->getFila();
        return $fila[0];
    }

    //Borra un apunte de la tabla apuntes
    function borrarApunteApuntes($cod_apunte){
            $query = "DELETE FROM apuntes WHERE cod_apunte = '".$cod_apunte."'";
            $this->bd->ejecutar($query);
    }

    function borrarApunteBiblioteca($cod_apunte,$cod_usuario){
        $query = "DELETE FROM biblioteca WHERE cod_apunte = '".$cod_apunte."' AND cod_usuario = '".$cod_usuario."'";
        $this->bd->ejecutar($query);
    }

    function setCompartido($cod_apunte, $compartido){
        $query = "UPDATE apuntes SET compartido = '".$compartido."' WHERE cod_apunte = '".$cod_apunte."'";
        $this->bd->ejecutar($query);
    }

    function borrarNoCompartidosDeBiblioteca($cod_apunte, $cod_usuario){
        $query = "DELETE FROM biblioteca WHERE cod_apunte = '".$cod_apunte."' AND cod_usuario != '".$cod_usuario."'";
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

    function sumarDescarga($cod_apunte){
        $query = "UPDATE apuntes SET num_descargas = num_descargas + 1 WHERE cod_apunte = '".$cod_apunte."'";
        $this->bd->ejecutar($query);
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


    function buscarApuntes($busqueda){
        $query = "SELECT apuntes.nombre, apuntes.fecha_subida, apuntes.num_descargas, apuntes.asignatura, apuntes.centro, apuntes.descripcion, apuntes.propietario, apuntes.cod_apunte, usuarios.nombre as nombre_usuario, biblioteca.cod_apunte as cod_apunte_biblioteca
                FROM apuntes JOIN biblioteca ON apuntes.cod_apunte = biblioteca.cod_apunte JOIN usuarios ON biblioteca.cod_usuario = usuarios.cod_usuario 
                WHERE LOWER(apuntes.nombre) LIKE LOWER('%".$busqueda."%') OR LOWER(apuntes.asignatura) LIKE LOWER('%".$busqueda."%')";
        //$query = "SELECT * FROM apuntes WHERE nombre LIKE '%".$busqueda."%'";
        $this->bd->ejecutar($query);
        $lista = array();
        $lista = $this->bd->seleccionar($query);
        return $lista;
    }




}

?>