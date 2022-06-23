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

var listadoBusqueda = Array();
var listadoBusquedaFiltrado = Array();

var listadoMisDocumentosAux = Array();
var listadoBusquedaAux = Array();

var listadoFiltroBusqueda = Array();
var listadoFiltroBusquedaUnicas = Array();




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
    var user = sessionStorage.getItem("usuario");
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

function abrirLogin() {
    window.location.href = "login.html";
}

function goToPage(page) {
    window.location.href = page;
}

function recuperarCuenta(){
    formRecuperarCuenta.onsubmit = async (e) => {
        e.preventDefault();
        let form = new FormData(document.getElementById('formRecuperarCuenta'));
        let response = await fetch('/PHP/recuperarCuenta.php', {
          method: 'POST',
          body: form
        });
      
        let result = await response.json();
        console.log(result.success);
        //console.log(result.perfil);
        if(result.success){
            
            console.log(result.exito);

            let mensajeRecuperarDatos = "Se han enviado tus datos de acceso al correo especificado";
            document.getElementById("respuestaRecuperar").innerHTML = mensajeRecuperarDatos;

        }else{
            let mensajeRecuperarDatos = "El correo especificado no existe";
            document.getElementById("respuestaRecuperar").innerHTML = mensajeRecuperarDatos;
            
        }

      };
}

function login(){

    formLogin.onsubmit = async (e) => {
        e.preventDefault();
        let passCodificado = btoa(document.getElementById("inputPassword").value);
        let form = new FormData(document.getElementById('formLogin'));
        form.append("passwordCodificado", passCodificado);
        //let form = new FormData(formLogin);
        console.log(form);
        console.log(passCodificado)

    
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
            let passCodificado = btoa(pass1);
            let pass2 = document.getElementById("inputPassword2").value;

            console.log(pass1, pass2, passCodificado);

            if(pass1 == pass2){

                botonEnviarRegistro.disabled = true;

                let form = new FormData(document.getElementById('formRegistro'));

                form.append("passwordCodificado", passCodificado);
                
            
                let response = await fetch('/PHP/registrar.php', {
                    method: 'POST',
                    body: form
                    });
                
                    let result = await response.text();
                    //console.log(result.perfil);
                    if(result=="usuario_creado"){
                        console.log(result);
                        //window.alert("Usuario registrado correctamente");
                        $('#modalRegistro').modal('show');

                        botonEnviarRegistro.disabled = false;
                        //window.location.href = '/HTML/login.html';
                    };
                    if(result=="usuario_existe"){
                        console.log(result);
                        botonEnviarRegistro.disabled = false;
                        //window.alert("El nombre de usuario ya existe, prueba con otro");
                        respuestaRegistro = "<p><b class='text-danger'>El nombre de usuario ya existe, prueba con otro</b></p>";
                        document.getElementById("respuestaRegistro").innerHTML = respuestaRegistro;
                    };
                    if(result=="correo_existe"){
                        console.log(result);
                        botonEnviarRegistro.disabled = false;            
                        respuestaRegistro = "<p><b class='text-danger'>El corrreo usado ya está registrado.</b></p>";
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
    let listaSinDuplicados = Array();
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
            document.getElementById("respuestaCambiarDatos").innerHTML = textoRespuesta;
        }
        
      };
}

function guardarArchivo(){
    let form = document.getElementById('subirArchivo');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let botonGuardarArchivo = document.getElementById("botonGuardarArchivo");
        botonGuardarArchivo.disabled = true;
        botonGuardarArchivo.innerHTML = "Subiendo a Apunteca...";

        let formData = new FormData(form);
        formData.append('propietario', sessionStorage.getItem('cod_usuario'));
        let peticion = new XMLHttpRequest();
        peticion.open('POST', '/PHP/subirArchivo.php');
        peticion.send(formData);
        peticion.onload = function(){
        console.log(peticion.responseText);
        if(peticion.responseText){

            let textoRespuesta = "Se ha subido el archivo correctamente";
            document.getElementById("respuestaSubirArchivo").innerHTML = textoRespuesta;

            botonGuardarArchivo.disabled = false;
            botonGuardarArchivo.innerHTML = "Guardar Archivo";

              //Limpiar los campos del formulario
              document.getElementById("subirArchivo").reset();
              $('#modalGuardar').modal('show');
             // window.location.href = '/HTML/principal.html';

        }else{
            let errorSubirArchivo = "Error al subir el documento. Sólo se permiten archivos con extensión .pdf, .txt, .odt, .doc, .docx y de un máximo de 40MB";
            console.log(result.datos);
            document.getElementById("errorSubirArchivo").innerHTML = errorSubirArchivo;
        }
        }
    }
    );
    /*
    subirArchivo.onsubmit = async (e) => {
        e.preventDefault();
        let botonGuardarArchivo = document.getElementById("botonGuardarArchivo");
        botonGuardarArchivo.disabled = true;
        botonGuardarArchivo.innerHTML = "Subiendo a Apunteca...";
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
        console.log(result);
        //console.log(result.perfil);
        if(result){
           console.log(sessionStorage.getItem("usuario"));
           console.log(result);
           var textoRespuesta = "Se ha subido el archivo correctamente";
              document.getElementById("respuestaSubirArchivo").innerHTML = textoRespuesta;

            botonGuardarArchivo.disabled = false;
            botonGuardarArchivo.innerHTML = "Guardar Archivo";

              //Limpiar los campos del formulario
              document.getElementById("subirArchivo").reset();
        }else{
            var errorSubirArchivo = "Error al subir el documento. Sólo se permiten archivos con extensión .pdf, .txt, .odt, .doc, .docx y de un máximo de 40MB";
            console.log(result.datos);
            document.getElementById("errorSubirArchivo").innerHTML = errorSubirArchivo;
        }
    }
    */

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
            let rutaImagen = "/PHP/" + sessionStorage.getItem('imagen');
            document.getElementById("fotoPerfil").src = "/PHP/" + sessionStorage.getItem('imagen');
            document.getElementById("fotoPerfil").setAttribute("src", rutaImagen);

            let cajaImagen = document.getElementById("cajaImagen");
            cajaImagen.removeChild(cajaImagen.childNodes[0]);
            cajaImagen.innerHTML = `<img src="`+rutaImagen+`" class="img-thumbnail" id="fotoPerfil" name="fotoPerfil" alt="tu foto"></img>`;

            let textoRespuesta = "Imagen cambiada correctamente";
            document.getElementById("errorImagen").innerHTML = textoRespuesta;
            //document.getElementById("fotoPerfil").src = "/PHP/" + ruta;
            //location.reload();

        }else{
            let textoRespuesta = "Error al cambiar la imagen, sube sólo archivos JPG, JPEG o PNG y de menos de 20MB";
            document.getElementById("errorImagen").innerHTML = textoRespuesta;
        }
        
      };
}
function ordenarAsc(p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
       return a[p_key] > b[p_key];
    });
 }
 function ordenarDesc(p_array_json, p_key) {
    ordenarAsc(p_array_json, p_key); p_array_json.reverse(); 
 }


