<?php  

	// Clase Usuario

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
			$query = "SELECT nombre, apellidos, telefono, direccion, universidad, facultad, curso, clases_particulares, imagen, email, comentario FROM usuarios WHERE nombre_usuario='".$user."'";
			$this->bd->ejecutar($query);
			$fila = $this->bd->getFila(0);
			$usuario = array(
	            "nombre"=> $fila[0],
	            "apellidos"=> $fila[1],
	            "telefono"=> $fila[2],
	            "direccion"=> $fila[3],
	            "universidad"=> $fila[4],
	            "facultad"=> $fila[5],
	            "curso"=> $fila[6],
	            "clases_particulares"=> $fila[7],
	            "imagen"=> $fila[8],
	            "email"=> $fila[9],
	            "comentario"=> $fila[10]
	        );
	        return $usuario;


			//return $this->bd->getFila();
		}

		function getUserById($user) {
	        $query = "SELECT nombre, apellidos, telefono, direccion, universidad, facultad, curso, clases_particulares, imagen, email, comentario FROM usuarios WHERE nombre_usuario='".$user."'";
	        $this->bd->execute($query);
	        $row = $this->bd->getRow();
	        $data = array(
	            "nombre"=> $row[0],
	            "apellidos"=> $row[1],
	            "telefono"=> $row[2],
	            "direccion"=> $row[3],
	            "universidad"=> $row[4],
	            "facultad"=> $row[5],
	            "curso"=> $row[6],
	            "clases_particulares"=> $row[7],
	            "imagen"=> $row[8],
	            "email"=> $row[9],
	            "comentario"=> $row[10]
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

		function addUsuario($usuario, $pass, $nombre, $apellidos, $telefono, $direccion, $universidad, $facultad, $curso, $clases_particulares, $imagen, $email, $comentario) {
			//$pass = md5($pass);
			$query = "INSERT INTO usuarios (nombre_usuario, password, nombre, apellidos, tipo, direccion, telefono, universidad, facultad, curso, clases_particulares, imagen, email,comentario) VALUES ('".$usuario."', '".$pass."', '".$nombre."', '".$apellidos."', 'usuario', '".$direccion."', '".$telefono."', '".$universidad."', '".$facultad."', '".$curso."', '".$clases_particulares."', '".$imagen."', '".$email."', '".$comentario."')";
			$this->bd->ejecutar($query);
		}

		function borrarUsuario($user) {
			$query = "DELETE FROM ".$this->tabla." WHERE nombre_usuario='".$user."'";
			$this->bd->ejecutar($query);
		}

		function updateUsuario($user, $nombre, $apellidos, $telefono, $direccion, $universidad, $facultad, $curso, $clases_particulares, $imagen, $email, $comentario) {
			$query = "UPDATE usuarios SET nombre='".$nombre."', apellidos='".$apellidos."', telefono='".$telefono."', direccion='".$direccion."', universidad='".$universidad."', facultad='".$facultad."', curso='".$curso."', clases_particulares='".$clases_particulares."', imagen='".$imagen."', email='".$email."', comentario='".$comentario."' WHERE nombre_usuario='".$user."' ";
			$this->bd->ejecutar($query);
		}

		function cambiarPassword($user, $pass) {
			$pass = md5($pass);
			$query = "UPDATE usuarios SET password='".$pass."' WHERE nombre_usuario='".$user."'";
			$this->bd->ejecutar($query);
		}

		

	}

?>