<?php

// Control de base de datos
// Repasar

class ControlBD {

    private $servidor = "localhost";
    private $usuario = "alexarco_alex";
    private $password = "alex5564";
    private $bd = "alexarco_apunteca";
    private $conn;
    private $stmt;
    private $array;
    private $arrayAsoc;
    private static $instance;


    private function __construct() {
        $this->setConexion();
        $this->conectar();
    }

    public static function getInstance() {
        if (!(self::$instance instanceof self)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    //Establece los parámetros de la conexión
    private function setConexion() {
        $conf = Conf::getInstance();
        $this->servidor = $conf->getServidor();
        $this->base_datos = $conf->getBd();
        $this->usuario = $conf->getUsuario();
        $this->password = $conf->getPassword();
    }

    //Realiza la conexión a la base de datos
    private function conectar() {
        $this->conn = mysqli_connect($this->servidor, $this->usuario, $this->password, $this->bd);
        $acentos = $this->ejecutar("SET NAMES 'utf8'");
    }

    //Para pruebas de conexión a la base de datos
    function conectarPrueba(){
        $enlace = mysqli_connect($this->servidor, $this->usuario, $this->password, $this->bd);
        if (!$enlace) {
            die('No pudo conectarse a la base de datos: ' . mysqli_error());
        }else{
            echo "Éxito: Se realizó una conexión apropiada a MySQL!";
            echo "Información del host: " . mysqli_get_host_info($enlace);
        }
    }


    //Ejecutar una sentencia sql
    function ejecutar($sql) {
        $this->stmt = mysqli_query($this->conn, $sql);
    }

    //ejecuta una sentencia sql y la devuelve
    public function execute($sql) {
        $this->stmt = mysqli_query($this->conn, $sql);
        return $this->stmt;
    }

    function getFila($fila = 0) {
        $this->stmt->data_seek($fila);
        $row = $this->stmt->fetch_row();
        return $row;
    }

    public function getRow() {
        if (mysqli_num_rows($this->stmt) > 0) {
            $row = mysqli_fetch_array($this->stmt);
            return $row;
        }
        return null;
    }

    function getFilaJSON($fila = 0) {
        $this->stmt->data_seek($fila);
        $row = $this->stmt->fetch_row();
        $row = json_decode(json_encode($row),true);
        return $row;
    }

    function getDato($fila = 0, $campo = 0) {
        $row = $this->getFila($fila);
        return $row[$campo];
    }

    //Obtener un array de resultados
    function seleccionar($sql) {
        $array = array();
        $this->ejecutar($sql);
        while ($fila = mysqli_fetch_array($this->stmt)) {
            $array[] = $fila;
        }
        mysqli_free_result($this->stmt);
        return $array;
    }

    //Devuelve una array asociativa del resultado de la consulta
    function seleccionarJSON($sql) {
        $array = array();
        $this->ejecutar($sql);
        while ($fila = mysqli_fetch_array($this->stmt)) {
            $array[] = $fila;
        }
        mysqli_free_result($this->stmt);
    
        $arrayAsoc = json_decode(json_encode($array),true);
        //var_dump($objetoJSON);
        return $arrayAsoc;
    }

    function getNumeroResultados() {
        $count = 0;
        while ($fila = mysqli_fetch_array($this->stmt)) {
            $count++;
        }
        mysqli_free_result($this->stmt);
        return $count;
    }

    //Devuelve el último id del insert introducido
    function lastID() {
        return mysqli_insert_id($this->conn);
    }

}

?>