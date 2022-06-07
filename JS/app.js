// Número aleatorio para crear el token de cada usuario
const NUM_TOKEN = 3215646463;

var datosUsuario;
var nombre;
var usuario;
var password;
var token;
var cod_usuario;
var email;
var centro;
var estudios;
var comentario;
var imagen = "";

var listadoMisDocumentos = Array();
var listadoMisDocumentosFiltrado = Array();

var listadoFiltroAsignaturas = Array();
var listadoFiltroAsignaturasUnicas = Array();




// Usa el cod_usuario para crear un token para la sesión
function crearToken(cod){
    return cod + NUM_TOKEN;
}

function comprobarToken(cod, token){
    if(crearToken(cod) == token){
        return true;
    }
    else{
        document.cookie = "nombre=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
        document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
        document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
        window.location.href = "/HTML/login.html";
        return false;
    }
}

function checkUser() {
    //var user = sessionStorage.getItem("usuario");
    var user = getCookie("usuario");
    if (user == "") {
        cerrarSesion();
        //goToLogin();
        goToPage("/HTML/login.html");
        /*
        user = prompt("Nombe de usuario:", "");
        if (user != "" && user != null) {
            setCookie("usuario", user);
        }*/
    }else{
        //Para entrar directamente a la página de inicio si se está logueado
        goToPage("/HTML/principal.html");
    }
    //openSession(user);
}

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (5*60*1000));
    var expires = "expires="+d.toUTCString();
    var path = "path=/";
    document.cookie = cname + "=" + cvalue + "; " + expires + "; " + path;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//Inicia los valores de la sesión del usuario
function iniciarSesion() {
    sessionStorage.setItem("usuario",document.getElementById("inputUsuario").value);
    sessionStorage.setItem("password",document.getElementById("inputPassword").value);
    sessionStorage.setItem("cod_usuario",getCookie("cod_usuario"));
    sessionStorage.setItem("token",getCookie("token"));
    sessionStorage.setItem("nombre",getCookie("nombre"));
    sessionStorage.setItem("email",getCookie("email"));
    sessionStorage.setItem("centro",getCookie("centro"));
    sessionStorage.setItem("estudios",getCookie("estudios"));
    sessionStorage.setItem("comentario",getCookie("comentario"));
    sessionStorage.setItem("imagen",getCookie("imagen"));



    console.log(sessionStorage.getItem("usuario"));
}

function cerrarSesion() {
    //Eliminar las cookies y enviar a la página de login
    document.cookie = "nombre=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/"; 
    document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
    document.cookie = "cod_usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
    document.cookie = "centro=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
    document.cookie = "estudios=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
    document.cookie = "comenatario=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
    document.cookie = "imagen=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
    console.log("Su sesión de usuario ha sido cerrada");
    window.location.href = "/HTML/login.html";

}


function loadCookiesUsuarioInVar(){
    cod_usuario = getCookie("cod_usuario");
    token = getCookie("token");
    nombre = getCookie("nombre");
    usuario = getCookie("usuario");
    password = getCookie("password");
    email = getCookie("email");
    centro = getCookie("centro");
    estudios = getCookie("estudios");
    comentario = getCookie("comentario");
    imagen = getCookie("imagen");
}


function guardarDatos(datos){
    datosUsuario = datos;
    console.log(datos);
    console.log(document.getElementById("inputUsuario").value);
}

function goToLogin() {
    window.location.href = "HTML/login.html";
}

function goToPage(page) {
    window.location.href = page;
}


