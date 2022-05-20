import { checkAuth, createListItem, getListItems, logout, deleteAllListItems, buyListItem } from '../fetch-utils.js';

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
});

async function fetchAndDisplayList() {
    const list = await getListItems();
    
    listEl.textContent = '';
    for (let item of list) {
        const listItemEl = document.createElement('p');
        
        listItemEl.classList.add('food-form');
        listItemEl.textContent = ` ${item.quantity} ${item.name}`;
        
        console.log(item.purchased);
        if (item.purchased) {
            listItemEl.classList.add('bought');
        } else {
            // listItemEl.classList.add('not-bought');
            listItemEl.addEventListener('click', async () => {
                await buyListItem(item.id);
                fetchAndDisplayList();
            });
        }
        listEl.append(listItemEl);
    }
}
