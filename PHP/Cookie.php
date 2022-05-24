<?php

// Clase Cookie y manejo
// TODO

class Cookie {

    function __construct() {
        
    }

    function setCookie($nombre, $valor, $expiracion = 0, $ruta = "", $dominio = "", $seguro = 0) {

        setCookie($nombre, $valor, $expiracion, $ruta, $dominio, $seguro);

    }

    function getCookie($nombre) {

        if (isset($_COOKIE[$nombre])) {
            return $_COOKIE[$nombre];
        } else {
            return false;
        }

    }

    function borrarCookie($nombre) {

        if (isset($_COOKIE[$nombre])) {
            setcookie($nombre, "", time() - 3600);
        }

    }

}

?>