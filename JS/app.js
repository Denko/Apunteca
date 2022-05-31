// Número aleatorio para crear el token de cada usuario
const NUM_TOKEN = 3215646463;

// Usa el cod_usuario para crear un token para la sesión
function crearToken(cod){
    return cod + NUM_TOKEN;
}

function comprobarToken(cod, token){
    if(crearToken(cod) == token){
        return true;
    }
    else{
        window.location.href = "/HTML/login.html";
        return false;
    }
}

function registrarUsuario(){

    var formulario = document.getElementById("formRegistro");
    var datos = new FormData(formulario);

    fetch("localhost:80/PHP/registrar.php", {
        method: 'POST',
        body: datos
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
}

