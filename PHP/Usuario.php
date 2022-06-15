<?php

class Usuarios {

    private $bd;
    private $tabla;

    function __construct() {
        $this->bd = ControlBD::getInstance();
        $this->tabla = "usuarios";
    }

    function getUsuario($user) {
        $query = "SELECT * from ".$this->tabla." WHERE nombre_usuario='".$user."'";
        $this->bd->ejecutar($query);
        $u = $this->bd->getFila(0);
        return $u;
    }

    function getDatos($user) {
        $query = "SELECT nombre, email, centro, estudios, comentario, imagen, cod_usuario FROM usuarios WHERE nombre_usuario='".$user."'";
        $this->bd->ejecutar($query);
        $fila = $this->bd->getFila(0);
        $usuario = array(
            "nombre"=> $fila[0],
            "email"=> $fila[1],
            "centro"=> $fila[2],
            "estudios"=> $fila[3],
            "comentario"=> $fila[4],
            "imagen"=> $fila[5],
            "cod_usuario"=> $fila[6]
        );
        return $usuario;


        //return $this->bd->getFila();
    }

    function getURL($user){
        $this->bd->ejecutar("SELECT imagen FROM usuarios WHERE nombre_usuario='".$user."'");
        return $this->bd->getDato();
    }

    function getUserById($user) {
        $query = "SELECT nombre, email, centro, estudios, comentario, imagen FROM usuarios WHERE nombre_usuario='".$user."'";
        $this->bd->execute($query);
        $row = $this->bd->getRow();
        $data = array(
            "nombre"=> $fila[0],
            "email"=> $fila[1],
            "centro"=> $fila[2],
            "estudios"=> $fila[3],
            "comentario"=> $fila[4],
            "imagen"=> $fila[5],
        );
        return $data;
    }

    //devuelve el nombre real del usuario
    // Antiguo getGuest
    function getNombre($user) {
        $this->bd->ejecutar("SELECT nombre FROM usuarios WHERE nombre_usuario='".$user."'");
        return $this->bd->getDato();
    }

    function comprobarUsuario($user, $pass) {
        //$pass = md5($pass);
        $query = "SELECT count(*) FROM usuarios WHERE nombre_usuario='".$user."' AND password='".$pass."'";
        $this->bd->ejecutar($query);
        if ($this->bd->getDato() != 0) return true;
        else return false;
        }

    function existe($user) {
        $query = "SELECT count(*) FROM usuarios WHERE nombre_usuario='".$user."'";
        $this->bd->ejecutar($query);
        if ($this->bd->getDato() != 0) return true;
        else return false;
    }

    function existeCorreo($correo) {
        $query = "SELECT count(*) FROM usuarios WHERE email='".$correo."'";
        $this->bd->ejecutar($query);
        if ($this->bd->getDato() != 0) return true;
        else return false;
    }

    function getTodos() {
        $query = "SELECT * FROM ".$this->tabla;
        $usuarios = $this->bd->seleccionar($query);
        return $usuarios;
    }

    //devuelve todos los nombres de usuario
    function getNombres() {
        $indices = array();
        $query = "SELECT usuario FROM ".$this->tabla;
        $result = $this->bd->seleccionar($query);
        foreach ($result as $id) {
            $indices[] = $id[0];
        }
        return $indices;
    }

    function getDatosAccesoPorCorreo($correoRecibido) {
        $query = "SELECT nombre_usuario, password FROM usuarios WHERE email='".$correoRecibido."'";
        $this->bd->ejecutar($query);
        $fila = $this->bd->getFila(0);
        $usuario = array(
            "nombre_usuario"=> $fila[0],
            "password"=> $fila[1]
        );
        return $usuario;
    }

    function addUsuario($nombreUsuario, $password, $nombre, $email, $centro, $estudios, $comentario, $imagen) {
        //$pass = md5($pass);
        $query = "INSERT INTO usuarios (nombre_usuario, password, nombre, email, centro, estudios, comentario, imagen) VALUES ('".$nombreUsuario."', '".$password."', '".$nombre."', '".$email."', '".$centro."', '".$estudios."', '".$comentario."', '".$imagen."')";
        $this->bd->ejecutar($query);
    }

