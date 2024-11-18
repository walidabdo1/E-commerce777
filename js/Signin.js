// Start Signin Form JavaScript //
const signinForm = document.getElementById('signinForm');
const messageBox = document.getElementById('messageBox');

if (signinForm) {
    signinForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const email = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;
        const data = {
            email: email,
            password: password
        };

        fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                return response.json().then(errorData => {
                    throw new Error(errorData.message);
                });
            }
        })
        .then(responseData => {
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('userData', JSON.stringify(responseData.user));
            window.location.href = 'index.html';
        })
        .catch(error => {
            messageBox.innerHTML = `<div class="alert alert-danger"> ${error.message}</div>`;
        });
    });
}
// End Signin Form JavaScript //
