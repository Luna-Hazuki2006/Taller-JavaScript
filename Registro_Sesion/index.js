const registrar = document.getElementById("registrar")

if (registrar) {
    registrar.addEventListener("submit", async (event) => {
        event.preventDefault()
        const nombres = document.getElementById("nombres")
        const apellidos = document.getElementById("apellidos")
        const email = document.getElementById("email")
        const contraseña = document.getElementById("contraseña")
        if (nombres.value === "" || apellidos.value === "" || email.value === "" || contraseña.value === "") {
            Swal.fire({
                icon: 'error',
                title: '¡Oh no!',
                text: 'Solo te puedes registrar si todos los campos están llenos'
            })
            return
        }

        const info = {
            "name": nombres.value,
            "lastName": apellidos.value,
            "email": email.value,
            "password": contraseña.value
        }

        try {
            const response = await fetch("https://graco-task-list.herokuapp.com/register", {
                method: "POST", 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })
            const data = await response.json()
            if (response.status === 200) {
                Swal.fire({
                    icon: 'succes',
                    title: '¡Lo lograste!',
                    text: 'Te pudiste registrar exitósamente', 
                    confirmButtonColor: '#3085d6',
                }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.href = "/"
                    }
                })

                // Swal.fire({
                //     title: 'Are you sure?',
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
                    text: 'Hubo un error y no te pudiste registrar'
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