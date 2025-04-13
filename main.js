const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const list = document.getElementById('incomplete-list');

addButton.addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = input.value;
  list.appendChild(li); //ulの子要素としてliを追加
  input.value = '';
});
