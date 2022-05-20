import { checkAuth, createListItem, logout } from '../fetch-utils.js';

checkAuth();

const error = document.getElementById('error');
const logoutButton = document.getElementById('logout');


logoutButton.addEventListener('click', () => {
    logout();
});

const form = document.getElementById('food-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const itemData = new FormData(form);
    const data = await createListItem(itemData.get('name'), itemData.get('quantity'));
    if (data) {
        window.location.href = '/list';
    } else {
        error.textContent = 'something went wrong';
    }
});