function login(){

    formLogin.onsubmit = async (e) => {
        e.preventDefault();
        let form = new FormData(document.getElementById('formLogin'));
        //let form = new FormData(formLogin);
        console.log(form);
        console.log(form);
    
        let response = await fetch('/PHP/login.php', {
          method: 'POST',
          body: form
        });
      
        let result = await response.json();
        console.log(result.success);
        //console.log(result.perfil);
        if(result.success){
          
            /*
            document.cookie = "nombre="+result.perfil.nombre+"; path=/";
            document.cookie = "usuario="+formLogin.inputUsuario.value+"; path=/";
            document.cookie = "password="+formLogin.inputPassword.value+"; path=/";
            */
            setCookie("nombre", result.perfil.nombre);
            var usuario = document.getElementById("inputUsuario").value;
            var password = document.getElementById("inputPassword").value;
            setCookie("usuario", usuario);
            setCookie("password", password);
            setCookie("token", crearToken(result.perfil.cod_usuario));
            setCookie("cod_usuario", result.perfil.cod_usuario);
            setCookie("email", result.perfil.email);
            setCookie("centro", result.perfil.centro);
            setCookie("estudios", result.perfil.estudios);
            setCookie("comentario", result.perfil.comentario);
            setCookie("imagen", result.perfil.imagen);



            iniciarSesion();


          console.log(document.cookie);
          guardarDatos(result.perfil);
          window.location.href = '/HTML/principal.html';

        }else{
            var errorLogin = "Usuario o contraseña incorrectos";
            document.getElementById("errorLogin").innerHTML = errorLogin;
            console.log(getCookie("usuario"));
        }
        //alert(result.success);
      };
        
       


    /*

   // var formulario = document.getElementById("formLogin");
    //var datos = new FormData(formulario);
    var nombre = document.formLogin.inputUsuario.value;
    var password = document.formLogin.inputPassword.value;
    //console.log(datos);
    console.log(nombre, password);

    let button = document.getElementById("formLogin");
    let datos = new FormData();
    datos.append("nombre", nombre);
    datos.append("password", password);
    console.log(datos);

    fetch("http://localhost/PHP/login.php", {
        method: "POST",
        mode: "no-cors",
        body: datos,
        headers: {
            "Content-Type": "application/json"
        }
    })
      .then(Response=>Response.json())   
    .then(data=>{   
        console.log(data);
    });

    button.addEventListener('submit', (e)=>{
        e.preventDefault();
    }  );
*/

/*
    $.ajax({
        url: "http://localhost:3000/servidor/PHP/login.php",
        type: "POST",
        data: datos,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data){
            if(data == "true"){
                window.location.href = "/HTML/principal.html";
                }
                else{
                    alert("Error al registrar");
                }
            }
    });
*/

}

// Rellena los campos de mis datos con los datos del usuario guardados en las cookies
function loadMisDatos(){

    document.getElementById("formDatosNombre").value = getCookie("nombre");
    document.getElementById("formDatosUsuario").value = getCookie("usuario");
    document.getElementById("formDatosPassword").value = getCookie("password");
    document.getElementById("formDatosEmail").value = getCookie("email");
    document.getElementById("formDatosCentro").value = getCookie("centro");
    document.getElementById("formDatosEstudios").value = getCookie("estudios");
    document.getElementById("formDatosComentario").value = getCookie("comentario");
    document.getElementById("fotoPerfil").src = "/PHP/"+getCookie("imagen");
    
    console.log(getCookie("imagen"));

    
    /*
    if(getCookie("imagen") == "" || getCookie("imagen") == null || getCookie("imagen") == undefined){
        //Cargar la imagen por defecto
       

    }else{
        document.getElementById("fotoPerfil").src = "/PHP/"+getCookie("imagen");
        //console.log(getCookie("imagen"));
    }
    */

}

function registrarUsuario(){

    botonEnviarRegistro = document.getElementById("btnEnviar");
        formRegistro.onsubmit = async (e) => {
            e.preventDefault();

            

            let pass1 = document.getElementById("inputPassword").value;
            let pass2 = document.getElementById("inputPassword2").value;

            console.log(pass1, pass2);

            if(pass1 == pass2){

                botonEnviarRegistro.disabled = true;

                let form = new FormData(document.getElementById('formRegistro'));
            
                let response = await fetch('/PHP/registrar.php', {
                    method: 'POST',
                    body: form
                    });
                
                    let result = await response.text();
                    //console.log(result.perfil);
                    if(result=="usuario_creado"){
                        console.log(result);
                        window.alert("Usuario registrado correctamente");
                        botonEnviarRegistro.disabled = false;
                        window.location.href = '/HTML/login.html';
                    };
                    if(result=="usuario_existe"){
                        console.log(result);
                        botonEnviarRegistro.disabled = false;
                        //window.alert("El nombre de usuario ya existe, prueba con otro");
                        respuestaRegistro = "<p><b class='text-danger'>El nombre de usuario ya existe, prueba con otro</b></p>";
                        document.getElementById("respuestaRegistro").innerHTML = respuestaRegistro;
                    };
            }else{
                //window.alert("Las contraseñas no coinciden");
                respuestaRegistro = "<p><b class='text-danger'>Las contraseñas no coinciden</b></p>";
                document.getElementById("respuestaRegistro").innerHTML = respuestaRegistro;
            }

        
                
        };
}
    

