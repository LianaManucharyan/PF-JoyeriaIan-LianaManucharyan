const signupForm = document.querySelector('#signupForm');

            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const name = document.querySelector('#name').value;
                const email = document.querySelector('#email').value;
                const password = document.querySelector('#password').value;

                const users = JSON.parse(localStorage.getItem('users')) || [];
                const isUserRegistered = users.find(user => user.email === email);

                if (isUserRegistered) {
                    return Swal.fire({
                        title: '¡Lo sentimos!',
                        text: 'El usuario ingresado ya se encuentra registrado',
                        icon: 'warning',
                        confirmButtonText: 'Cerrar'
                    });
                }

                users.push({ name, email, password });
                localStorage.setItem('users', JSON.stringify(users));

                Swal.fire({
                    title: '¡Felicitaciones!',
                    text: 'Te has registrado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'login.html';
                    }
                });
            });