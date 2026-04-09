# deploy-cloudflare.ps1
# Builds the Next.js export and deploys it to Cloudflare Pages.

param(
    [switch]$SkipBuild,
    [string]$Message = "Deployment $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

$ErrorActionPreference = 'Stop'
$ProjectDir = $PSScriptRoot
$OutDir = Join-Path $ProjectDir 'out'

function Write-Step {
    param([string]$Text)
    Write-Host ''
    Write-Host "=== $Text ===" -ForegroundColor Cyan
}

function Write-Ok {
    param([string]$Text)
    Write-Host "[OK] $Text" -ForegroundColor Green
}

function Write-Info {
    param([string]$Text)
    Write-Host "-> $Text" -ForegroundColor Gray
}

function Write-WarnMsg {
    param([string]$Text)
    Write-Host "[!] $Text" -ForegroundColor Yellow
}

$EnvFile = Join-Path $ProjectDir '.env.local'
if (Test-Path $EnvFile) {
    foreach ($Line in Get-Content $EnvFile) {
        if ($Line -match '^CLOUDFLARE_API_TOKEN=(.+)$') {
            $env:CLOUDFLARE_API_TOKEN = $Matches[1].Trim()
        }
    }
}

Write-Step 'Pre-flight checks'
if (-not $env:CLOUDFLARE_API_TOKEN) {
    throw 'CLOUDFLARE_API_TOKEN not set. Add it to .env.local or set it in the environment.'
}
Write-Ok 'Cloudflare API token loaded'

if (-not $SkipBuild) {
    Write-Step 'Building site'
    Push-Location $ProjectDir
    try {
        & npm run build
        if ($LASTEXITCODE -ne 0) {
            throw 'Build failed.'
        }
        Write-Ok 'Build completed'
    }
    finally {
        Pop-Location
    }
}
else {
    Write-WarnMsg 'Skipping build because SkipBuild was set.'
}

if (-not (Test-Path $OutDir)) {
    throw 'The out directory was not found. Run the build first.'
}

$OutBytes = (Get-ChildItem -Path $OutDir -Recurse -File | Measure-Object -Property Length -Sum).Sum
$OutSizeMb = [math]::Round(($OutBytes / 1MB), 2)
Write-Info "Output size: $OutSizeMb MB"

Write-Step 'Deploying to Cloudflare Pages'
Write-Info 'Project: portfolio-unykorn'
Write-Info "Message: $Message"

$DeployArgs = @(
    'wrangler',
    'pages',
    'deploy',
    $OutDir,
    '--project-name=portfolio-unykorn',
    '--branch=production',
    '--commit-dirty=true',
    "--commit-message=$Message"
)

Push-Location $ProjectDir
try {
    $Result = & npx @DeployArgs 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Deployment failed.`n$($Result -join [Environment]::NewLine)"
    }

    Write-Ok 'Deployment completed'
    foreach ($Line in $Result) {
        if ($Line -match 'https://') {
            Write-Host $Line -ForegroundColor White
        }
    }
    Write-Host 'Live: https://portfolio.unykorn.org/' -ForegroundColor Green
}
finally {
    Pop-Location
}