//Para eliminar duplicados de una array
function eliminarDuplicadosArray(lista){
    var listaSinDuplicados = Array();
    for(var i = 0; i < lista.length; i++){
        if(listaSinDuplicados.indexOf(lista[i]) == -1){
            listaSinDuplicados.push(lista[i]);
        }
    }
    return listaSinDuplicados;
}

function rellenarFiltroAsignaturas(lstMisDocumentos) {
    listadoFiltroAsignaturas.length = 0;
    listadoFiltroAsignaturasUnicas.length = 0;

    for (let i = 0; i < lstMisDocumentos.length; i++) {
        listadoFiltroAsignaturas.push(lstMisDocumentos[i].asignatura);
    }
    //Eliminar duplicados
    listadoFiltroAsignaturasUnicas = eliminarDuplicadosArray(listadoFiltroAsignaturas);

    //Rellenar el select de asignaturas
    document.getElementById("inputFiltroAsignatura").innerHTML = `<option value="Todas" selected>Todas</option>`;
    for (let i = 0; i < listadoFiltroAsignaturasUnicas.length; i++) {
        document.getElementById("inputFiltroAsignatura").innerHTML += `<option value="` + listadoFiltroAsignaturasUnicas[i] + `">` + listadoFiltroAsignaturasUnicas[i] + `</option>`;
    }
}

function updateDatosUsuario(){
    formDatos.onsubmit = async (e) => {
        e.preventDefault();
        let form = new FormData(document.getElementById('formDatos'));
        //let form = new FormData(formLogin);
        //console.log(form);
        console.log(form.get('formDatosNombre'));
    
        let response = await fetch('/PHP/cambiarMisDatos.php', {
          method: 'POST',
          body: form
        });
      
        let result = await response.ok;
        console.log(result);
        //console.log(result.perfil);
        if(result){
            let textoRespuesta = "Se han cambiado los datos correctamente";
            document.getElementById("respuestaCambiarDatos").innerHTML = textoRespuesta;

        }else{
            let textoRespuesta = "Error al cambiar los datos";
            document.getElementById("errorLogin").innerHTML = textoRespuesta;
        }
        
      };
}

function guardarArchivo(){
    subirArchivo.onsubmit = async (e) => {
        e.preventDefault();
        let form = new FormData(document.getElementById('subirArchivo'));
        //console.log(form);
        form.append('propietario', sessionStorage.getItem('cod_usuario'));
        console.log(form.get('propietario'));
        
        let response = await fetch('/PHP/subirArchivo.php', {
          method: 'POST',
          body: form
        });
      
        //let result = await response.json();
        let result = await response.ok;
        console.log(result.sucess);
        console.log(result.datos);
        //console.log(result.perfil);
        if(result){
           console.log(sessionStorage.getItem("usuario"));
           console.log(result);
           var textoRespuesta = "Se ha subido el archivo correctamente";
              document.getElementById("respuestaSubirArchivo").innerHTML = textoRespuesta;

              //Limpiar los campos del formulario
              document.getElementById("subirArchivo").reset();
        }else{
            var errorSubirArchivo = "Error al subir el documento. Sólo se permiten archivos con extensión .pdf, .txt, .odt, .doc, .docx y de un máximo de 40MB";
            console.log(result.datos);
            document.getElementById("errorSubirArchivo").innerHTML = errorSubirArchivo;
        }

    }

}

function getUrlImagen(){
    console.log(sessionStorage.getItem('usuario'));
    let data = new FormData();
    data.append('usuarioB', sessionStorage.getItem('usuario'));


    
    //user.value = usuario;
    
    fetch('/PHP/direccionImagen.php', {
        method: 'POST',
        body: data
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        if(data.error){
            console.log(data.error);
        }else{
            console.log(data.data);
            imagen = data.data;
            sessionStorage.setItem('imagen', imagen);
            //return JSON.stringify(data.data);
            //POR AQUI
            document.getElementById("fotoPerfil").src ="/PHP/" + imagen;
            return data.data;
        }
    })
    .catch(function(error){
        console.log(error);
        return error;
    });

/*
        let response = fetch('/PHP/getUrlImagen.php', {
          method: 'POST',
          body: data
        });
      
        let result = response.text;
        console.log(result);
        return result;
        */
}

