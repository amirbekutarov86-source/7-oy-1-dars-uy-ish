const http = require('http');
const { homePage, staticFile } = require('./controllers/viewController');
const todoController = require('./controllers/todoController');
const { sendJSON } = require('./controllers/helpers');

const PORT = 3000;

// Router: so'rovni mos controller'ga yo'naltiradi
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;
  const { method } = req;

  // Sahifa va statik fayllar
  if (method === 'GET' && pathname === '/') return homePage(req, res);
  if (method === 'GET' && pathname.startsWith('/static/')) return staticFile(req, res, pathname);

  // Todo API
  if (pathname === '/api/todos') {
    if (method === 'GET') return todoController.getTodos(req, res);
    if (method === 'POST') return todoController.createTodo(req, res);
  }

  const match = pathname.match(/^\/api\/todos\/(\d+)$/);
  if (match) {
    const id = Number(match[1]);
    if (method === 'PATCH') return todoController.toggleTodo(req, res, id);
    if (method === 'DELETE') return todoController.deleteTodo(req, res, id);
  }

  sendJSON(res, 404, { error: "Yo'l topilmadi" });
});

server.listen(PORT, () => {
  console.log(`Server ishlayapti: http://localhost:${PORT}`);
});
