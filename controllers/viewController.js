const fs = require('fs');
const path = require('path');
const { MIME } = require('./helpers');

const ROOT = path.join(__dirname, '..');

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 - Topilmadi');
    }
    const type = MIME[path.extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type });
    res.end(content);
  });
}

// GET /
function homePage(req, res) {
  sendFile(res, path.join(ROOT, 'html', 'index.html'));
}

// GET /static/...
function staticFile(req, res, pathname) {
  const staticDir = path.join(ROOT, 'static');
  const filePath = path.join(ROOT, pathname);
  if (!filePath.startsWith(staticDir)) {
    res.writeHead(403);
    return res.end();
  }
  sendFile(res, filePath);
}

module.exports = { homePage, staticFile };
