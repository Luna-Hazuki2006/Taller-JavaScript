const iniciar = document.getElementById("iniciar")

const revisar = () => {
    const token = localStorage.getItem('token')
    token && (window.location.href = 'Listado')
}
revisar()
if (iniciar) {
    iniciar.addEventListener("submit", async (event) => {
        event.preventDefault()
        const email = document.getElementById("email")
        const contraseña = document.getElementById("contraseña")
        console.log(email.value);
        console.log(contraseña.value);
        if (email.value === "" || contraseña.value === "") {
            Swal.fire({
                icon: 'error',
                title: '¡Oh no!',
                text: 'Solo puedes iniciar sesión si todos los campos están llenos'
            })
            return
        }

        const info = {
            "email": email.value,
            "password": contraseña.value
        }

        try {
            const response = await fetch("https://graco-task-list.herokuapp.com/login", {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })
            const data = await response.json()
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Lo lograste!',
                    confirmButtonColor: '#3085d6',
                    text: 'Te pudiste iniciar exitósamente'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const token = data.token
                        localStorage.setItem("token", token)
                        window.location.href = "/Listado"
                    }
                })
                // Swal.fire({
                //     title: 'Are you ?',
                //     text: "You won't be able to revert this!",
                //     icon: 'warning',
                //     showCancelButton: true,
                //     confirmButtonColor: '#3085d6',
                //     cancelButtonColor: '#d33',
                //     confirmButtonText: 'Yes, delete it!'
                //   }).then((result) => {
                //     if (result.isConfirmed) {
                //       window.location.href = "/"
                //     }
                //   })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '¡Oh no!',
                    text: 'Hubo un error y no te pudiste iniciar'
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: '¡Oh no!',
                text: error
            })
            console.error(error);
        }

    })
}