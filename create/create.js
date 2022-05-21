/* eslint-disable indent */
import { checkAuth, createListItem, getListItems, logout, deleteAllListItems, buyListItem } from '../fetch-utils.js';
import { renderListItem } from '../render-utils.js';

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

    
    const data = new FormData(form);
    
    const newPost = {
        name: data.get('name'),
        quantity: data.get ('quantity'),
    };
    const resp = await createListItem(newPost.name, newPost.quantity);
    console.log(resp);
    fetchAndDisplayList();
    form.reset();
});

async function fetchAndDisplayList() {
    const list = await getListItems();
    
    listEl.textContent = '';
    for (let item of list) {
        const listItemEl = renderListItem(item);
       listItemEl.addEventListener('click', async (e) => {
           e.preventDefault();
           await buyListItem(item);
           fetchAndDisplayList();
       });
        
        listEl.append(listItemEl);
    }
}
fetchAndDisplayList();