const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'src');
const dist = path.join(__dirname, '..', 'dist');

fs.mkdirSync(dist, { recursive: true });
fs.readdirSync(src).forEach((file) => {
  fs.copyFileSync(path.join(src, file), path.join(dist, file));
});

console.log('Build tayyor: dist/ papkasiga nusxalandi');
