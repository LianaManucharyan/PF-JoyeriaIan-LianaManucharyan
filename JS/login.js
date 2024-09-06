if (!window.location.pathname.includes('login.html')) {
    window.location.href = '../PAGES/login.html';
}
const loginForm = document.querySelector('#loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        try {
            // Simula un retraso
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const validUser = users.find(user => user.email === email && user.password === password);

            if (!validUser) {
                throw new Error('Usuario y/o contraseña incorrectos');
            }

            // Mostrar un mensaje de éxito y redirigir
            await Swal.fire({
                text: '¡Bienvenido! a Joyería Ian',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

            // Guardar el estado del usuario en localStorage y redirigir
            localStorage.setItem('login_success', JSON.stringify(validUser));
            window.location.href = 'index.html';
            
        } catch (error) {
            // Mostrar un mensaje de error
            await Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });
}
