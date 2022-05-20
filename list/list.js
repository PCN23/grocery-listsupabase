import { createListItem } from '../fetch-utils.js';

const form = document.querySelector('food-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get('name');
    const quantity = data.get('quantity');

    await createListItem(name, quantity);
    form.rest();
   
});


