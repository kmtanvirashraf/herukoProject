const form = document.querySelector('form');
const username = document.querySelector('#Uname');
const password = document.querySelector('#Pass');
const email = document.querySelector('#Email');



form.addEventListener('submit', e => {
    e.preventDefault();
    const registrationDetails = {
        name: username.value,
        email: email.value,
        password: password.value
    };

    fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationDetails)
    })
    .then(res => res.json())
    .then(response => {
        //console.log(response);
        if(response.error) {
            alert(response.error);
        }
        else {

            localStorage.setItem('token', response.token);
            //location.href = response.redirect;
        }
    });
});