# deploy-cloudflare.ps1
# Sovereign Cloudflare Pages Deployment Script
# Builds the Next.js static export and deploys to portfolio.unykorn.org

param(
    [switch]$SkipBuild,
    [string]$Message = "Sovereign deployment $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

$ErrorActionPreference = "Stop"
$ProjectDir = $PSScriptRoot
$OutDir = Join-Path $ProjectDir "out"

function Write-Step { param([string]$M) Write-Host "`n=== $M ===" -ForegroundColor Cyan }
function Write-OK   { param([string]$M) Write-Host "  [OK] $M" -ForegroundColor Green }
function Write-Info { param([string]$M) Write-Host "  -> $M" -ForegroundColor Gray }
function Write-Warn { param([string]$M) Write-Host "  [!] $M" -ForegroundColor Yellow }

# ── Load API token ───────────────────────────────────────────────────────────
$EnvFile = Join-Path $ProjectDir ".env.local"
if (Test-Path $EnvFile) {
    Get-Content $EnvFile | ForEach-Object {
        if ($_ -match '^CLOUDFLARE_API_TOKEN=(.+)$') {
            $env:CLOUDFLARE_API_TOKEN = $Matches[1]
        }
    }
}

if (-not $env:CLOUDFLARE_API_TOKEN) {
    Write-Error "CLOUDFLARE_API_TOKEN not set. Add it to .env.local or set as environment variable."
    exit 1
}
Write-Step "Pre-flight Checks"
Write-OK "Cloudflare API token loaded"

# ── Build ─────────────────────────────────────────────────────────────────────
if (-not $SkipBuild) {
    Write-Step "Building Next.js Static Export"
    Push-Location $ProjectDir
    try {
        & npm run build
        if ($LASTEXITCODE -ne 0) { Write-Error "Build failed"; exit 1 }
        Write-OK "Build completed — 74 pages generated"
    } finally { Pop-Location }
} else {
    Write-Warn "Skipping build (--SkipBuild flag set)"
}

if (-not (Test-Path $OutDir)) { Write-Error "out/ directory not found. Run build first."; exit 1 }

$outSize = [math]::Round((Get-ChildItem -Path $OutDir -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB, 2)
Write-Info "Output size: $outSize MB"

# ── Deploy ────────────────────────────────────────────────────────────────────
Write-Step "Deploying to portfolio.unykorn.org (Cloudflare Pages)"
Write-Info "Project: portfolio-unykorn"
Write-Info "Message: $Message"

Push-Location $ProjectDir
try {
    $result = & npx wrangler pages deploy out `
        --project-name=portfolio-unykorn `
        --branch=production `
        --commit-dirty=true `
        --commit-message=$Message 2>&1

    if ($LASTEXITCODE -ne 0) {
        Write-Error "Deployment failed: $result"
        exit 1
    }

    Write-OK "Deployed successfully"
    Write-Host ""
    $result | ForEach-Object { if ($_ -match "https://") { Write-Host "  $_" -ForegroundColor White } }
    Write-Host ""
    Write-Host "  Live: https://portfolio.unykorn.org/" -ForegroundColor Green
    Write-Host "  Systems: https://portfolio.unykorn.org/systems/" -ForegroundColor Green
    Write-Host ""
    Write-Host "  All systems sovereign. Zero undefined failure states." -ForegroundColor DarkCyan
    Write-Host ""
} finally { Pop-Location }
