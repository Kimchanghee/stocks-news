// Reproducible local-only browser + crawler QA. No deploy or external ad requests.
const { spawn } = require('node:child_process');
const { start } = require('./serve.cjs');
function run(command, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(command, args, { stdio: 'inherit' });
    p.on('error', reject);
    p.on('exit', code => code === 0 ? resolve() : reject(new Error(`${command} exited ${code}`)));
  });
}
(async () => {
  const server = await start(4338);
  try {
    await run(process.execPath, ['scripts/shots.cjs', 'http://127.0.0.1:4338', 'qa/final-shots', '/', '/company/aapl/', '/calendar/', '/guides/how-to-read-an-8-k/']);
    await run('pwsh', ['-NoProfile', '-File', 'scripts/crawlcheck.ps1', '-Base', 'http://127.0.0.1:4338', '-Out', 'qa/final-crawl.txt']);
  } finally { server.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