//Ordena una lista JSON de manera descendente
function ordenarListaJSON(data, key){

    return data.sort(function (a, b) {
        var x = a[key],
        y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });

}

function ordenarDocsMasRecientes(){
    if (listadoMisDocumentos.length > 0) {
        listadoMasRecientes = JSON.parse(sessionStorage.getItem('listadoMisDocumentos'));
        console.log(listadoMasRecientes);
        rellenarMisDocumentos(listadoMasRecientes);
    }
}

function ordenarDocsMasValorados(){
    if (listadoMisDocumentos.length > 0) {
        let listadoMisDocumentosOrdenado = listadoMisDocumentos;
        listadoMisDocumentosOrdenado = ordenarListaJSON(listadoMisDocumentosOrdenado, "me_gusta");
        rellenarMisDocumentos(listadoMisDocumentosOrdenado);
    }
}

function ordenarDocsMasDescargados(){
    if (listadoMisDocumentos.length > 0) {
        let listadoMisDocumentosOrdenado = listadoMisDocumentos;
        listadoMisDocumentosOrdenado = ordenarListaJSON(listadoMisDocumentosOrdenado, "num_descargas");
        rellenarMisDocumentos(listadoMisDocumentosOrdenado);
    }
}

function ordenarBuscarMasRecientes(){
    if (listadoBusqueda.length > 0) {
        let listadoBusquedaRecientes = JSON.parse(sessionStorage.getItem('listadoBusqueda'));
        console.log(listadoBusquedaRecientes)
        rellenarBusqueda(listadoBusquedaRecientes);
    }
}

function ordenarBuscarMasValorados(){
    if (listadoBusqueda.length > 0) {
        let listadoBusquedaOrdenada = ordenarListaJSON(listadoBusqueda, "me_gusta");
        rellenarBusqueda(listadoBusquedaOrdenada);
    }
}

