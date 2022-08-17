// aqui va todo el código
console.log("hola mundo")

const boton = document.getElementById("boton-borrar")

let cantidad = document.getElementById("label-cantidad")

const dar_numeros = () => {
    let taskListElement = document.getElementById("task-list")
    cantidad.textContent = "Listado de tareas: " + taskListElement.children.length
}

dar_numeros()

const deleteTask = (id) => {
    console.log("eliminando....", id)
    // buscamos etiqueta ol
    const taskListElement = document.getElementById("task-list")
    // buscamos etiqueta li por el id
    const elementToDelete = document.getElementById(id)

    // eliminamos etiqueta li
    taskListElement.removeChild(elementToDelete)

    if (taskListElement.children.length == 0) {
        boton.style.display = "none"
    } else boton.style.display = "block"
    dar_numeros()
}

// codigo de ejemplo
const btnElement = document.getElementById("delete-all-btn")

if (btnElement) {
    btnElement.addEventListener("click", function() {
        console.log("eliminando tarea")
        // codigo
    })
}

if (boton) {
    boton.addEventListener("click", () => {
        if (confirm("¿Está seguro que quiere eliminar todas las tareas?") === true) {
            console.log("Eliminando tareas");
            const audio = new Audio("assets/Man falls down stairs meme.mp3")
            audio.play()
            const taskListElement = document.getElementById("task-list")
            while (taskListElement.children.length > 0) {
                for (let i = 0; i < taskListElement.children.length; i++) {
                    let element = taskListElement.children[i];
                    taskListElement.removeChild(element)
                }   
            }
            dar_numeros()
            boton.style.display = "none"
            console.log(taskListElement.children.length);
            console.log("se eliminaron")            
        } else boton.style.display = "block"
    })
    dar_numeros()
}

// agarrar el elemento form
const formElement = document.getElementById("task-form")

if (formElement) {
    console.log("formulario funcionando...")
    // modificar el evento
    formElement.addEventListener("submit", function(event) {
        event.preventDefault()
       
        // extraer los datos nombre de la tarea y prioridad
        const inputElement = document.getElementById("taskName")

        const inputDate = document.getElementById("taskDate")

        console.log(inputDate.value);
        
        if (inputElement.value !== "" && inputDate.value !== "") {
            // buscar el select
            const selectElement = document.getElementById("taskPriority")
            let fondo = 'background-color: '
            switch (selectElement.value) {
                case "1":
                case "2":
                    fondo += 'blue; color: white;'
                    break;
                case "3":
                case "4":
                    fondo += 'yellow;'
                    break;
                case "5":
                    fondo += 'red; color: white;'
                default:
                    break;
            }

            const fecha = new Date(inputDate.value)
            const dia = fecha.getDate() + 1
            const mes = fecha.getMonth() + 1
            const fecha_real = `${(dia <= 9) ? "0" + dia : dia}/${(mes <= 9) ? "0" + mes : mes}/${fecha.getFullYear()}`
            
            // tengo los valoes del input y del select
            console.log( inputElement.value )
            console.log( selectElement.value )
            console.log( inputDate.value );

            // agregar nuevo li a la lista
            const taskListElement = document.getElementById("task-list")

            let mayorId = 1 

            // verificamos cantida de hijos de una etiqueta
            if (taskListElement.children.length > 0) {
                // buscamos el hijo
                const ultimoHijo = taskListElement.children[ taskListElement.children.length - 1 ]
                // incrementar
                mayorId += parseInt( ultimoHijo.id ) 
            } 

            taskListElement.innerHTML += `
            <li id="${mayorId}" class="list-group-item d-flex justify-content-between align-items-center"
                style="word-break: keep-all; ${fondo}">
                <div class="mx-2 text-start" style="flex: 1;">
                    <div class="fw-bold">${inputElement.value}</div>
                    <div>${fecha_real}</div>
                </div>
                    
                </div>
                <span class="badge bg-primary rounded-pill mx-1">${selectElement.value}</span>
                <button onclick="deleteTask(${mayorId})" type="button" class="btn btn-outline-danger btn-sm">
                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px"
                        height="20px">
                        <path
                            d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
                    </svg>
                </button>
            </li>
            `

            if (taskListElement.children.length > 0) {
                boton.style.display = "block"
            } else {
                boton.style.display = "none"
            }

            dar_numeros()

        } else {
            alert(" Debes especificar una tarea prro >:v ")
        }

    })
}