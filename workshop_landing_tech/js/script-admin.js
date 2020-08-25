let numeroAsisten = document.getElementById("numero-asisten");
let numeroCancelados = document.getElementById("numero-cancelados");
let numeroDisponibles = document.getElementById("numero-disponibles");

numeroDisponibles.textContent = 100; //capacidad de invitados disponible

let newsBell = document.getElementById("newsBell");
let secciones = document.querySelector(".secciones");
let tablaInvitadosConfirmados = document.querySelector(".tabla-invitados.confirmados");
let tablaInvitadosCancelados = document.querySelector(".tabla-invitados.cancelados");
let cancelados = document.getElementById("cancelados");
let invitados = document.getElementById("invitados");

let captionInvitados = document.querySelector(".caption-invitados");

let contCancelados = 0; //inicializo la cantidad de cancelados

document.addEventListener("click", () => {

    if(event.target.className == "fas fa-trash-alt") {

        let eliminar = document.getElementsByClassName("fas fa-trash-alt");
        let tableRowsConfirmados = document.getElementsByClassName("row-invitados-confirmados");
        let firstName = document.getElementsByClassName("firstName");
        let lastName = document.getElementsByClassName("lastName");
        let mailtoConfirmado = document.getElementsByClassName("mailto-confirmado");

        for(let i = 0; i < eliminar.length; i++) {

            if(event.target === eliminar[i]) {

                crearInvitado(tablaInvitadosCancelados, firstName[i].textContent, lastName[i].textContent, mailtoConfirmado[i].textContent);

                tableRowsConfirmados[i].remove();
                
                contCancelados += 1;
                numeroCancelados.textContent = contCancelados;
                numeroDisponibles.textContent = parseInt(numeroDisponibles.textContent) + 1;

                if(eliminar.length == 0) {

                    secciones.remove();
                    captionInvitados.textContent = "No hay invitados confirmados"
                    captionInvitados.style.color = "black";
                    captionInvitados.style.width = "32rem";
                }
                return;
            }          
        }

    }else if(event.target.className == "numeros cancelados") {

        cancelados.style.display = "unset";
        invitados.style.display = "none";

    }else if(event.target.className == "numeros confirmados") {

        cancelados.style.display = "none";
        invitados.style.display = "";

    }
})

$(document).ready(function() {
 
    $("#bell").click(function() {
 
        $("#lista-invitados").slideToggle(500);
 
    });
 
});


//LLAMO AL SERVIDOR PARA OBTENER LA LISTA DE INVITADOS

async function getInvitados() {
    let endPoint = "http://localhost:3000/invitados";
    const resp = await fetch(endPoint);
    return resp;
};

let arrayInvitados; //array con los invitados

getInvitados()
.then(resp => resp.text())
.then(data => {

    let response = JSON.parse(data);

    arrayInvitados = response.data;

    console.log(arrayInvitados);

    numeroAsisten.textContent = arrayInvitados.length;

    let invitadosNuevos = document.getElementById("invitados-nuevos");

    invitadosNuevos.textContent = arrayInvitados.length;
    newsBell.style.display = "flex";

    numeroDisponibles.textContent = parseInt(numeroDisponibles.textContent) - parseInt(numeroAsisten.textContent);

    for(let i = 0; i < arrayInvitados.length; i++) {
        
        crearInvitado(tablaInvitadosConfirmados, arrayInvitados[i].firstName, arrayInvitados[i].lastName, arrayInvitados[i].email);

    }
})
.catch(error => console.log("ERROR", error));



//FUNCIÓN PARA CREAR LAS FILAS DE INVITADOS 

function crearInvitado(tabla, nombre, apellido, correo) {

    let rowInvitado = document.createElement("tr");
    let tdNombre = document.createElement("td");
    let tdApellido = document.createElement("td");
    let tdEmail = document.createElement("td");
    let email = document.createElement("a");
    let tdEliminar = document.createElement("td");
    let iconEliminar = document.createElement("i");

    tabla.appendChild(rowInvitado);

    rowInvitado.appendChild(tdNombre);
    rowInvitado.appendChild(tdApellido);
    rowInvitado.appendChild(tdEmail);
    
    tdEmail.appendChild(email);

    if(tabla == tablaInvitadosConfirmados) {

        rowInvitado.appendChild(tdEliminar);
        tdEliminar.appendChild(iconEliminar);
        tdEliminar.className = "eliminar";
        iconEliminar.className = "fas fa-trash-alt";
        rowInvitado.className = "row-invitados-confirmados";
        tdNombre.className = "firstName";
        tdApellido.className = "lastName";
        email.className = "mailto-confirmado";

    }else {

        rowInvitado.className = "row-invitados-cancelados";
        email.className = "mailto-cancelado";
    }

    email.setAttribute("href", `mailto:${correo}`);
    
    tdNombre.textContent = nombre;
    tdApellido.textContent = apellido;
    email.textContent = correo;

}

