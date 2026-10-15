// Minimal static server for dist/ that mimics the Cloudflare assets config
// (auto-trailing-slash + 404-page). Usage: node scripts/serve.cjs [port]
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const DIST = path.resolve(__dirname, '..', 'dist');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon' };

function start(port = 4331) {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://x');
    let p = decodeURIComponent(url.pathname);
    const file = path.join(DIST, p);
    if (!file.startsWith(DIST)) { res.writeHead(400); return res.end(); }
    const send = (f, status = 200) => { res.writeHead(status, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); };
    try {
      const st = fs.statSync(file);
      if (st.isFile()) return send(file);
      if (st.isDirectory()) {
        if (!p.endsWith('/')) { res.writeHead(307, { location: p + '/' }); return res.end(); }
        const idx = path.join(file, 'index.html');
        if (fs.existsSync(idx)) return send(idx);
      }
    } catch { /* fallthrough */ }
    if (!p.endsWith('/') && fs.existsSync(path.join(file, 'index.html'))) { res.writeHead(307, { location: p + '/' }); return res.end(); }
    return send(path.join(DIST, '404.html'), 404);
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}
module.exports = { start };
if (require.main === module) start(Number(process.argv[2] || 4331)).then(() => console.log('serving dist on', process.argv[2] || 4331));