function ordenarBuscarMasDescargados(){
    if (listadoBusqueda.length > 0) {
        let listadoBusquedaOrdenada = ordenarListaJSON(listadoBusqueda, "num_descargas");
        rellenarBusqueda(listadoBusquedaOrdenada);
    }
}


function borrarApunte(codigoApunte){
// Si no es el propietario borra el apunte de la tabla biblioteca
// Si es el propietario borra el apunte de la tabla biblioteca (con borrado en cascada se borra también de biblioteca)
    let formBorrar = new FormData();
    let codigoUsuario = sessionStorage.getItem('cod_usuario');
    formBorrar.append('cod_usuario', codigoUsuario);
    formBorrar.append('cod_apunte', codigoApunte);

    let response = fetch('/PHP/borrarApunte.php', {
        method: 'POST',
        body: formBorrar
    });

    let result = response.ok;
    console.log(result);
    console.log("archivo borrado correctamente");
    let idCajaApunte = "'cajaApunte"+codigoApunte+"'";

    for (let i = 0; i < listadoMisDocumentos.length; i++) {
        if(listadoMisDocumentos[i].cod_apunte == codigoApunte){
            listadoMisDocumentos.splice(i, 1);
        }
    }
    
    if(listadoMisDocumentos.length == 0){
        respuestaMisDocumentos = `<div id="listaDocumentos">
        <div class="row justify-content-center align-items-center bg-light mt-5">
          <div class="col-md-12 shadow-lg bg-white p-4 justify-content-center align-items-center text-center">
            <div class="row">
              <div class="col-sm-12 col-md-12 justify-content-center align-items-center text-center">
                <h4 class="text-center">No tienes documentos, prueba a guardar tus documentos o añadir los de otros usuarios</h4>
              </div>
            </div>
        </div>
        </div>`;
        document.getElementById("listaDocumentos").innerHTML = respuestaMisDocumentos;
    }else{
        rellenarMisDocumentos(listadoMisDocumentos);
        rellenarFiltroAsignaturas(listadoMisDocumentos);
    }


}

function sumarMeGusta(codigoApunte){

    if (document.getElementById("btnMeGusta"+codigoApunte) == null) {
        let boton = document.getElementById("btnBusMeGusta"+codigoApunte);
        boton.disabled = true;
    }else{
        let boton = document.getElementById("btnMeGusta"+codigoApunte);
        boton.disabled = true;
    }

    

    let formSumarMeGusta = new FormData(); 
    formSumarMeGusta.append('cod_apunte', codigoApunte);
    let response = fetch('/PHP/sumarMeGusta.php', {
        method: 'POST',
        body: formSumarMeGusta
    });
    
    let result = response.ok;
    //console.log(result);
    console.log("Me gusta añadido correctamente al apunte");

}


function cambiarEstadoCompartido(cod_usuario,cod_apunte,compartido){

    let formBoton = new FormData();
    formBoton.append('cod_usuario', cod_usuario);
    formBoton.append('cod_apunte', cod_apunte);
    formBoton.append('compartido', compartido);


    let response = fetch('/PHP/cambiarEstadoCompartido.php', {
        method: 'POST',
        body: formBoton
    });
    
    let result = response.ok;
    console.log(result);
    /*
    if(result){
        console.log("Estado de compartido del documento cambiado correctamente");
        

    }else{
        console.log("Error al cambiar el estado de compartido del documento");
    }
    */

}

 
//en la opción del comentario es la caja que contiene al botón.
function cambiarBotonCompartido(codigodeApunte){
    let caja = document.getElementById("btnComp"+codigodeApunte);
    for (let i = 0; i < listadoMisDocumentos.length; i++) {
        if(listadoMisDocumentos[i].cod_apunte == codigodeApunte){
            if(listadoMisDocumentos[i].compartido == 1){
                listadoMisDocumentos[i].compartido = 0;
                caja.removeChild(caja.childNodes[0]);
                caja.innerHTML = `<button class="btn btn-outline-primary m-1" onclick="cambiarBotonCompartido(`+listadoMisDocumentos[i].cod_apunte+`)">No Compartido</button>`;
               
                cambiarEstadoCompartido(sessionStorage.getItem('cod_usuario'),listadoMisDocumentos[i].cod_apunte,listadoMisDocumentos[i].compartido);
            }else{
                listadoMisDocumentos[i].compartido = 1;
                caja.removeChild(caja.childNodes[0]);
                caja.innerHTML = `<button class="btn btn-primary m-1" onclick="cambiarBotonCompartido(`+listadoMisDocumentos[i].cod_apunte+`)">Compartido</button>`;
                
                cambiarEstadoCompartido(sessionStorage.getItem('cod_usuario'),listadoMisDocumentos[i].cod_apunte,listadoMisDocumentos[i].compartido);
            }
        }
    }
    //let caja = "btnComp"+boton;
    //console.log(caja);
    // traer la id de la caja del botón y reescribir el botón en esta función
   
}