function updateImagenUsuario(){
    formImagen.onsubmit = async (e) => {
        e.preventDefault();
        let form = new FormData(document.getElementById('formImagen'));
        //let form = new FormData(formLogin);
        //console.log(form);
        form.append('formDatosUsuario', getCookie('usuario'));
        console.log(form.get('formDatosUsuario'));
        //lconsole.log(form);
    
        let response = await fetch('/PHP/cambiarImagen.php', {
          method: 'POST',
          body: form
        });
      
        let result = await response.ok;
        console.log(result);
        if(result){
            console.log("Imagen cambiada correctamente");
            //window.location.reload();
            console.log(getCookie("usuario"));
            var ruta= getUrlImagen();
            console.log(ruta);
            //console.log(imagen);
            document.getElementById("fotoPerfil").src = "/PHP/" + sessionStorage.getItem('imagen');
            //document.getElementById("fotoPerfil").src = "/PHP/" + ruta;
            //location.reload();

        }else{
            let textoRespuesta = "Error al cambiar la imagen, sube sólo archivos JPG, JPEG o PNG y de menos de 20MB";
            document.getElementById("errorImagen").innerHTML = textoRespuesta;
        }
        
      };
}

//TODO 
function borrarApunte(cod_usuario,cod_apunte){
// Si no es el propietario borra el apunte de la tabla biblioteca
// Si es el propietario borra el apunte de la tabla biblioteca (con borrado en cascada se borra también de biblioteca)

}
function cambiarEstadoCompartido(cod_usuario,cod_apunte,compartido){

    let formBoton = new FormData();
    formBoton.append('cod_usuario', cod_usuario);
    formBoton.append('cod_apunte', cod_apunte);
    formBoton.append('compartido', compartido);


    let response = fetch('/PHP/cambiarEstadoCompartido.php', {
        method: 'POST',
        body: form
    });
    
    let result = response.ok;
    console.log(result);
    if(result){
        console.log("Estado de compartido del documento cambiado correctamente");
        

    }else{
        console.log("Error al cambiar el estado de compartido del documento");
    }
    

}

//TODO botón es el this del botón en si. 
//en la opción del comentario es la caja que contiene al botón.
function cambiarBotonCompartido(boton){

    // traer la id de la caja del botón y reescribir el botón en esta función
    //TODO añadir las funciones de cambiar estado compartido
    if(boton.innerHTML == "Compartido"){
        getElementById(boton).innerHTML = '<button class="btn btn-outline-primary m-1">No Compartido</button>';
    }else{
        getElementById(boton).innerHTML = '<button class="btn btn-primary m-1">Compartido</button>';
    }
   
    // Cambiando atributos NO FUNCIONA
    if(boton.innerHTML == "Compartido"){
        boton.class = "btn btn-outline-primary m-1";
        boton.innerHTML = "No compartido";
    }else{
        boton.class = "btn btn-primary m-1";
        boton.innerHTML = "Compartido";
    }
}

