import { redirectIfLoggedIn } from '../fetch-utils.js';


const signUpForm = document.getElementById('sign-up');
const signInForm = document.getElementById('sign-in');

//redirectIfLoggedIn();
 
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(signUpForm);

});