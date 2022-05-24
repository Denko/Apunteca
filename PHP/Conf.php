<?php 

 // Clase Conf

	Class Conf{

   private $_usuario;
   private $_password;
   private $_servidor;
   private $_bd;

   static $_instance;

   private function __construct(){
      require 'config.php';
      $this->_usuario=$usuario;
      $this->_password=$password;
      $this->_servidor=$servidor;
      $this->_bd=$bd;
   }

   private function __clone(){ }

   public static function getInstance(){
      if (!(self::$_instance instanceof self)){
         self::$_instance=new self();
      }
      return self::$_instance;
   }

   public function getUsuario(){
      $var=$this->_usuario;
      return $var;
   }

   public function getServidor(){
      $var=$this->_servidor;
      return $var;
   }

   public function getPassword(){
      $var=$this->_password;
      return $var;
   }

   public function getBd(){
      $var=$this->_bd;
      return $var;
   }

}

?>