function rellenarMisDocumentos(listadoMisDocumentos){
    console.log(listadoMisDocumentos);
    let respuestaMisDocumentos = "";
    
    for(let i = 0; i < listadoMisDocumentos.length; i++){

        //comprobar si el usuario es el propietario del documento
        if(listadoMisDocumentos[i].propietario == sessionStorage.getItem('cod_usuario')){
            
            if (listadoMisDocumentos[i].compartido == 1){
                var botonCompartido = `<button class="btn btn-primary m-1">Compartido</button>`;
            }else{
                var botonCompartido = `<button class="btn btn-outline-primary m-1">No Compartido</button>`;
            }
            //TODO : Cambiar el estado de compartido
            /*
            if (data[i].compartido == 1){
                var botonCompartido = `<button class="btn btn-primary m-1" onclick="cambiarEstadoCompartido(${sessionStorage.getItem('cod_usuario')},${data[i].cod_apunte},${data[i].compartido});cambiarBotonCompartido(${this});">Compartido</button>`;
            }else{
                var botonCompartido = `<button class="btn btn-outline-primary m-1" onclick="cambiarEstadoCompartido(${sessionStorage.getItem('cod_usuario')},${data[i].cod_apunte},${data[i].compartido});cambiarBotonCompartido(${this});">No Compartido</button>`;
            }
            */
        }else{
            var botonCompartido = "";
        }


        respuestaMisDocumentos += `<div class="row justify-content-center align-items-center bg-light mt-5">
        <div class="col-md-12 shadow-lg bg-white p-4">
          <div class="row">
            <div class="col-sm-9 col-md-10">
              <div class="row m-1">
                <div class="col-sm-12 col-lg-11 text-start ">
                  <div class="row">
                    <div class="col-2 text-end overflow-hidden">Nombre</div>
                    <div class="col-10 bg-light shadow-sm overflow-hidden border border-2"><h5>`+listadoMisDocumentos[i].nombre+`</h5></div>
                  </div>  
                </div>
              </div>
              <div class="row m-1 text-center">
                <div class="col-2 text-end overflow-hidden ">Fecha</div>
                <div class="col-3 bg-light shadow-sm m-1">`+listadoMisDocumentos[i].fecha_subida+`</div>
                <div class="col-4 text-end overflow-hidden">Descargas</div>
                <div class="col-2 bg-light shadow-sm m-1">`+listadoMisDocumentos[i].num_descargas+`</div>
              </div>
              <div class="row m-1">
                <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                  <div class="row">
                    <div class="col-2 text-end overflow-hidden">Asignatura</div>
                    <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoMisDocumentos[i].asignatura+`</div>
                  </div>  
                </div>
              </div>
              <div class="row m-1">
                <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                  <div class="row">
                    <div class="col-2 text-end overflow-hidden">Centro</div>
                    <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoMisDocumentos[i].centro+`</div>
                  </div>  
                </div>
              </div>
              <div class="row m-1">
                <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                  <div class="row">
                    <div class="col-2 text-end overflow-hidden">Descripción</div>
                    <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoMisDocumentos[i].descripcion+`</div>
                  </div>  
                </div>
              </div>
            </div>
        <!-- Botonera -->
            <div class="col-sm-3 col-md-2 align-items-center">
                <div class="row" id="btnComp`+listadoMisDocumentos[i].cod_apunte+`">`+botonCompartido+`</div>
                <div class="row"><button class="btn btn btn-outline-primary m-1">Abrir (solo PDF)</button></div>
                <div class="row"><button class="btn btn btn-outline-primary m-1">Descargar</button></div>
                <!-- <div class="row"><button>Editar</button></div> --> 
                <div class="row"><button class="btn btn-sm btn-outline-primary m-1">Borrar</button></div>
            </div>
          </div>
      
          </div>
        </div>`;
        
    }

    document.getElementById("listaDocumentos").innerHTML = respuestaMisDocumentos;
}

function filtrarPorNombre(){

    console.log(listadoMisDocumentos);


    listadoMisDocumentosFiltrado.length = 0;
    //document.getElementById("listaDocumentos").innerHTML = "";

    let nombreFiltro = document.getElementById("inputFiltroNombre").value;

    if (nombreFiltro == ""){
        rellenarMisDocumentos(listadoMisDocumentos);
        rellenarFiltroAsignaturas(listadoMisDocumentos);
    }
    else{
        for (let i = 0; i < listadoMisDocumentos.length; i++){
            if (listadoMisDocumentos[i].nombre.toLowerCase() == nombreFiltro.toLowerCase()){
                listadoMisDocumentosFiltrado.push(listadoMisDocumentos[i]);
            }
        }
    
        console.log(listadoMisDocumentosFiltrado);
    
        rellenarMisDocumentos(listadoMisDocumentosFiltrado);
        rellenarFiltroAsignaturas(listadoMisDocumentosFiltrado);
    }
    
    


}

function filtrarPorAsignatura(asignatura){

    let textoRespuesta = "";
    console.log(asignatura);


    document.getElementById("listaDocumentos").innerHTML = "";

    if (asignatura == "Todas"){
        //Mostrar todos los documentos
        rellenarMisDocumentos(listadoMisDocumentos);

    }else{

        //let nombre = document.getElementById("inputFiltroNombre").value;
        //if (nombre == ""){
        //console.log(listadoMisDocumentos[0].asignatura);
        for(let i = 0; i < listadoMisDocumentos.length; i++){
            if (listadoMisDocumentos[i].asignatura == asignatura){
                //console.log(listadoMisDocumentos[i].asignatura);

                    //comprobar si el usuario es el propietario del documento
                    if(listadoMisDocumentos[i].propietario == sessionStorage.getItem('cod_usuario')){
                        
                        if (listadoMisDocumentos[i].compartido == 1){
                            var botonCompartido = `<button class="btn btn-primary m-1">Compartido</button>`;
                        }else{
                            var botonCompartido = `<button class="btn btn-outline-primary m-1">No Compartido</button>`;
                        }
                        //TODO : Cambiar el estado de compartido
                        /*
                        if (data[i].compartido == 1){
                            var botonCompartido = `<button class="btn btn-primary m-1" onclick="cambiarEstadoCompartido(${sessionStorage.getItem('cod_usuario')},${data[i].cod_apunte},${data[i].compartido});cambiarBotonCompartido(${this});">Compartido</button>`;
                        }else{
                            var botonCompartido = `<button class="btn btn-outline-primary m-1" onclick="cambiarEstadoCompartido(${sessionStorage.getItem('cod_usuario')},${data[i].cod_apunte},${data[i].compartido});cambiarBotonCompartido(${this});">No Compartido</button>`;
                        }
                        */
                    }else{
                        var botonCompartido = "";
                    }
    
    
                    textoRespuesta += `<div class="row justify-content-center align-items-center bg-light mt-5">
                    <div class="col-md-12 shadow-lg bg-white p-4">
                      <div class="row">
                        <div class="col-sm-9 col-md-10">
                          <div class="row m-1">
                            <div class="col-sm-12 col-lg-11 text-start ">
                              <div class="row">
                                <div class="col-2 text-end overflow-hidden">Nombre</div>
                                <div class="col-10 bg-light shadow-sm overflow-hidden border border-2"><h5>`+listadoMisDocumentos[i].nombre+`</h5></div>
                              </div>  
                            </div>
                          </div>
                          <div class="row m-1 text-center">
                            <div class="col-2 text-end overflow-hidden ">Fecha</div>
                            <div class="col-3 bg-light shadow-sm m-1">`+listadoMisDocumentos[i].fecha_subida+`</div>
                            <div class="col-4 text-end overflow-hidden">Descargas</div>
                            <div class="col-2 bg-light shadow-sm m-1">`+listadoMisDocumentos[i].num_descargas+`</div>
                          </div>
                          <div class="row m-1">
                            <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                              <div class="row">
                                <div class="col-2 text-end overflow-hidden">Asignatura</div>
                                <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoMisDocumentos[i].asignatura+`</div>
                              </div>  
                            </div>
                          </div>
                          <div class="row m-1">
                            <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                              <div class="row">
                                <div class="col-2 text-end overflow-hidden">Centro</div>
                                <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoMisDocumentos[i].centro+`</div>
                              </div>  
                            </div>
                          </div>
                          <div class="row m-1">
                            <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                              <div class="row">
                                <div class="col-2 text-end overflow-hidden">Descripción</div>
                                <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoMisDocumentos[i].descripcion+`</div>
                              </div>  
                            </div>
                          </div>
                        </div>
                    <!-- Botonera -->
                        <div class="col-sm-3 col-md-2 align-items-center">
                            <div class="row" id="btnComp`+listadoMisDocumentos[i].cod_apunte+`">`+botonCompartido+`</div>
                            <div class="row"><button class="btn btn btn-outline-primary m-1">Abrir (solo PDF)</button></div>
                            <div class="row"><button class="btn btn btn-outline-primary m-1">Descargar</button></div>
                            <!-- <div class="row"><button>Editar</button></div> --> 
                            <div class="row"><button class="btn btn-sm btn-outline-primary m-1">Borrar</button></div>
                        </div>
                      </div>
                  
                      </div>
                    </div>`;
                    
                
            }
        } 
    //}
        document.getElementById("listaDocumentos").innerHTML = textoRespuesta;
    }
     
    

}


