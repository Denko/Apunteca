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
//Para sesio
function iniciarSesion() {
    
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

function getUrlImagen(usuarioBusqueda){
    console.log(usuarioBusqueda);
    let data = new FormData();
    data.append('usuarioB', usuarioBusqueda);
    
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
            return JSON.stringify(data.data);
            //document.getElementById("fotoPerfil").src = data;
        }
    })
    .catch(function(error){
        console.log(error);
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
            var ruta= getUrlImagen(getCookie("usuario"));
            console.log(ruta);
            console.log(imagen);
            /* ARREGLAR para que la imagen se actualice cuando se cambie
            document.getElementById("fotoPerfil").src = "/PHP/" + imagen;
            */

        }else{
            let textoRespuesta = "Error al cambiar la imagen, sube sólo archivos JPG, JPEG o PNG y de menos de 20MB";
            document.getElementById("errorImagen").innerHTML = textoRespuesta;
        }
        
      };
}

