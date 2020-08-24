//VARIABLES
let registrarse = document.getElementById('registrarse');
let enviar = document.getElementById('enviar');
let administrador = document.getElementById('administrador');
let pagPrincipal = document.getElementById('divPagPrincial');
let formPrincipal = document.getElementById('contenedorformulario');
let formAdministrador = document.getElementById('formularioAdm');

let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let email = document.getElementById('email');
enviar.disabled = true;

let emailAdm = document.getElementById('emailAdm');
let password = document.getElementById('password');
let iniciarSes = document.getElementById('iniciarSesion');
iniciarSes.disabled = true;

//EVENTOS 

registrarse.addEventListener('click', () =>{
    pagPrincipal.style.display = "none";
    formAdministrador.style.display = "none";
    formPrincipal.style.display = "block";
})

administrador.addEventListener('click', () =>{
    pagPrincipal.style.display = "none";
    formPrincipal.style.display = "none";
    formAdministrador.style.display = "block";
})

nombre.addEventListener('blur', validarCampo);
apellido.addEventListener('blur', validarCampo);
email.addEventListener('blur', validarCampo);
emailAdm.addEventListener('blur', validarCampo);
password.addEventListener('blur', validarCampo);

//FUNCIONES

function mostrarContrasena(){

    if(password.type == "password"){
        password.type = "text";
    }else{
        password.type = "password";
    }
}


function validarCampo() {

    enviar.disabled = true;
    //se valida la longitud del texto y que no este vacio
    campoVacio(this);

    //se valida email solamente
    if(this.type === 'email'){

        if(this.id == 'email'){
            validarEmail(this);
        }else{
            validarEmailAdm(this)
        }
    }

    let errores = document.querySelectorAll('.error');

    if(nombre.value !== '' && apellido.value !== '' && email.value !== ''){
        if(errores.length === 0){
        enviar.disabled = false;
        }else{
        enviar.disabled = true;    
        }
    }

    if(emailAdm.value !== '' && emailAdm.value !== ''){
        if(errores.length === 0){
        iniciarSes.disabled = false;
        }else{
        iniciarSes.disabled = true;    
        }
    }

    function campoVacio(campo){
        if(campo.value.length> 0){
            campo.style.borderBottomColor = 'green';
            campo.classList.remove('error');
        }else{
            campo.style.borderBottomColor = 'red';
            campo.classList.add('error');
        }
    }
    
    function validarEmail(campo){
        console.log('hola');
        
        const validador = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;

        if(validador.test(campo.value)){
            let palabraIncorrecta1 = "hotmail";
            let palabraIncorrecta2 = "gmail";
            let palabraIncorrecta3 = "yahoo";
            console.log(campo.value);
            if(campo.value.search(palabraIncorrecta1) >= 0 || campo.value.search(palabraIncorrecta2) >= 0 || campo.value.search(palabraIncorrecta3) >= 0){
               campo.style.borderBottomColor = 'red';
               campo.classList.add('error');
                alert('No esta ingresando un prestador permitido, ingrese otro email por favor');
            }
            else{
                campo.style.borderBottomColor = 'green';
                campo.classList.remove('error');
            }
        }else{
            campo.style.borderBottomColor = 'red';
            campo.classList.add('error');
            alert('No esta ingresando un email, ingrese uno por favor');
        }
        
        // investigarEmail(campo);

        // function investigarEmail(){
        //     let usuariosInvestigar = JSON.parse(localStorage.getItem("usuarios-local"));

        //     if(JSON.parse(localStorage.getItem("usuarios-local")) != null){
                
        //         for (i = 0; i<usuariosInvestigar.length;i++){
        
        //             if(campo.value == usuariosInvestigar[i].email){
        //                 campo.style.borderBottomColor = 'red';
        //                 campo.classList.add('error');
        //                 alert ('Este email ya está registrado, ingrese otro por favor');
        //             }
        //         }
        //     }
        // }
    }

    function validarEmailAdm(campo){
        
        const validador = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
    
        if(validador.test(campo.value)){
            campo.style.borderBottomColor = 'green';
            campo.classList.remove('error');
            
        }else{
            campo.style.borderBottomColor = 'red';
            campo.classList.add('error');
            alert('No esta ingresando un email, ingrese uno por favor');
        }
        
        // investigarEmail(campo);
    
        // function investigarEmail(){
        //     let usuariosInvestigar = JSON.parse(localStorage.getItem("usuarios-local"));
    
        //     if(JSON.parse(localStorage.getItem("usuarios-local")) != null){
                
        //         for (i = 0; i<usuariosInvestigar.length;i++){
        
        //             if(campo.value == usuariosInvestigar[i].email){
        //                 campo.style.borderBottomColor = 'red';
        //                 campo.classList.add('error');
        //                 alert ('Este email ya está registrado, ingrese otro por favor');
        //             }
        //         }
        //     }
        // }
    }
}