    function borrarUsuario($user) {
        $query = "DELETE FROM ".$this->tabla." WHERE nombre_usuario='".$user."'";
        $this->bd->ejecutar($query);
    }

    function updateUsuario($nombreUsuario, $password, $nombre, $email, $centro, $estudios, $comentario, $imagen) {
        $query = "UPDATE usuarios SET nombre='".$nombre."', email='".$email."', centro='".$centro."', estudios='".$estudios."', comentario='".$comentario."', imagen='".$imagen."' WHERE nombre_usuario='".$nombreUsuario."' ";
        $this->bd->ejecutar($query);
    }

    function updateDatosUsuario($nombreUsuario, $password, $nombre, $email, $centro, $estudios, $comentario) {
        $query = "UPDATE usuarios SET nombre='".$nombre."', email='".$email."', centro='".$centro."', estudios='".$estudios."', comentario='".$comentario."' WHERE nombre_usuario='".$nombreUsuario."' ";
        $this->bd->ejecutar($query);
    }

    function updateImagenUsuario($nombreUsuario, $imagen) {
        $query = "UPDATE usuarios SET imagen='".$imagen."' WHERE nombre_usuario='".$nombreUsuario."' ";
        $this->bd->ejecutar($query);
    }

    function cambiarPassword($user, $pass) {
        $pass = md5($pass);
        $query = "UPDATE usuarios SET password='".$pass."' WHERE nombre_usuario='".$user."'";
        $this->bd->ejecutar($query);
    }


