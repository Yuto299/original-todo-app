const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const inCompleteList = document.getElementById('incomplete-list');
const completeList = document.getElementById('complete-list');

addButton.addEventListener('click', () => {
  const li = document.createElement('li');

  // テキスト部分の表示
  const liText = document.createElement('span');
  liText.textContent = input.value;

  // 削除ボタンの作成
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除';

  // 完了ボタンの作成
  const completeButton = document.createElement('button');
  completeButton.textContent = '完了';

  // 削除ボタンを押したときの処理
  deleteButton.addEventListener('click', () => {
    const answer = confirm('本当に削除しますか？');
    if (answer) {
      li.parentElement.removeChild(li); // どこからでも親要素から削除
    } else {
      alert('キャンセルされました。');
    }
  });

  // 完了ボタンを押したときの関数
  const moveToComplete = () => {
    inCompleteList.removeChild(li);
    completeList.appendChild(li);
    completeButton.textContent = '戻す';

    completeButton.removeEventListener('click', moveToComplete); // 完了ボタンのイベントリスナーを削除
    completeButton.addEventListener('click', moveToInComplete); // 戻すボタンのイベントリスナーを追加
  };

  // 未完了に戻す処理の関数
  const moveToInComplete = () => {
    completeList.removeChild(li);
    inCompleteList.appendChild(li);
    completeButton.textContent = '完了';

    completeButton.removeEventListener('click', moveToInComplete);
    completeButton.addEventListener('click', moveToComplete);
  };

  // 完了ボタンを押したときの処理
  completeButton.addEventListener('click', moveToComplete); // 戻すボタンの出現に繋がるので、戻す処理は書かなくていい

  li.appendChild(liText);
  li.appendChild(completeButton);
  li.appendChild(deleteButton);
  inCompleteList.appendChild(li);

  input.value = '';
});
