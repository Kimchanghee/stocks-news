#Requires -Version 7
# Crawler-eye check (no JS): status codes, title/description/canonical, robots meta, LD parse.
# Usage: pwsh scripts/crawlcheck.ps1 [-Base http://127.0.0.1:4331] [-Out qa/crawl.txt]
param([string]$Base = 'http://127.0.0.1:4331', [string]$Out = 'qa/crawl.txt',
  [string[]]$Pages = @('/', '/company/aapl/', '/calendar/', '/guides/how-to-read-an-8-k/', '/forms/8-k/'),
  [string[]]$Files = @('/sitemap-index.xml', '/sitemap-companies.xml', '/robots.txt', '/llms.txt', '/llms-full.txt', '/ads.txt', '/feed.xml'),
  [string[]]$Missing = @('/no-such-page/', '/company/zzzz/'))
$lines = @("# crawl check $Base $(Get-Date -Format s)")
foreach ($u in $Pages) {
  $code = curl.exe -s -o NUL -w '%{http_code}' "$Base$u"
  $html = curl.exe -s "$Base$u" | Out-String
  $t = [regex]::Match($html, '<title>([^<]*)</title>').Groups[1].Value
  $d = [regex]::Match($html, '<meta name="description" content="([^"]*)"').Groups[1].Value
  $c = [regex]::Match($html, '<link rel="canonical" href="([^"]+)"').Groups[1].Value
  $r = [regex]::Match($html, '<meta name="robots" content="([^"]+)"').Groups[1].Value
  $h1 = ([regex]::Matches($html, '<h1')).Count
  $ldOk = 0; $ldBad = 0; $types = @()
  foreach ($m in [regex]::Matches($html, '<script type="application/ld\+json">([\s\S]*?)</script>')) {
    try { $j = $m.Groups[1].Value | ConvertFrom-Json -Depth 50; $ldOk++; $types += ($j.'@graph' | ForEach-Object { $_.'@type' }) } catch { $ldBad++ }
  }
  $lines += "$code $u | h1=$h1 | title($($t.Length))=$t | desc($($d.Length)) | canonical=$c | robots=$r | LD ok=$ldOk bad=$ldBad types=$($types -join ',')"
}
foreach ($u in $Files) { $code = curl.exe -s -o NUL -w '%{http_code}' "$Base$u"; $len = (curl.exe -s "$Base$u" | Out-String).Length; $lines += "$code $u ($len chars)" }
foreach ($u in $Missing) { $code = curl.exe -s -o NUL -w '%{http_code}' "$Base$u"; $lines += "$code $u (must be 404)" }
$lines += '--- robots.txt'; $lines += (curl.exe -s "$Base/robots.txt" | Out-String).Trim()
$lines += '--- ads.txt'; $lines += (curl.exe -s "$Base/ads.txt" | Out-String).Trim()
$lines += '--- sitemap-index.xml'; $lines += (curl.exe -s "$Base/sitemap-index.xml" | Out-String).Trim()
New-Item -ItemType Directory -Force (Split-Path $Out) | Out-Null
$lines | Set-Content $Out -Encoding utf8
$lines
