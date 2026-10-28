const list = document.getElementById('list');
const input = document.getElementById('title');
const addBtn = document.getElementById('add');
const empty = document.getElementById('empty');

async function loadTodos() {
  const res = await fetch('/api/todos');
  const todos = await res.json();
  render(todos);
}

function render(todos) {
  list.innerHTML = '';
  empty.hidden = todos.length > 0;

  todos.forEach((todo) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = todo.done;
    check.style.flex = '0';
    check.addEventListener('change', () => toggle(todo.id));

    const text = document.createElement('span');
    text.textContent = todo.title;
    text.addEventListener('click', () => toggle(todo.id));

    const del = document.createElement('button');
    del.className = 'del';
    del.textContent = "O'chirish";
    del.addEventListener('click', () => remove(todo.id));

    li.append(check, text, del);
    list.appendChild(li);
  });
}

async function addTodo() {
  const title = input.value.trim();
  if (!title) return;
  await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  input.value = '';
  loadTodos();
}

async function toggle(id) {
  await fetch(`/api/todos/${id}`, { method: 'PATCH' });
  loadTodos();
}

async function remove(id) {
  await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  loadTodos();
}

addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

loadTodos();
