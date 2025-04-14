const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const inCompleteList = document.getElementById('incomplete-list');
const completeList = document.getElementById('complete-list');

// LocalStorageに保存するための関数
const saveTodosToLocalStorage = () => {
  const todos = [];

  // 未完了リストの要素を取得
  document.querySelectorAll('#incomplete-list li').forEach((li) => {
    todos.push({ inputText: li.querySelector('span').textContent, completed: false });
  });

  // 完了リストの要素を取得
  document.querySelectorAll('#complete-list li').forEach((li) => {
    todos.push({ inputText: li.querySelector('span').textContent, completed: true }); //textを取得（勝手に名付けた）
  });
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Todoの要素を作成する関数
const createTodoElement = (inputText, completed) => {
  const li = document.createElement('li');

  // テキスト部分の表示
  const liText = document.createElement('span');
  liText.textContent = inputText;

  // 削除ボタンの作成
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除';

  // 完了ボタンの作成
  const completeButton = document.createElement('button');
  completeButton.textContent = '完了';

  // 完了ボタンを押したときの関数
  const moveToComplete = () => {
    inCompleteList.removeChild(li);
    completeList.appendChild(li);
    completeButton.textContent = '戻す';
    completeButton.removeEventListener('click', moveToComplete); // 完了ボタンのイベントリスナーを削除
    completeButton.addEventListener('click', moveToInComplete); // 戻すボタンのイベントリスナーを追加
    saveTodosToLocalStorage();
  };

  // 未完了に戻す処理の関数
  const moveToInComplete = () => {
    completeList.removeChild(li);
    inCompleteList.appendChild(li);
    completeButton.textContent = '完了';
    completeButton.removeEventListener('click', moveToInComplete);
    completeButton.addEventListener('click', moveToComplete);
    saveTodosToLocalStorage();
  };

  // 削除ボタンを押したときの処理
  deleteButton.addEventListener('click', () => {
    const answer = confirm('本当に削除しますか？');
    if (answer) {
      li.parentElement.removeChild(li); // どこからでも親要素から削除
      saveTodosToLocalStorage(); // これがなかったらリロードしたら消えない
    } else {
      alert('キャンセルされました。');
    }
  });

  if (completed) {
    completeButton.addEventListener('click', moveToInComplete);
    completeList.appendChild(li);
  } else {
    completeButton.addEventListener('click', moveToComplete);
    inCompleteList.appendChild(li);
  }

  li.appendChild(liText);
  li.appendChild(completeButton);
  li.appendChild(deleteButton);
};

// ToDo追加ボタンの処理
addButton.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;

  createTodoElement(text, false);
  input.value = '';
  saveTodosToLocalStorage();
});

// localStorageから復元する処理
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('todos');
  if (!saved) return;

  const savedTodos = JSON.parse(saved);
  savedTodos.forEach((savedTodo) => {
    createTodoElement(savedTodo.inputText, savedTodo.completed);
  });
});