function descargarApunteBuscado(codigoApunte){

    console.log(codigoApunte);
    console.log(listadoBusqueda);
    
    for (let i = 0; i < listadoBusqueda.length; i++) {
        if(listadoBusqueda[i].cod_apunte == codigoApunte){
            var rutaApunte = listadoBusqueda[i].ruta;
        }
    }

    let form = new FormData();
    form.append('cod_apunte', codigoApunte);
    let response = fetch('/PHP/sumarDescargas.php', {
        method: 'POST',
        body: form
    });
    let result = response.ok;
    if(result){
        console.log("Descarga sumada");
    }else{
        console.log("Error al sumar descarga");
    }

    window.open(`../PHP/`+rutaApunte);

}

function descargarApunte(codigoApunte){
    
    for (let i = 0; i < listadoMisDocumentos.length; i++) {
        if(listadoMisDocumentos[i].cod_apunte == codigoApunte){
            var rutaApunte = listadoMisDocumentos[i].ruta;
        }
    }

    let form = new FormData();
    form.append('cod_apunte', codigoApunte);
    let response = fetch('/PHP/sumarDescargas.php', {
        method: 'POST',
        body: form
    });
    let result = response.ok;
    if(result){
        console.log("Descarga sumada");
    }else{
        console.log("Error al sumar descarga");
    }

    window.open(`../PHP/`+rutaApunte);

}

