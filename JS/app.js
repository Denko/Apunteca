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

    formRegistro.onsubmit = async (e) => {
        e.preventDefault();
        let form = new FormData(document.getElementById('formRegistro'));

        console.log(form);

    
        let response = await fetch('/PHP/registrar.php', {
          method: 'POST',
          body: form
        });
      
        let result = await response.json();
        console.log(result.success);
        //console.log(result.perfil);
        if(result.success){
          
          console.log(result.success);
          window.location.href = '/HTML/login.html';
        }
        //alert(result.success);
      };

      /*
    const btnEnviar = document.querySelector("#btnEnviar");
    const inputFile = document.querySelector("#inputImagen");
    var inputUsuario = document.getElementById("inputUsuario").value;
    var inputNombre = document.getElementById("inputNombre").value;
    var inputPassword = document.getElementById("inputPassword").value;
    var inputPassword2 = document.getElementById("inputPassword2").value;
    var inputEmail = document.getElementById("inputEmail").value;
    var inputCentro = document.getElementById("inputCentro").value;
    var inputEstudios = document.getElementById("inputEstudios").value;
    var inputComentario = document.getElementById("inputComentario").value;

    */
    /*
    var inputUsuario = document.formRegistro.inputUsuario.value;
    var inputNombre = document.formRegistro.inputNombre.value;
    var inputPassword = document.formRegistro.inputPassword.value;
    var inputPassword2 = document.formRegistro.inputPassword2.value;
    var inputEmail = document.formRegistro.inputEmail.value;
    var inputCentro = document.formRegistro.inputCentro.value;
    var inputEstudios = document.formRegistro.inputEstudios.value;
    var inputComentario = document.formRegistro.inputComentario.value;
    */

    /*
    btnEnviar.addEventListener("click", () => {
        if (inputFile.files.length > 0) {
            let formData = new FormData();
            formData.append("inputImagen", inputFile.files[0]);
            formData.append("inputUsuario", inputUsuario);
            formData.append("inputNombre", inputNombre);
            formData.append("inputPassword", inputPassword);
            formData.append("inputPassword2", inputPassword2);
            formData.append("inputEmail", inputEmail);
            formData.append("inputCentro", inputCentro);
            formData.append("inputEstudios", inputEstudios);
            formData.append("inputComentario", inputComentario);
            fetch("/PHP/registar.php", {
                method: 'POST',
                body: formData,
            })
                .then(respuesta => respuesta.text())
                .then(decodificado => {
                    console.log(decodificado);
                    window.location.href = "/HTML/login.html";
                });
        } else {
            let formData = new FormData();
            formData.append("inputUsuario", inputUsuario);
            formData.append("inputNombre", inputNombre);
            formData.append("inputPassword", inputPassword);
            formData.append("inputPassword2", inputPassword2);
            formData.append("inputEmail", inputEmail);
            formData.append("inputCentro", inputCentro);
            formData.append("inputEstudios", inputEstudios);
            formData.append("inputComentario", inputComentario);
            fetch("/PHP/registar.php", {
                method: 'POST',
                body: formData,
            })
                .then(respuesta => respuesta.text())
                .then(decodificado => {
                    console.log(decodificado);
                    window.location.href = "/HTML/login.html";
                });
        }
    });

    */
    /*  
    var inputUsuario = document.formRegistro.inputUsuario.value;
    var inputNombre = document.formRegistro.inputNombre.value;
    var inputPassword = document.formRegistro.inputPassword.value;
    var inputPassword2 = document.formRegistro.inputPassword2.value;
    var inputEmail = document.formRegistro.inputEmail.value;
    //Falta la imagen
    var inputCentro = document.formRegistro.inputCentro.value;
    var inputEstudios = document.formRegistro.inputEstudios.value;
    var inputComentario = document.formRegistro.inputComentario.value;


    $.ajax({
        url: "http://localhost/PHP/registrar.php",
        type: "POST",
        data: {
            inputusuario : inputUsuario,
            inputNombre : inputNombre,
            inputPassword : inputPassword,
            inputPassword2 : inputPassword2,
            inputEmail : inputEmail,
            inputCentro : inputCentro,
            inputEstudios : inputEstudios,
            inputComentario : inputComentario
        },
        success: function(data){
            if(data == "true"){
                window.location.href = "/HTML/login.html";
                }
                else{
                    alert("Error al registrar");
                }
            }
    });

}
               

    var formulario = document.getElementById("formRegistro");
    var datos = new FormData(formulario);

    console.log(formulario);
    console.log(datos);

    fetch("http://localhost/PHP/registrar.php", {
        method: 'POST',
        mode: "no-cors",
        body: datos,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data.error){
            alert(data.error);
        }
        else{
            alert("Usuario registrado correctamente");
            window.location.href = "/HTML/login.html";
        }
    })
    .catch(function(error){
        console.log(error);
    });
*/
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
            for(let i = 0; i < data.length; i++){

                //comprobar si el usuario es el propietario del documento
                if(data[i].propietario == sessionStorage.getItem('cod_usuario')){
                    
                    if (data[i].compartido == 1){
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
                            <div class="col-10 bg-light shadow-sm overflow-hidden border border-2"><h5>`+data[i].nombre+`</h5></div>
                          </div>  
                        </div>
                      </div>
                      <div class="row m-1 text-center">
                        <div class="col-2 text-end overflow-hidden ">Fecha</div>
                        <div class="col-3 bg-light shadow-sm m-1">`+data[i].fecha_subida+`</div>
                        <div class="col-4 text-end overflow-hidden">Descargas</div>
                        <div class="col-2 bg-light shadow-sm m-1">`+data[i].num_descargas+`</div>
                      </div>
                      <div class="row m-1">
                        <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                          <div class="row">
                            <div class="col-2 text-end overflow-hidden">Asignatura</div>
                            <div class="col-10 bg-light shadow-sm overflow-hidden">`+data[i].asignatura+`</div>
                          </div>  
                        </div>
                      </div>
                      <div class="row m-1">
                        <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                          <div class="row">
                            <div class="col-2 text-end overflow-hidden">Centro</div>
                            <div class="col-10 bg-light shadow-sm overflow-hidden">`+data[i].centro+`</div>
                          </div>  
                        </div>
                      </div>
                      <div class="row m-1">
                        <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                          <div class="row">
                            <div class="col-2 text-end overflow-hidden">Descripción</div>
                            <div class="col-10 bg-light shadow-sm overflow-hidden">`+data[i].descripcion+`</div>
                          </div>  
                        </div>
                      </div>
                    </div>
                <!-- Botonera -->
                    <div class="col-sm-3 col-md-2 align-items-center">
                        <div class="row" id="btnComp`+data[i].cod_apunte+`">`+botonCompartido+`</div>
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
            
            /*
            textoRespuesta = "";
            for(let i = 0; i < data.length; i++){
                if (data[i].compartido == "1"){
                    //textoRespuesta += "<div class='col-md-4'><div class='card'><div class='card-body'><h5 class='card-title'>" + data[i].titulo + "</h5><p class='card-text'>" + data[i].descripcion + "</p><a href='/PHP/" + data[i].url + "' class='btn btn-primary'>Descargar</a></div></div></div>";
                }
                else{
                    //textoRespuesta += "<div class='col-md-4'><div class='card'><div class='card-body'><h5 class='card-title'>" + data[i].titulo + "</h5><p class='card-text'>" + data[i].descripcion + "</p><a href='/PHP/" + data[i].url + "' class='btn btn-primary'>Descargar</a></div></div></div>";
                }
                respuestaMisDocumentos += "<div class='col-md-4'><div class='card'><div class='card-body'><h5 class='card-title'>" + data[i].nombre + "</h5><p class='card-text'>" + data[i].descripcion + "</p><a href='/PHP/" + data[i].url + "' class='btn btn-primary'>Descargar</a></div></div></div>";
            }
            document.getElementById("listaDocumentos").innerHTML = textoRespuesta;

            */
        }

 

        /*
        if(data.error){
            console.log(data.error);
        }else{
            console.log(data.data);
            //console.log(data.data);
            let textoRespuesta = "";
            let i = 0;
            for(i = 0; i < data.data.length; i++){
                textoRespuesta += '<div class="card">' +
                                    '<div class="card-body">' +
                                        '<h5 class="card-title">' + data.data[i].nombre + '</h5>' +
                                        '<p class="card-text">' + data.data[i].descripcion + '</p>' +
                                        '<a href="' + data.data[i].url + '" target="_blank" class="btn btn-primary">Descargar</a>' +
                                    '</div>' +
                                '</div>';
            }
            document.getElementById("misDocumentos").innerHTML = textoRespuesta;
        }
        */
    })
    .catch(function(error){
        console.log(error);
    });


}

