const btnEnviar = document.querySelector("#btnEnviar");
    
    var inputUsuario = "pedro";
    var inputNombre = "Pedro";
    var inputPassword = "1234";
    var inputPassword2 = "1234";
    var inputEmail = "pedro@pedrito.com";
    var inputCentro = "Centro de pruebas";
    var inputEstudios = "Estudios de pruebas";
    var inputComentario = "Comentario de pruebas";

    btnEnviar.addEventListener("click", () => {

    let formData = new FormData();
            formData.append("inputUsuario", inputUsuario);
            formData.append("inputNombre", inputNombre);
            formData.append("inputPassword", inputPassword);
            formData.append("inputPassword2", inputPassword2);
            formData.append("inputEmail", inputEmail);
            formData.append("inputCentro", inputCentro);
            formData.append("inputEstudios", inputEstudios);
            formData.append("inputComentario", inputComentario);
            fetch("registar.php", {
                method: 'POST',
                body: formData,
            })
                .then(respuesta => respuesta.text())
                .then(decodificado => {
                    console.log(decodificado);
                });
    });