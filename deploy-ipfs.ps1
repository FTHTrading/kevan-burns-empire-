# deploy-ipfs.ps1
# Sovereign IPFS Deployment Script for Kevan Burns Digital Empire Index
# Builds the Next.js static export and deploys to local IPFS node with IPNS publishing

param(
    [switch]$SkipBuild,
    [switch]$SkipPublish,
    [switch]$Verbose
)

$ErrorActionPreference = "Stop"

$ProjectDir = $PSScriptRoot
$OutDir = Join-Path $ProjectDir "out"
$IpfsBin = "C:\Users\Kevan\AppData\Local\Programs\IPFS Desktop\resources\app.asar.unpacked\node_modules\kubo\kubo\ipfs.exe"
$PlatformsJson = Join-Path $ProjectDir "src\data\platforms.json"

function Write-Step  { param([string]$M) Write-Host "`n=== $M ===" -ForegroundColor Cyan }
function Write-OK    { param([string]$M) Write-Host "  [OK] $M" -ForegroundColor Green }
function Write-Info  { param([string]$M) Write-Host "  -> $M" -ForegroundColor Gray }
function Write-Warn  { param([string]$M) Write-Host "  [!] $M" -ForegroundColor Yellow }

Write-Step "Pre-flight Checks"

if (-not (Test-Path $IpfsBin)) { Write-Error "IPFS binary not found at: $IpfsBin"; exit 1 }
Write-OK "IPFS binary found"

try {
    $peerInfo = & $IpfsBin id 2>&1
    if ($LASTEXITCODE -ne 0) { throw "IPFS daemon not responding" }
    Write-OK "IPFS daemon is running"
} catch {
    Write-Error "IPFS daemon is not running. Start IPFS Desktop first."
    exit 1
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { Write-Error "npm not found."; exit 1 }
Write-OK "npm available"

if (-not $SkipBuild) {
    Write-Step "Building Next.js Static Export"
    Push-Location $ProjectDir
    try {
        & npm run build
        if ($LASTEXITCODE -ne 0) { Write-Error "Build failed with exit code $LASTEXITCODE"; exit 1 }
        Write-OK "Build completed successfully"
    } finally { Pop-Location }
} else { Write-Warn "Skipping build (--SkipBuild flag set)" }

if (-not (Test-Path $OutDir)) { Write-Error "Output directory not found: $OutDir"; exit 1 }

$outSize = (Get-ChildItem -Path $OutDir -Recurse | Measure-Object -Property Length -Sum).Sum
$outSizeMB = [math]::Round($outSize / 1MB, 2)
Write-Info "Output size: $outSizeMB MB"

Write-Step "Adding to IPFS (CIDv1, recursive, pinned)"

$addOutput = & $IpfsBin add -r --cid-version=1 --pin "$OutDir" 2>&1
if ($LASTEXITCODE -ne 0) { Write-Error "IPFS add failed: $addOutput"; exit 1 }

$lines = $addOutput -split "`n"
$lastLine = $lines[-1].Trim()
$newCid = ($lastLine -split "\s+")[1]

if (-not $newCid -or $newCid.Length -lt 10) {
    Write-Error "Failed to extract CID from IPFS output"
    Write-Host $addOutput -ForegroundColor Red
    exit 1
}

Write-OK "Added to IPFS"
Write-Info "New CID: $newCid"

Write-Step "Verifying Pin"

$pinCheck = & $IpfsBin pin ls --type=recursive $newCid 2>&1
if ($LASTEXITCODE -eq 0) { Write-OK "Pin verified (recursive)" }
else {
    Write-Warn "Pin verification non-zero, attempting explicit pin..."
    & $IpfsBin pin add $newCid
    Write-OK "Explicitly pinned"
}

if (-not $SkipPublish) {
    Write-Step "Publishing to IPNS"
    Write-Info "This may take 30-60 seconds..."

    $publishOutput = & $IpfsBin name publish --allow-offline "/ipfs/$newCid" 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Warn "IPNS publish returned non-zero: $publishOutput"
        Write-Warn "Content still accessible via CID. IPNS may update eventually."
    } else {
        Write-OK "Published to IPNS"
        Write-Info $publishOutput
    }
} else { Write-Warn "Skipping IPNS publish (--SkipPublish flag set)" }

Write-Step "Updating platforms.json with new CID"

if (Test-Path $PlatformsJson) {
    $json = Get-Content $PlatformsJson -Raw
    if ($json -match '"cid":\s*"([^"]+)"') {
        $oldCid = $Matches[1]
        Write-Info "Old CID: $oldCid"
        Write-Info "New CID: $newCid"
        if ($oldCid -ne $newCid) {
            $json = $json -replace [regex]::Escape($oldCid), $newCid
            Set-Content -Path $PlatformsJson -Value $json -NoNewline
            Write-OK "Updated all CID references in platforms.json"
        } else { Write-Info "CID unchanged, no update needed" }
    } else { Write-Warn "Could not find CID in platforms.json" }
} else { Write-Warn "platforms.json not found at: $PlatformsJson" }

Write-Step "Deployment Complete"
Write-Host ""
Write-Host "  CID:     $newCid" -ForegroundColor White
Write-Host "  IPFS:    https://ipfs.io/ipfs/$newCid" -ForegroundColor Gray
Write-Host "  dweb:    https://$newCid.ipfs.dweb.link" -ForegroundColor Gray
Write-Host "  Local:   http://127.0.0.1:8081/ipfs/$newCid" -ForegroundColor Gray
Write-Host ""
Write-Host "  All systems sovereign. Zero undefined failure states." -ForegroundColor DarkCyan
Write-Host ""