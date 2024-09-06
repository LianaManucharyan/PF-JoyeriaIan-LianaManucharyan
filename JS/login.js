    // Verificar si estamos en la página de inicio de sesión
    if (window.location.pathname.includes('login.html')) {
        const loginForm = document.querySelector('#loginForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();

                try {
                    // Obtener los valores del formulario
                    const email = document.querySelector('#email').value;
                    const password = document.querySelector('#password').value;

                    // Obtener los usuarios desde localStorage
                    const users = JSON.parse(localStorage.getItem('users')) || [];
                    const validUser = users.find(user => user.email === email && user.password === password);

                    if (!validUser) {
                        // Si el usuario no es válido, mostrar un mensaje de error
                        Swal.fire({
                            title: 'Error',
                            text: 'Usuario y/o contraseña incorrectos',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                        return;
                    }

                    // Mostrar un mensaje de éxito y redirigir si el usuario es válido
                    Swal.fire({
                        text: '¡Bienvenido! a Joyería Ian',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            localStorage.setItem('login_success', JSON.stringify(validUser));
                            // Asegúrate de que la ruta es correcta
                            window.location.href = 'index.html'; // Ajusta la ruta si es necesario
                        }
                    });

                } catch (error) {
                    // Manejar cualquier error que ocurra durante el proceso de inicio de sesión
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema con el inicio de sesión. Inténtalo de nuevo.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        }
    };

