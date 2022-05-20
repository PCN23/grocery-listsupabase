import { checkAuth, createListItem, getListItems, logout } from '../fetch-utils.js';

checkAuth();

const error = document.getElementById('error');
const form = document.getElementById('food-form');
const deleteButton = document.querySelector('.delete');
const listEl = document.querySelector('.list');

checkAuth();

const logoutButton = document.getElementById('logout');

deleteButton.addEventListener('click', async () => {
    await deleteAllListItems();

    await fetchAndDisplayList();
});

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async () => {
    await fetchAndDisplayList();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const Data = new FormData(form);
    const item = await createListItem(Data.get('name'), Data.get('quantity'));
    if (data) {
        window.location.href = '/list';
    } else {
        error.textContent = 'something went wrong';
    }
    await fetchAndDisplayList();

});

async function fetchAndDisplayList() {
    const list = await getListItems();

    listEl.textContent = '';
    for (let item of list) {
        const listItemEl = document.createElement('p');

        listItemEl.classList.add('food-form');
        listItemEl.textContent = `${item.name} ${item.quantity}`;

        if (item.bought) {
            listItemEl.classList.add('bought');
        } else {
            listItemEl.classList.add('not-bought');
            listItemEl.addEventListener('click', async () => {
                await buyListItem(item.id);
                fetchAndDisplayList();
            });
        }
        listEl.append(listItemEl);
    }
}
