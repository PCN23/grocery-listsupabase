export function renderListItem(item) {
    const div = document.createElement('div');
    div.textContent = `${item.name} ${item.quantity}`;
    if (item.purchased) {
        div.classList.add('bought');
    } 
    return div;
}