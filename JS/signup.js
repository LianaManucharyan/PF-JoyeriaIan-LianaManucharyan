const signupForm = document.querySelector('#signupForm');
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const Users = JSON.parse(localStorage.getItem('users')) || [];
    const isUserRegistered = Users.find(user => user.email === email);
    if(isUserRegistered){
        return Swal.fire({
            title: '¡Lo sentimos!',
            text: 'El usuario ingresado ya se encuentra registrado',
            icon: 'warning',
            iconColor: 'orange',
            confirmButtonText: 'Cerrar'
        });
    };

    Users.push({name: name, email: email, password: password});
    localStorage.setItem('users', JSON.stringify(Users));
    Swal.fire({
        title: '¡Felicitaciones!',
        text: 'Te has registrado con éxito',
        icon: 'success',
        iconColor: 'green',
        confirmButtonText: 'Aceptar'
    }).then((result)=>{
        window.location.href = '../PAGES/login.html';
    });
})