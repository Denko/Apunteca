<?php

// Control de Sesiones REPASAR

class Session {

    function __construct() {
        session_start();
    }

    public function setVariable($nombre, $valor) {
        $_SESSION[$nombre] = $valor;
    }

    public function getVariable($nombre) {
        if (isset($_SESSION[$nombre]))
            return $_SESSION[$nombre];
        else
            return false;
    }

    public function mostrarVariable($nombre) {
        if (isset($_SESSION[$nombre]))
            echo $_SESSION[$nombre];
        else
            echo("");
    }

    public function mostrarTodasVariables() {
        echo "<ul>";
        foreach ($_SESSION as $indice => $valor) {
            echo "<li>$indice: $valor";
        }
        echo "</ul>";
    }

    public function borrarVariable($nombre) {
        if (isset($_SESSION[$nombre]))
            unset($_SESSION[$nombre]);
    }

    public function cerrarSesion() {
        $_SESSION = array();
        session_destroy();
    }

}

?>