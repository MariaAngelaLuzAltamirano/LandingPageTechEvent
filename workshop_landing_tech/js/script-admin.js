let numeroAsisten = document.getElementById("numero-asisten");
let numeroCancelados = document.getElementById("numero-cancelados");
let numeroDisponibles = document.getElementById("numero-disponibles");

let tableRows = document.getElementsByClassName("row-invitados");
let secciones = document.querySelector(".secciones");
let tablaInvitados = document.querySelector(".tabla-invitados.confirmados");
let cancelados = document.getElementById("cancelados");
let invitados = document.getElementById("invitados");

let captionInvitados = document.querySelector(".caption-invitados");

numeroAsisten.textContent = tableRows.length;

let eliminar = document.getElementsByClassName("fas fa-trash-alt");
let contCancelados = 0;

document.addEventListener("click", () => {

    if(event.target.className == "fas fa-trash-alt") {

        for(let i = 0; i < eliminar.length; i++) {

            if(event.target === eliminar[i]) {

                tableRows[i].remove();
                contCancelados += 1;
                numeroCancelados.textContent = contCancelados;
                numeroDisponibles.textContent = contCancelados;

                if(eliminar.length == 0) {

                    secciones.remove();
                    captionInvitados.textContent = "No hay invitados"
                    captionInvitados.style.width = "20rem"
                }
                return;
            }          
        }

    }else if(event.target.className == "mailto") {

        let mail = event.target.textContent;

        event.target.setAttribute("href", `mailto:${mail}`);

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




