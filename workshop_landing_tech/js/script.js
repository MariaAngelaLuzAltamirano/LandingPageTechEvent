class Invitado {
    constructor(firstName, lastName, email){
        this.firstName= firstName ;
        this.lastName = lastName;
        this.email = email;
    }
}
//VARIABLES
let registrarse = document.getElementById('registrarse');
let enviar = document.getElementById('enviar');
let administrador = document.getElementById('administrador');
let pagPrincipal = document.getElementById('divPagPrincial');
let contenedorPrincipal = document.getElementById('contenedorformulario');
let formAdministrador = document.getElementById('formularioAdm');
let formRegistro = document.getElementById('formulario-registro');

let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let email = document.getElementById('email');
enviar.disabled = true;

let emailAdm = document.getElementById('emailAdm');
let password = document.getElementById('password');
let iniciarSes = document.getElementById('iniciarSesion');
iniciarSes.disabled = true;
let emailAdmIng;
let passwordIng;

let administradores = [
    {emailAdm: "mauri@acamica.com", password:"cucco2020"},
    {emailAdm: "ricardo@acamica.com", password:"trejo2020"},
    {emailAdm: "maria@acamica.com", password:"alta2020"}
]

let invitadosRegistrados;

//EVENTOS 

registrarse.addEventListener('click', () =>{
    pagPrincipal.style.display = "none";
    formAdministrador.style.display = "none";
    contenedorPrincipal.style.display = "block";
})

administrador.addEventListener('click', () =>{
    pagPrincipal.style.display = "none";
    contenedorPrincipal.style.display = "none";
    formAdministrador.style.display = "block";
})

nombre.addEventListener('blur', validarCampo);
apellido.addEventListener('blur', validarCampo);
email.addEventListener('blur', validarCampo);
emailAdm.addEventListener('blur', validarCampo);
password.addEventListener('blur', validarCampo);
iniciarSes.addEventListener('click', autorizaringresoAdm);
enviar.addEventListener('click', registroInvitado);


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

    

    if(emailAdm.value !== '' && password.value !== ''){
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
                investigarEmail();
            }
        }else{
            campo.style.borderBottomColor = 'red';
            campo.classList.add('error');
            alert('No esta ingresando un email, ingrese uno por favor');
        }
        

        function investigarEmail(){
            let bandera;
            fetch('http://localhost:3000/')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                invitadosRegistrados = data.data;

                for (i = 0; i<invitadosRegistrados.length;i++){
                    if(email.value == invitadosRegistrados[i].email){
                        campo.style.borderBottomColor = 'red';
                        campo.classList.add('error');
                        enviar.disabled = true;
                        bandera = true;
                    }
                }
                if(bandera === true){
                    alert ('Este email ya está registrado, ingrese otro por favor');
                }else{
                    if(nombre.value !== '' && apellido.value !== '' && email.value !== ''){
                        if(errores.length === 0){
                        enviar.disabled = false;
                        }else{
                        enviar.disabled = true;    
                        }
                    }
                }
                
            })
            
        }
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
    }
    emailAdmIng = emailAdm.value;
    passwordIng = password.value;

}

function autorizaringresoAdm(){
    let bandera;
    for (i = 0; i<administradores.length;i++){
        if(emailAdmIng == administradores[i].emailAdm && passwordIng == administradores[i].password){
            bandera = true;
            i = administradores.length;
        }
    }
    if(bandera === true){
        location.href="administracion.html";
    }else{
        alert ('Alguno de los datos ingresados son incorrectos');
    }
    formAdministrador.reset();
}    

function registroInvitado(e){
    e.preventDefault();
    let nuevo_invitado = new Invitado (nombre.value, apellido.value, email.value, true);
    console.log(JSON.stringify(nuevo_invitado));
    fetch('http://localhost:3000/',{
        method: "POST",
        body: JSON.stringify(nuevo_invitado),
        headers: {
            'Content-Type': 'application/json'
        }
    }); 
    formRegistro.reset();
}