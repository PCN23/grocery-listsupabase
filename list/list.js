const form = document.getElementById('food-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get('name');
    const quantity = data.get('quantity');
    

});