    //Para otro tipo de búsqueda conjunta (sin probar)
    function getUsuarioBuscador($user,$asignatura,$universidad)
    {
        //solo nombre
        if ((($asignatura=="") && ($universidad=="")) || (($asignatura==null) && ($universidad==null))) {
            $data = array();
            $query = "SELECT cod_apunte, nombre_usuario, propietario, direccion, universidad, facultad, asignatura, descripcion, fecha, compartido FROM apuntes WHERE nombre_usuario = '".$user."'";
            $result = $this->bd->seleccionar($query);
            foreach ($result as $id) {
                $data[] = array(
                    "cod_apunte"=> $id[0],
                    "nombre_usuario"=> $id[1],
                    "propietario"=> $id[2],
                    "direccion"=> $id[3],
                    "universidad"=> $id[4],
                    "facultad"=> $id[5],
                    "asignatura"=> $id[6],
                    "descripcion"=> $id[7],
                    "fecha"=> $id[8],
                    "compartido"=> $id[9]
                );
            }
            return $data;
        }
        //solo asignatura
        if ((($user=="") && ($universidad=="")) || (($user==null) && ($universidad==null))) {
            $data = array();
            $query = "SELECT cod_apunte, nombre_usuario, propietario, direccion, universidad, facultad, asignatura, descripcion, fecha, compartido FROM apuntes WHERE asignatura = '".$asignatura."'";
            $result = $this->bd->seleccionar($query);
            foreach ($result as $id) {
                $data[] = array(
                    "cod_apunte"=> $id[0],
                    "nombre_usuario"=> $id[1],
                    "propietario"=> $id[2],
                    "direccion"=> $id[3],
                    "universidad"=> $id[4],
                    "facultad"=> $id[5],
                    "asignatura"=> $id[6],
                    "descripcion"=> $id[7],
                    "fecha"=> $id[8],
                    "compartido"=> $id[9]
                );
            }
            return $data;
        }
        //solo universidad
        if ((($asignatura=="") && ($user=="")) || (($asignatura==null) && ($user==null))) {
            $data = array();
            $query = "SELECT cod_apunte, nombre_usuario, propietario, direccion, universidad, facultad, asignatura, descripcion, fecha, compartido FROM apuntes WHERE universidad = '".$universidad."'";
            $result = $this->bd->seleccionar($query);
            foreach ($result as $id) {
                $data[] = array(
                    "cod_apunte"=> $id[0],
                    "nombre_usuario"=> $id[1],
                    "propietario"=> $id[2],
                    "direccion"=> $id[3],
                    "universidad"=> $id[4],
                    "facultad"=> $id[5],
                    "asignatura"=> $id[6],
                    "descripcion"=> $id[7],
                    "fecha"=> $id[8],
                    "compartido"=> $id[9]
                );
            }
            return $data;
        }
        //usuario-asignatura  
        if ((($asignatura!=null)&&($universidad==null)&&($usuario!=null)) || (($asignatura!="")&&($universidad=="")&&($usuario!=""))) {
            $data = array();
            $query = "SELECT cod_apunte, nombre_usuario, propietario, direccion, universidad, facultad, asignatura, descripcion, fecha, compartido FROM apuntes WHERE nombre_usuario = '".$user."' AND asignatura = '".$asignatura."'";
            $result = $this->bd->seleccionar($query);
            foreach ($result as $id) {
                $data[] = array(
                    "cod_apunte"=> $id[0],
                    "nombre_usuario"=> $id[1],
                    "propietario"=> $id[2],
                    "direccion"=> $id[3],
                    "universidad"=> $id[4],
                    "facultad"=> $id[5],
                    "asignatura"=> $id[6],
                    "descripcion"=> $id[7],
                    "fecha"=> $id[8],
                    "compartido"=> $id[9]
                );
            }
            return $data;
        }
        //usuario-universidad
        if ((($asignatura==null)&&($universidad!=null)&&($usuario!=null)) || (($asignatura=="")&&($universidad!="")&&($usuario!=""))) {
            $data = array();
            $query = "SELECT cod_apunte, nombre_usuario, propietario, direccion, universidad, facultad, asignatura, descripcion, fecha, compartido FROM apuntes WHERE nombre_usuario = '".$user."' AND universidad = '".$universidad."'";
            $result = $this->bd->seleccionar($query);
            foreach ($result as $id) {
                $data[] = array(
                    "cod_apunte"=> $id[0],
                    "nombre_usuario"=> $id[1],
                    "propietario"=> $id[2],
                    "direccion"=> $id[3],
                    "universidad"=> $id[4],
                    "facultad"=> $id[5],
                    "asignatura"=> $id[6],
                    "descripcion"=> $id[7],
                    "fecha"=> $id[8],
                    "compartido"=> $id[9]
                );
            }
            return $data;
        }
        //asignatura-universidad
        if ((($asignatura!=null)&&($universidad!=null)&&($usuario==null)) || (($asignatura!="")&&($universidad!="")&&($usuario==""))) {
            $data = array();
            $query = "SELECT cod_apunte, nombre_usuario, propietario, direccion, universidad, facultad, asignatura, descripcion, fecha, compartido FROM apuntes WHERE asignatura = '".$asignatura."' AND universidad = '".$universidad."'";
            $result = $this->bd->seleccionar($query);
            foreach ($result as $id) {
                $data[] = array(
                    "cod_apunte"=> $id[0],
                    "nombre_usuario"=> $id[1],
                    "propietario"=> $id[2],
                    "direccion"=> $id[3],
                    "universidad"=> $id[4],
                    "facultad"=> $id[5],
                    "asignatura"=> $id[6],
                    "descripcion"=> $id[7],
                    "fecha"=> $id[8],
                    "compartido"=> $id[9]
                );
            }
            return $data;
        }
        //usuario-asignatura-universidad
        if ((($asignatura!=null)&&($universidad!=null)&&($usuario!=null)) || (($asignatura!="")&&($universidad!="")&&($usuario!=""))) {
            $data = array();
            $query = "SELECT cod_apunte, nombre_usuario, propietario, direccion, universidad, facultad, asignatura, descripcion, fecha, compartido FROM apuntes WHERE nombre_usuario = '".$user."' AND asignatura = '".$asignatura."' AND universidad = '".$universidad."'";
            $result = $this->bd->seleccionar($query);
            foreach ($result as $id) {
                $data[] = array(
                    "cod_apunte"=> $id[0],
                    "nombre_usuario"=> $id[1],
                    "propietario"=> $id[2],
                    "direccion"=> $id[3],
                    "universidad"=> $id[4],
                    "facultad"=> $id[5],
                    "asignatura"=> $id[6],
                    "descripcion"=> $id[7],
                    "fecha"=> $id[8],
                    "compartido"=> $id[9]
                );
            }
            return $data;
        }
    }



}

?>