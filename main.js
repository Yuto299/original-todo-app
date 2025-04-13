const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const list = document.getElementById('incomplete-list');

addButton.addEventListener('click', () => {
  const li = document.createElement('li');

  // テキスト部分の表示
  const inText = document.createElement('span');
  inText.textContent = input.value;

  // 削除ボタンの作成
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除';

  // liにspanと削除ボタンを追加
  li.appendChild(inText);
  li.appendChild(deleteButton);

  // ulにliを追加
  list.appendChild(li);

  // 入力欄を空にする
  input.value = '';

  // 削除ボタンを押したときの処理
  deleteButton.addEventListener('click', () => {
    const answer = confirm('本当に削除しますか？');
    if (answer) {
      list.removeChild(li);
    } else {
      alert('キャンセルされました。');
    }
  });
});
