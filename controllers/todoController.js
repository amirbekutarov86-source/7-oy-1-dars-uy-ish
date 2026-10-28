const fs = require('fs');
const path = require('path');
const { sendJSON, readBody } = require('./helpers');

const DB_FILE = path.join(__dirname, '..', 'todos.json');

// ---- fs orqali saqlash ----
function loadTodos() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  fs.writeFileSync(DB_FILE, JSON.stringify(todos, null, 2));
}

// GET /api/todos
function getTodos(req, res) {
  sendJSON(res, 200, loadTodos());
}

// POST /api/todos
async function createTodo(req, res) {
  const { title } = await readBody(req);
  if (!title || !title.trim()) return sendJSON(res, 400, { error: 'title kerak' });

  const todos = loadTodos();
  const todo = { id: Date.now(), title: title.trim(), done: false };
  todos.push(todo);
  saveTodos(todos);
  sendJSON(res, 201, todo);
}

// PATCH /api/todos/:id
function toggleTodo(req, res, id) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (!todo) return sendJSON(res, 404, { error: 'Topilmadi' });

  todo.done = !todo.done;
  saveTodos(todos);
  sendJSON(res, 200, todo);
}

// DELETE /api/todos/:id
function deleteTodo(req, res, id) {
  const todos = loadTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return sendJSON(res, 404, { error: 'Topilmadi' });

  const [removed] = todos.splice(index, 1);
  saveTodos(todos);
  sendJSON(res, 200, removed);
}

module.exports = { getTodos, createTodo, toggleTodo, deleteTodo };
