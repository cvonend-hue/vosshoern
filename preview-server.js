const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, 'site');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.woff2':'font/woff2','.svg':'image/svg+xml','.jpg':'image/jpeg'};
const port = Number(process.env.PORT || 4173);

http.createServer((request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  const filename = pathname.startsWith('/assets/') || pathname === '/styles.css' || pathname === '/app.js' || pathname === '/i18n.js' ? pathname.slice(1) : 'index.html';
  const file = path.join(root, filename);
  if (!file.startsWith(root + path.sep)) {
    response.writeHead(404).end();
    return;
  }
  fs.readFile(file, (error, content) => {
    if (error) { response.writeHead(404).end(); return; }
    response.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream'}).end(content);
  });
}).listen(port, '127.0.0.1', () => console.log(`Local URL: http://127.0.0.1:${port}`));
