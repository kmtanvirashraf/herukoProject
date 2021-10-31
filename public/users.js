const form = document.querySelector('form');
const email = document.querySelector('#Email');
const password = document.querySelector('#Pass');


form.addEventListener('submit', e => {
    e.preventDefault();
    const loginDetails = {
        email: email.value,
        password: password.value
    };

    fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDetails)
    })
    .then(res => res.json())
    .then(response => {
        //console.log(response);
        if(response.error) {
            alert(response.error);
        }
        else {

            localStorage.setItem('token', response.token);
            location.href = response.redirect;
        }
    });
});