function mostrarMisDocumentos(){
// TODO: Mostrar los documentos del usuario
    let data = new FormData();
    data.append('cod_usuario', sessionStorage.getItem('cod_usuario'));
    console.log(data);
    fetch('/PHP/misDocumentos.php', {
        method: 'POST',
        body: data
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        listadoMisDocumentos = data;
        let respuestaMisDocumentos = "";

        if(data.length == 0){
            respuestaMisDocumentos = `"<div id="listaDocumentos">
            <div class="row justify-content-center align-items-center bg-light mt-5">
              <div class="col-md-12 shadow-lg bg-white p-4 justify-content-center align-items-center text-center">
                <div class="row">
                  <div class="col-sm-12 col-md-12 justify-content-center align-items-center text-center">
                    <h4 class="text-center">No tienes documentos, prueba a guardas tus documentos o añadir los de otros usuarios</h4>
                  </div>
                </div>
            </div>
            </div>`;
            document.getElementById("listaDocumentos").innerHTML = textoRespuesta;
        }else{

            rellenarMisDocumentos(listadoMisDocumentos);

            //Rellenar el array de asignaturas del filtro
            rellenarFiltroAsignaturas(listadoMisDocumentos);    
            
        }

    })
    .catch(function(error){
        console.log(error);
    });


}





