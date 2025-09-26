# Orv Portfolio Site Update Script for PowerShell
# This script automatically updates the GitHub Pages site when changes are made

param(
    [string]$CommitMessage = "",
    [switch]$Test,
    [switch]$BuildOnly,
    [switch]$Force,
    [switch]$Status,
    [switch]$Help
)

# Colors for output
$Colors = @{
    Red = "Red"
    Green = "Green"
    Yellow = "Yellow"
    Blue = "Cyan"
    White = "White"
}

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Colors.Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Colors.Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Colors.Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Colors.Red
}

# Function to show help
function Show-Help {
    Write-Host "Orv Portfolio Site Update Script" -ForegroundColor $Colors.White
    Write-Host ""
    Write-Host "Usage: .\update-site.ps1 [OPTIONS] [COMMIT_MESSAGE]" -ForegroundColor $Colors.White
    Write-Host ""
    Write-Host "Options:" -ForegroundColor $Colors.White
    Write-Host "  -Help          Show this help message" -ForegroundColor $Colors.White
    Write-Host "  -Test          Run tests before building" -ForegroundColor $Colors.White
    Write-Host "  -BuildOnly     Only build, don't deploy" -ForegroundColor $Colors.White
    Write-Host "  -Force         Force deployment without confirmation" -ForegroundColor $Colors.White
    Write-Host "  -Status        Show deployment status" -ForegroundColor $Colors.White
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor $Colors.White
    Write-Host '  .\update-site.ps1 "Update portfolio with new projects"' -ForegroundColor $Colors.White
    Write-Host '  .\update-site.ps1 -Test "Add new skills section"' -ForegroundColor $Colors.White
    Write-Host "  .\update-site.ps1 -BuildOnly  # Only build, don't deploy" -ForegroundColor $Colors.White
    Write-Host "  .\update-site.ps1 -Status  # Show deployment status" -ForegroundColor $Colors.White
}

# Function to check if we're in a git repository
function Test-GitRepository {
    try {
        git rev-parse --git-dir | Out-Null
        return $true
    }
    catch {
        Write-Error "Not in a git repository!"
        return $false
    }
}

# Function to check for uncommitted changes
function Test-UncommittedChanges {
    try {
        $changes = git diff --name-only
        if ($changes) {
            Write-Warning "You have uncommitted changes. Please commit them first."
            Write-Host "Uncommitted files:" -ForegroundColor $Colors.Yellow
            Write-Host $changes -ForegroundColor $Colors.Yellow
            
            if (-not $Force) {
                $continue = Read-Host "Do you want to continue anyway? (y/N)"
                if ($continue -notmatch "^[Yy]$") {
                    return $false
                }
            }
        }
        return $true
    }
    catch {
        Write-Error "Failed to check git status"
        return $false
    }
}

# Function to run tests
function Invoke-Tests {
    Write-Status "Running tests..."
    try {
        npm run test:run
        if ($LASTEXITCODE -eq 0) {
            Write-Success "All tests passed!"
            return $true
        } else {
            Write-Error "Tests failed! Please fix the issues before deploying."
            return $false
        }
    }
    catch {
        Write-Error "Failed to run tests"
        return $false
    }
}

# Function to build the project
function Invoke-Build {
    Write-Status "Building the project..."
    try {
        npm run build
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Build completed successfully!"
            return $true
        } else {
            Write-Error "Build failed! Please fix the issues before deploying."
            return $false
        }
    }
    catch {
        Write-Error "Failed to build project"
        return $false
    }
}

# Function to commit and push changes
function Invoke-CommitAndPush {
    param([string]$Message)
    
    Write-Status "Committing changes..."
    try {
        git add .
        
        $stagedChanges = git diff --staged --name-only
        if (-not $stagedChanges) {
            Write-Warning "No changes to commit."
            return $true
        }
        
        git commit -m $Message
        
        Write-Status "Pushing to GitHub..."
        git push origin main
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Changes pushed to GitHub successfully!"
            return $true
        } else {
            Write-Error "Failed to push to GitHub!"
            return $false
        }
    }
    catch {
        Write-Error "Failed to commit and push changes"
        return $false
    }
}

# Function to show deployment status
function Show-DeploymentStatus {
    Write-Status "Checking deployment status..."
    Write-Host "You can check the deployment status at:" -ForegroundColor $Colors.White
    Write-Host "https://github.com/ItsOrv/Orv-Site/actions" -ForegroundColor $Colors.Blue
    Write-Host ""
    Write-Host "Your site will be available at:" -ForegroundColor $Colors.White
    Write-Host "https://itsorv.github.io/Orv-Site/" -ForegroundColor $Colors.Blue
}

# Main execution
if ($Help) {
    Show-Help
    exit 0
}

# Show status and exit
if ($Status) {
    Show-DeploymentStatus
    exit 0
}

# Check if we're in a git repository
if (-not (Test-GitRepository)) {
    exit 1
}

# Check for uncommitted changes (unless force flag is used)
if (-not $Force) {
    if (-not (Test-UncommittedChanges)) {
        exit 1
    }
}

# Run tests if requested
if ($Test) {
    if (-not (Invoke-Tests)) {
        exit 1
    }
}

# Build the project
if (-not (Invoke-Build)) {
    exit 1
}

# If build-only flag is set, exit here
if ($BuildOnly) {
    Write-Success "Build completed. Use without -BuildOnly flag to deploy."
    exit 0
}

# Get commit message if not provided
if (-not $CommitMessage) {
    $CommitMessage = Read-Host "Enter commit message"
    if (-not $CommitMessage) {
        $CommitMessage = "Update portfolio site - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    }
}

# Confirm deployment
if (-not $Force) {
    Write-Host ""
    Write-Warning "This will deploy your changes to https://itsorv.github.io/Orv-Site/"
    $confirm = Read-Host "Are you sure you want to continue? (y/N)"
    if ($confirm -notmatch "^[Yy]$") {
        Write-Status "Deployment cancelled."
        exit 0
    }
}

# Commit and push changes
if (-not (Invoke-CommitAndPush -Message $CommitMessage)) {
    exit 1
}

# Show deployment status
Show-DeploymentStatus

Write-Success "Deployment process completed!"
Write-Status "GitHub Actions will automatically deploy your site."
Write-Status "It may take a few minutes for the changes to be live."
