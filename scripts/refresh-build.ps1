#Requires -Version 7
# Refresh SEC EDGAR data -> build static site -> tests -> publish gate. Exits non-zero on any failure.
# Scheduled by the owner's PC; deployment (wrangler) is a separate parent-owned step.
# refresh.mjs keeps the last good snapshot when SEC is unreachable (exit 0 with a stale asOf), so a
# network outage still produces a correct, honestly dated build.
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)

function Step([string]$name, [scriptblock]$cmd) {
  Write-Host "== $name"
  & $cmd
  if ($LASTEXITCODE -ne 0) { Write-Error "$name failed (exit $LASTEXITCODE)"; exit $LASTEXITCODE }
}

if (-not (Test-Path node_modules)) { Step 'install' { pnpm install --frozen-lockfile } }
Step 'refresh' { pnpm run refresh }
Step 'test' { pnpm run test }
Step 'build' { pnpm run build }
Step 'gate' { pnpm run gate }
Write-Host '== done: dist/ is ready to deploy'
exit 0
