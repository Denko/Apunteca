// Número aleatorio para crear el token de cada usuario
const NUM_TOKEN = 3215646463;

var datosUsuario;

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
    document.cookie = "nombre=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/"; 
    document.cookie = "usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC, path=/";
    console.log("Su sesión de usuario ha sido cerrada");
    window.location.href = "/HTML/login.html";

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



