// aqui va todo el código
console.log("hola mundo")

const dar_data = async (url, method = "GET", body = null) => {
    try {
        const token = localStorage.getItem("token")
        !token && ( window.location.href = "/" )
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            method: method,
            body: body
        })
        // transformar a JSON
        const data = await response.json()
        console.log(data.data);
        return {
            data, response
        }
    } catch (error) {
        console.error(error)
        console.log("hubo un error");
    }
}

const cerrar = document.getElementById('cerrar')
cerrar.addEventListener('click', () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡El cerrar sesión hará que también salgas de esta ventada D:!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, ¡quiero cerrar sesión!', 
        cancelButtonText: 'No, aún tengo tareas que hacer'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token')
                window.location.href = '/'
            }
        })
})

const llenar = async () => {
    try {
        // llamar api
        const a = await dar_data("https://graco-task-list.herokuapp.com/task")
        const data = a.data
        const taskListElement = document.getElementById("task-list")
        taskListElement.innerHTML = ''
        data.data.forEach((element) => {
            let fondo = 'background-color: '
            switch (element.priority) {
                case 1:
                case 2:
                    fondo += 'blue; color: white;'
                    break;
                case 3:
                case 4:
                    fondo += 'yellow;'
                    break;
                case 5:
                    fondo += 'red; color: white;'
                default:
                    break;
            }
            console.log(fondo);
            console.log(element.priority);
            const fecha = new Date(element.date)
            const dia = fecha.getDate() + 1
            const mes = fecha.getMonth() + 1
            const fecha_real = `${(dia <= 9) ? "0" + dia : dia}/${(mes <= 9) ? "0" + mes : mes}/${fecha.getFullYear()}`
            taskListElement.innerHTML += `
            <li id="${element._id}" class="list-group-item d-flex justify-content-between align-items-center"
                style="word-break: keep-all; ${fondo}">
                <div class="mx-2 text-start" style="flex: 1;">
                    <div class="fw-bold">${element.name}</div>
                    <div>${fecha_real}</div>
                </div>
                    
                </div>
                <span class="badge bg-primary rounded-pill mx-1">${element.priority}</span>
                <button onclick="deleteTask('${element._id}')" type="button" class="btn btn-outline-danger btn-sm">
                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px"
                        height="20px">
                        <path
                            d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
                    </svg>
                </button>
            </li>
            `
        });
        if (data.data.length > 0) boton.style.display = "block"; else boton.style.display = "none"
        dar_numeros()
    } catch (error) {
        console.error(error)
        console.log("hubo un error");
    }
}
llenar()

const boton = document.getElementById("boton-borrar")

let cantidad = document.getElementById("label-cantidad")

const dar_numeros = async () => {
    try {
        const a = await dar_data("https://graco-task-list.herokuapp.com/task")
        const data = a.data
        cantidad.textContent = "Listado de tareas: " + data.data.length
        console.log(data.data);
    } catch (error) {
        console.error(error)
        console.log("hubo un error");
    }
}

const deleteTask = async (id) => {
    console.log("eliminando....", id)
    // buscamos etiqueta ol
    // buscamos etiqueta li por el id
    // const elementToDelete = document.getElementById(id)
    const a = await dar_data(`https://graco-task-list.herokuapp.com/task/${id}`, "DELETE")
    console.log("borrado");
    // eliminamos etiqueta li
    // taskListElement.removeChild(elementToDelete)
    if (a.response.status !== 200) {
        Swal.fire({
            icon: 'error',
            title: '¡Oh no!',
            text: '¡No funcionó!'
        })
        return
    }
    Swal.fire(
        '¡Funcionó!',
        '¡Tu tarea ha sido eliminada!',
        'success'
    )
    /*if (a.data.data.length == 0) {
        boton.style.display = "none"
    } else boton.style.display = "block"*/
    console.log("borrar");
    llenar()
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
        Swal.fire({
            title: '¿Está seguro que quiere eliminar todas las tareas?',
            text: "¡No serás capaz de recuperarlas?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, ¡Bórralo todo!', 
            cancelButtonText: '¡No, aún tengo cosas que hacer!'
            }).then(async (result) => {
            if (result.isConfirmed) {
                console.log("Eliminando tareas");
                const audio = new Audio("assets/Man falls down stairs meme.mp3")
                audio.play()
                const a = await dar_data("https://graco-task-list.herokuapp.com/task/delete/all")
                console.log(a.response.status);
                if (a.response.status === 200) {
                    Swal.fire(
                        '¡Funcionó!',
                        '¡Todo se borró!',
                        'success'
                    )
                    boton.style.display = "none"
                    console.log("se eliminaron")
                }
            } else boton.style.display = "block"
        })
    })
    dar_numeros()
}

// agarrar el elemento form
const formElement = document.getElementById("task-form")

if (formElement) {
    console.log("formulario funcionando...")
    // modificar el evento
    formElement.addEventListener("submit", async function(event) {
        event.preventDefault()
        // extraer los datos nombre de la tarea y prioridad
        const inputElement = document.getElementById("taskName")
        const inputDate = document.getElementById("taskDate")
        const selectElement = document.getElementById("taskPriority")
        console.log(inputDate.value);
        if (inputElement.value !== "" && inputDate.value !== "") {
            const objeto = {
                'name': inputElement.value, 
                'date': inputDate.value, 
                'priority': parseInt(selectElement.value)
            }
            const a = await dar_data("https://graco-task-list.herokuapp.com/task", 'POST', JSON.stringify(objeto))
            if (a.response.status !== 200) {
                Swal.fire({
                    icon: 'error',
                    title: '¡Oh no!',
                    text: '¡No funcionó!'
                })
                return
            }
            Swal.fire({
                icon: 'succes',
                title: '¡Funcionó!',
                text: '¡Se agregó una nueva tarea!'
            })
            if (a.data.data.length > 0) boton.style.display = "block"; else boton.style.display = "none"
            console.log("llenar");
            llenar()
            inputElement.value = ''
            inputDate.value = ''
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Así no se hace >:V!',
                text: 'Debes especificar una tarea prro >:v'
            })
        }

    })
}