const loginForm = document.querySelector('#loginForm');

window.location.href = './PAGES/login.html'

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            try {
                new Promise((resolve) => setTimeout(resolve, 1000));
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const validUser = users.find(user => user.email === email && user.password === password);

                if (!validUser) {
                    throw new Error('Usuario y/o contraseña incorrectos');
                }

                // Mostrar un mensaje de éxito
                Swal.fire({
                    text: '¡Bienvenido! a Joyería Ian',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

                // Guardar el estado del usuario en localStorage y redirigir
                localStorage.setItem('login_success', JSON.stringify(validUser));
                window.location.href = '../index.html';
                
            } catch (error) {
                // Mostrar un mensaje de error
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            } finally {
                // Código que siempre se ejecuta, independientemente de si hubo un error o no
                Swal.fire({
                    text: '¡Bienvenido! a Joyería Ian',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                })}});
    };
