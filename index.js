const registrar = document.getElementById("registrar")

if (registrar) {
    registrar.addEventListener("submit", (event) => {
        event.preventDefault()
        const nombres = document.getElementById("nombres")
        const apellidos = document.getElementById("apellidos")
        const email = document.getElementById("email")
        const contraseña = document.getElementById("contraseña")
        if (nombres.value === "" || apellidos.value === "" || email.value === "" || contraseña.value === "") {
            Swal.fire({
                icon: 'error',
                title: '¡Oh no!',
                text: 'No se puede registrar si '
            })
        }

    })
}