function rellenarMisDocumentos(listadoMisDocumentos){
    console.log(listadoMisDocumentos);
    let respuestaMisDocumentos = "";
    
    for(let i = 0; i < listadoMisDocumentos.length; i++){

        //comprobar si el usuario es el propietario del documento
        if(listadoMisDocumentos[i].propietario == sessionStorage.getItem('cod_usuario')){
            
            if (listadoMisDocumentos[i].compartido == 1){
                var botonCompartido = `<button class="btn btn-primary m-1" onclick="cambiarBotonCompartido(`+listadoMisDocumentos[i].cod_apunte+`)">Compartido</button>`;
            }else{
                var botonCompartido = `<button class="btn btn-outline-primary m-1" onclick="cambiarBotonCompartido(`+listadoMisDocumentos[i].cod_apunte+`)">No Compartido</button>`;
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
            var botonCompartido = `<button class="btn btn btn-outline-primary m-1" id="btnMeGusta`+listadoMisDocumentos[i].cod_apunte+`" onclick="sumarMeGusta(`+listadoMisDocumentos[i].cod_apunte+`)">Me Gusta</button>`;
        }


        respuestaMisDocumentos += `<div class="row justify-content-center align-items-center bg-light mt-5" id="cajaApunte`+listadoMisDocumentos[i].cod_apunte+`">
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
                <div class="col-md-8 col-lg-1 bg-light shadow-sm m-1">`+listadoMisDocumentos[i].fecha_subida+`</div>
                <div class="col-md-2 col-lg-2 text-center overflow-hidden ">Me gusta</div>
                <div class="col-md-2 col-lg-1 bg-light shadow-sm m-1">`+listadoMisDocumentos[i].me_gusta+`</div>
                <div class="col-2 text-end overflow-hidden">Descargas</div>
                <div class="col-1 bg-light shadow-sm m-1">`+listadoMisDocumentos[i].num_descargas+`</div>
              </div>
              <div class="row m-1">
                <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                  <div class="row">
                    <div class="col-md-12 col-lg-2 text-center overflow-hidden">Asignatura</div>
                    <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoMisDocumentos[i].asignatura+`</div>
                  </div>  
                </div>
              </div>
              <div class="row m-1">
                <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                  <div class="row">
                    <div class="col-md-12 col-lg-2 text-center overflow-hidden">Centro</div>
                    <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoMisDocumentos[i].centro+`</div>
                  </div>  
                </div>
              </div>
              <div class="row m-1">
                <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                  <div class="row">
                    <div class="col-md-12 col-lg-2 text-center overflow-hidden">Descripción</div>
                    <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoMisDocumentos[i].descripcion+`</div>
                  </div>  
                </div>
              </div>
            </div>
        <!-- Botonera -->
            <div class="col-sm-3 col-md-2 align-items-center" id="botonera`+listadoMisDocumentos[i].cod_apunte+`">
                <div class="row" id="btnComp`+listadoMisDocumentos[i].cod_apunte+`">`+botonCompartido+`</div>
                <div class="row"><button  class="btn btn btn-outline-primary m-1" id="btnDescargar`+listadoMisDocumentos[i].cod_apunte+`" onclick="descargarApunte(`+listadoMisDocumentos[i].cod_apunte+`)">Descargar</button></div>
                <div class="row"><button class="btn btn-sm btn-outline-primary m-1" id="btnBorrar`+listadoMisDocumentos[i].cod_apunte+`" onclick="borrarApunte(`+listadoMisDocumentos[i].cod_apunte+`)">Borrar</button></div>
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
            if (listadoMisDocumentos[i].nombre.toLowerCase().indexOf(nombreFiltro.toLowerCase()) != -1){
            //if (listadoMisDocumentos[i].nombre.toLowerCase() == nombreFiltro.toLowerCase()){
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
                        var botonCompartido = `<button class="btn btn btn-outline-primary m-1" id="btnMeGusta`+listadoMisDocumentos[i].cod_apunte+`" onclick="sumarMeGusta(`+listadoMisDocumentos[i].cod_apunte+`)">Me Gusta</button>`;
                    }
    
    
                    textoRespuesta += `<div class="row justify-content-center align-items-center bg-light mt-5" id="cajaApunte`+listadoMisDocumentos[i].cod_apunte+`">
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
                            <div class="col-1 bg-light shadow-sm m-1">`+listadoMisDocumentos[i].fecha_subida+`</div>
                            <div class="col-2 text-end overflow-hidden ">Me gusta</div>
                            <div class="col-1 bg-light shadow-sm m-1">`+listadoMisDocumentos[i].me_gusta+`</div>
                            <div class="col-2 text-end overflow-hidden">Descargas</div>
                            <div class="col-1 bg-light shadow-sm m-1">`+listadoMisDocumentos[i].num_descargas+`</div>
                          </div>
                          <div class="row m-1">
                            <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                              <div class="row">
                                <div class="col-md-12 col-lg-2 text-center overflow-hidden">Asignatura</div>
                                <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoMisDocumentos[i].asignatura+`</div>
                              </div>  
                            </div>
                          </div>
                          <div class="row m-1">
                            <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                              <div class="row">
                                <div class="col-md-12 col-lg-2 text-center overflow-hidden">Centro</div>
                                <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoMisDocumentos[i].centro+`</div>
                              </div>  
                            </div>
                          </div>
                          <div class="row m-1">
                            <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                              <div class="row">
                                <div class="col-md-12 col-lg-2 text-center overflow-hidden">Descripción</div>
                                <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoMisDocumentos[i].descripcion+`</div>
                              </div>  
                            </div>
                          </div>
                        </div>
                    <!-- Botonera -->
                        <div class="col-sm-3 col-md-2 align-items-center" id="botonera`+listadoMisDocumentos[i].cod_apunte+`">
                            <div class="row" id="btnComp`+listadoMisDocumentos[i].cod_apunte+`">`+botonCompartido+`</div>
                            <div class="row"><button class="btn btn btn-outline-primary m-1" id="btnDescargar`+listadoMisDocumentos[i].cod_apunte+`" onclick="descargarApunte(`+listadoMisDocumentos[i].cod_apunte+`)">Descargar</button></div>
                            <div class="row"><button class="btn btn-sm btn-outline-primary m-1" id="btnBorrar`+listadoMisDocumentos[i].cod_apunte+`" onclick="borrarApunte(`+listadoMisDocumentos[i].cod_apunte+`)">Borrar</button></div>
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
        listadoMisDocumentosAux = data;
        sessionStorage.setItem('listadoMisDocumentos', JSON.stringify(listadoMisDocumentos));
        let respuestaMisDocumentos = "";

        if(data.length == 0){
            respuestaMisDocumentos = `<div id="listaDocumentos">
            <div class="row justify-content-center align-items-center bg-light mt-5">
              <div class="col-md-12 shadow-lg bg-white p-4 justify-content-center align-items-center text-center">
                <div class="row">
                  <div class="col-sm-12 col-md-12 justify-content-center align-items-center text-center">
                    <h4 class="text-center">No tienes documentos, prueba a guardar tus documentos o añadir los de otros usuarios</h4>
                  </div>
                </div>
            </div>
            </div>`;
            document.getElementById("listaDocumentos").innerHTML = respuestaMisDocumentos;
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

function addApunteBiblioteca(cod_apunte){
    let formAddApunte = new FormData();

    formAddApunte.append('cod_usuario', sessionStorage.getItem('cod_usuario'));
    formAddApunte.append('cod_apunte', cod_apunte);

    let response = fetch('/PHP/addApunteBiblioteca.php', {
        method: 'POST',
        body: formAddApunte
    });

    let result = response.ok;

    let boton = document.getElementById("btnBusAdd"+cod_apunte);
    boton.disabled = true;

    let divRespuestaAdd = document.getElementById("textoAddApunte"+cod_apunte).innerHTML = "Añadido a Mis Documentos";



    /*
    let data = new FormData();
    data.append('cod_usuario', sessionStorage.getItem('cod_usuario'));
    data.append('cod_apunte', cod_apunte);
    console.log(data);
    fetch('/PHP/addApunteBiblioteca.php', {
        method: 'POST',
        body: data
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        
        if(data){
            console.log("Apunte añadido a la biblioteca");
        }else{
            console.log("Apunte no añadido a la biblioteca");
        }

    })
    .catch(function(error){
        console.log(error);
    });
    */
}

function rellenarFiltroBusqueda(listado){
    listadoFiltroBusqueda.length = 0;
    listadoFiltroBusquedaUnicas.length = 0;

    for (let i = 0; i < listado.length; i++) {
        listadoFiltroBusqueda.push(listado[i].asignatura);
    }
    //Eliminar duplicados
    listadoFiltroBusquedaUnicas = eliminarDuplicadosArray(listadoFiltroBusqueda);

    //Rellenar el select de asignaturas
    document.getElementById("inputFiltroBuscador").innerHTML = `<option value="Todas" selected>Todas</option>`;
    for (let i = 0; i < listadoFiltroBusquedaUnicas.length; i++) {
        document.getElementById("inputFiltroBuscador").innerHTML += `<option value="` + listadoFiltroBusquedaUnicas[i] + `">` + listadoFiltroBusquedaUnicas[i] + `</option>`;
    }
}

function rellenarBusqueda(listado){

    console.log(listado);
    let respuestaBuscar = "";
    
    for(let i = 0; i < listado.length; i++){

        //Muestra resultados de la busqueda sólo si los documentos no son tuyos
        if(listado[i].propietario != sessionStorage.getItem('cod_usuario')){
            respuestaBuscar += `<div class="row justify-content-center align-items-center bg-light mt-5">
            <div class="col-md-12 shadow-lg bg-white p-4">
            <div class="row">
                <div class="col-sm-9 col-md-10">
                <div class="row m-1">
                    <div class="col-sm-12 col-lg-11 text-start ">
                    <div class="row">
                        <div class="col-2 text-end overflow-hidden">Nombre</div>
                        <div class="col-10 bg-light shadow-sm overflow-hidden"><h5>`+listado[i].nombre+`</h5></div>
                    </div>  
                    </div>
                </div>
                <div class="row m-1 text-center">
                    <div class="col-2 text-end overflow-hidden ">Fecha</div>
                    <div class="col-1 bg-light shadow-sm m-1">`+listado[i].fecha_subida+`</div>
                    <div class="col-2 text-end overflow-hidden ">Me gusta</div>
                    <div class="col-1 bg-light shadow-sm m-1">`+listado[i].me_gusta+`</div>
                    <div class="col-2 text-end overflow-hidden">Descargas</div>
                    <div class="col-1 bg-light shadow-sm m-1">`+listado[i].num_descargas+`</div>
                </div>
                <div class="row m-1">
                    <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                    <div class="row">
                        <div class="col-2 text-end overflow-hidden">Asignatura</div>
                        <div class="col-10 bg-light shadow-sm overflow-hidden">`+listado[i].asignatura+`</div>
                    </div>  
                    </div>
                </div>
                <div class="row m-1">
                    <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                    <div class="row">
                        <div class="col-2 text-end overflow-hidden">Centro</div>
                        <div class="col-10 bg-light shadow-sm overflow-hidden">`+listado[i].centro+`</div>
                    </div>  
                    </div>
                </div>
                <div class="row m-1">
                    <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                    <div class="row">
                        <div class="col-2 text-end overflow-hidden">Autor/a</div>
                        <div class="col-10 bg-light shadow-sm overflow-hidden">`+listado[i].nombre_usuario+`</div>
                    </div>  
                    </div>
                </div>
                <div class="row m-1">
                    <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                    <div class="row">
                        <div class="col-2 text-end overflow-hidden">Descripción</div>
                        <div class="col-10 bg-light shadow-sm overflow-hidden">`+listado[i].descripcion+`</div>
                    </div>  
                    </div>
                </div>
                <div class="row m-1">
                    <div class="col-sm-12 col-lg-11 text-start text-success" id="textoAddApunte`+listado[i].cod_apunte+`"></div>
                </div>
                </div>
                <!-- Botonera -->
                <div class="col-sm-3 col-md-2 align-items-center">
                <div class="row"><button class="btn btn btn-outline-primary m-1" id="btnBusAdd`+listado[i].cod_apunte+`" onclick="addApunteBiblioteca(`+listado[i].cod_apunte+`)">Añadir</button></div>
                <div class="row"><button class="btn btn btn-outline-primary m-1" id="btnBusDescargar`+listado[i].cod_apunte+`" onclick="descargarApunteBuscado(`+listado[i].cod_apunte+`)">Descargar</button></div>
                <div class="row"><button class="btn btn btn-outline-primary m-1" id="btnBusMeGusta`+listado[i].cod_apunte+`" onclick="sumarMeGusta(`+listado[i].cod_apunte+`)">Me Gusta</button></div>
                </div>
            </div>
        
            </div>
            </div>`;
        }
        
    }

    document.getElementById("listaBuscador").innerHTML = respuestaBuscar;

}




function buscarApuntes(){


    // Cada vez que se haga una búsqueda hay que borrar antes listadoBusqueda para que no se acumulen
    listadoBusqueda.length = 0;
    listadoMisDocumentos = JSON.parse(sessionStorage.getItem('listadoMisDocumentos'));

    let data = new FormData();
    data.append('texto_busqueda', document.getElementById("inputBuscar").value);
    fetch('/PHP/buscar.php', {
        method: 'POST',
        body: data
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        //listadoBusqueda = data;
        listadoBusquedaAux = data;
        sessionStorage.setItem('listadoBusqueda', JSON.stringify(data));
        console.log(listadoBusquedaAux);
        let repetido = false;

        //Para evitar que en la lista de buscados salgan los apuntes que ya tienes añadidos
        for (let i = 0; i < listadoBusquedaAux.length; i++) {
            for (let j = 0; j < listadoMisDocumentos.length; j++) {
                if(listadoBusquedaAux[i].cod_apunte == listadoMisDocumentos[j].cod_apunte){
                    repetido=true;
                }
                
            }
            if(repetido==false){
                listadoBusqueda.push(listadoBusquedaAux[i]);
            }
            repetido=false;
        }

        console.log(listadoMisDocumentos);
        console.log(listadoBusqueda);
        let respuestaMisDocumentos = "";

        if(listadoBusqueda.length == 0){
            respuestaMisDocumentos = `<div id="listaDocumentos">
            <div class="row justify-content-center align-items-center bg-light mt-5">
              <div class="col-md-12 shadow-lg bg-white p-4 justify-content-center align-items-center text-center">
                <div class="row">
                  <div class="col-sm-12 col-md-12 justify-content-center align-items-center text-center">
                    <h4 class="text-center">La búsqueda no ha dado resultados</h4>
                  </div>
                </div>
            </div>
            </div>`;
            document.getElementById("listaBuscador").innerHTML = respuestaMisDocumentos;
        }else{

            rellenarBusqueda(listadoBusqueda);

            //Rellenar el array de asignaturas del filtro de búsqueda
            rellenarFiltroBusqueda(listadoBusqueda);    
            
        }

    })
    .catch(function(error){
        console.log(error);
    });

}

// Filtra la lista de documentos buscados por asignatura
function filtrarBuscador(asignatura){
    
    let textoRespuesta = "";
    console.log(asignatura);


    document.getElementById("listaBuscador").innerHTML = "";

    if (asignatura == "Todas"){
        //Mostrar todos los documentos
        rellenarBusqueda(listadoBusqueda);

    }else{

        //let nombre = document.getElementById("inputFiltroNombre").value;
        //if (nombre == ""){
        //console.log(listadoMisDocumentos[0].asignatura);
        for(let i = 0; i < listadoBusqueda.length; i++){
            if (listadoBusqueda[i].asignatura == asignatura){
                //console.log(listadoMisDocumentos[i].asignatura);

                    //comprobar si el usuario es el propietario del documento
                    if(listadoBusqueda[i].propietario != sessionStorage.getItem('cod_usuario')){
                        
                            textoRespuesta += `<div class="row justify-content-center align-items-center bg-light mt-5">
                            <div class="col-md-12 shadow-lg bg-white p-4">
                              <div class="row">
                                <div class="col-sm-9 col-md-10">
                                  <div class="row m-1">
                                    <div class="col-sm-12 col-lg-11 text-start ">
                                      <div class="row">
                                        <div class="col-2 text-end overflow-hidden">Nombre</div>
                                        <div class="col-10 bg-light shadow-sm overflow-hidden"><h5>`+listadoBusqueda[i].nombre+`</h5></div>
                                      </div>  
                                    </div>
                                  </div>
                                  <div class="row m-1 text-center">
                                    <div class="col-2 text-end overflow-hidden ">Fecha</div>
                                    <div class="col-1 bg-light shadow-sm m-1">`+listadoBusqueda[i].fecha_subida+`</div>
                                    <div class="col-2 text-end overflow-hidden ">Me gusta</div>
                                    <div class="col-1 bg-light shadow-sm m-1">`+listadoBusqueda[i].me_gusta+`</div>
                                    <div class="col-2 text-end overflow-hidden">Descargas</div>
                                    <div class="col-1 bg-light shadow-sm m-1">`+listadoBusqueda[i].num_descargas+`</div>
                                  </div>
                                  <div class="row m-1">
                                    <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                                      <div class="row">
                                        <div class="col-2 text-end overflow-hidden">Asignatura</div>
                                        <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoBusqueda[i].asignatura+`</div>
                                      </div>  
                                    </div>
                                  </div>
                                  <div class="row m-1">
                                    <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                                      <div class="row">
                                        <div class="col-2 text-end overflow-hidden">Centro</div>
                                        <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoBusqueda[i].centro+`</div>
                                      </div>  
                                    </div>
                                  </div>
                                  <div class="row m-1">
                                    <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                                      <div class="row">
                                        <div class="col-2 text-end overflow-hidden">Autor/a</div>
                                        <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoBusqueda[i].nombre_usuario+`</div>
                                      </div>  
                                    </div>
                                  </div>
                                  <div class="row m-1">
                                    <div class="col-sm-12 col-lg-11 text-start  m-1 ">
                                      <div class="row">
                                        <div class="col-2 text-end overflow-hidden">Descripción</div>
                                        <div class="col-10 bg-light shadow-sm overflow-hidden">`+listadoBusqueda[i].descripcion+`</div>
                                      </div>  
                                    </div>
                                  </div>
                                  <div class="row m-1">
                                    <div class="col-sm-12 col-lg-11 text-start text-success" id="textoAddApunte`+listadoBusqueda[i].cod_apunte+`"></div>
                                    </div>
                                </div>
                                <!-- Botonera -->
                                <div class="col-sm-3 col-md-2 align-items-center">
                                  <div class="row"><button class="btn btn btn-outline-primary m-1" id="btnBusAdd`+listadoBusqueda[i].cod_apunte+`" onclick="addApunteBiblioteca(`+listadoBusqueda[i].cod_apunte+`)">Añadir</button></div>
                                  <div class="row"><button class="btn btn btn-outline-primary m-1" id="btnBusDescargar`+listadoBusqueda[i].cod_apunte+`" onclick="descargarApunteBuscado(`+listadoBusqueda[i].cod_apunte+`)">Descargar</button></div>
                                  <div class="row"><button class="btn btn btn-outline-primary m-1" id="btnBusMeGusta`+listadoBusqueda[i].cod_apunte+`" onclick="sumarMeGusta(`+listadoBusqueda[i].cod_apunte+`)">Me Gusta</button></div>
                                </div>
                              </div>
                          
                              </div>
                            </div>`;
                        
                    }
    
    
                    
                    
                
            }
        } 
    
        document.getElementById("listaBuscador").innerHTML = textoRespuesta;
    }

}







