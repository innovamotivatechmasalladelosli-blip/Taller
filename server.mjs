import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const requested = normalize(join(root, relative));
  const publicRequested = normalize(join(root, 'public', relative));
  const safePath = requested.startsWith(root) ? requested : join(root, 'index.html');

  try {
    let filePath = safePath;
    try {
      await stat(filePath);
    } catch {
      if (!publicRequested.startsWith(join(root, 'public'))) throw new Error('Unsafe path');
      filePath = publicRequested;
    }
    const fileStat = await stat(filePath);
    filePath = fileStat.isDirectory() ? join(filePath, 'index.html') : filePath;
    const body = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': mime[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    response.end(body);
  } catch {
    if (!extname(pathname)) {
      const body = await readFile(join(root, 'index.html'));
      response.writeHead(200, { 'Content-Type': mime['.html'], 'Cache-Control': 'no-cache' });
      response.end(body);
      return;
    }
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`La Cochera preview running on http://0.0.0.0:${port}`);
});
