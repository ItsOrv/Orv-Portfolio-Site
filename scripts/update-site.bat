@echo off
REM Orv Portfolio Site Update Script for Windows
REM This script automatically updates the GitHub Pages site when changes are made

setlocal enabledelayedexpansion

REM Colors (limited support in Windows CMD)
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

REM Function to print colored output
:print_status
echo %BLUE%[INFO]%NC% %~1
goto :eof

:print_success
echo %GREEN%[SUCCESS]%NC% %~1
goto :eof

:print_warning
echo %YELLOW%[WARNING]%NC% %~1
goto :eof

:print_error
echo %RED%[ERROR]%NC% %~1
goto :eof

REM Check if we're in a git repository
:check_git_repo
git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
    call :print_error "Not in a git repository!"
    exit /b 1
)
goto :eof

REM Check for uncommitted changes
:check_uncommitted_changes
git diff-index --quiet HEAD --
if errorlevel 1 (
    call :print_warning "You have uncommitted changes. Please commit them first."
    echo Uncommitted files:
    git diff --name-only
    set /p "continue=Do you want to continue anyway? (y/N): "
    if /i not "!continue!"=="y" (
        exit /b 1
    )
)
goto :eof

REM Run tests
:run_tests
call :print_status "Running tests..."
npm run test:run
if errorlevel 1 (
    call :print_error "Tests failed! Please fix the issues before deploying."
    exit /b 1
)
call :print_success "All tests passed!"
goto :eof

REM Build the project
:build_project
call :print_status "Building the project..."
npm run build
if errorlevel 1 (
    call :print_error "Build failed! Please fix the issues before deploying."
    exit /b 1
)
call :print_success "Build completed successfully!"
goto :eof

REM Commit and push changes
:commit_and_push
set "commit_message=%~1"
call :print_status "Committing changes..."
git add .

git diff --staged --quiet
if not errorlevel 1 (
    call :print_warning "No changes to commit."
    goto :eof
)

git commit -m "%commit_message%"

call :print_status "Pushing to GitHub..."
git push origin main
if errorlevel 1 (
    call :print_error "Failed to push to GitHub!"
    exit /b 1
)
call :print_success "Changes pushed to GitHub successfully!"
goto :eof

REM Show deployment status
:show_deployment_status
call :print_status "Checking deployment status..."
echo You can check the deployment status at:
echo https://github.com/ItsOrv/Orv-Site/actions
echo.
echo Your site will be available at:
echo https://itsorv.github.io/Orv-Site/
goto :eof

REM Show help
:show_help
echo Orv Portfolio Site Update Script
echo.
echo Usage: %~nx0 [OPTIONS] [COMMIT_MESSAGE]
echo.
echo Options:
echo   -h, --help     Show this help message
echo   -t, --test     Run tests before building
echo   -b, --build    Only build, don't deploy
echo   -f, --force    Force deployment without confirmation
echo   -s, --status   Show deployment status
echo.
echo Examples:
echo   %~nx0 "Update portfolio with new projects"
echo   %~nx0 -t "Add new skills section"
echo   %~nx0 -b  # Only build, don't deploy
echo   %~nx0 -s  # Show deployment status
goto :eof

REM Main function
:main
set "run_tests_flag=false"
set "build_only=false"
set "force_deploy=false"
set "show_status=false"
set "commit_message="

REM Parse command line arguments
:parse_args
if "%~1"=="" goto :args_done
if "%~1"=="-h" goto :help
if "%~1"=="--help" goto :help
if "%~1"=="-t" (
    set "run_tests_flag=true"
    shift
    goto :parse_args
)
if "%~1"=="--test" (
    set "run_tests_flag=true"
    shift
    goto :parse_args
)
if "%~1"=="-b" (
    set "build_only=true"
    shift
    goto :parse_args
)
if "%~1"=="--build" (
    set "build_only=true"
    shift
    goto :parse_args
)
if "%~1"=="-f" (
    set "force_deploy=true"
    shift
    goto :parse_args
)
if "%~1"=="--force" (
    set "force_deploy=true"
    shift
    goto :parse_args
)
if "%~1"=="-s" (
    set "show_status=true"
    shift
    goto :parse_args
)
if "%~1"=="--status" (
    set "show_status=true"
    shift
    goto :parse_args
)
if "%~1"=="--" (
    shift
    goto :parse_args
)
if "!commit_message!"=="" (
    set "commit_message=%~1"
) else (
    set "commit_message=!commit_message! %~1"
)
shift
goto :parse_args

:args_done

REM Show help
if "%~1"=="-h" goto :help
if "%~1"=="--help" goto :help

REM Show status and exit
if "%show_status%"=="true" (
    call :show_deployment_status
    exit /b 0
)

REM Check if we're in a git repository
call :check_git_repo
if errorlevel 1 exit /b 1

REM Check for uncommitted changes (unless force flag is used)
if "%force_deploy%"=="false" (
    call :check_uncommitted_changes
    if errorlevel 1 exit /b 1
)

REM Run tests if requested
if "%run_tests_flag%"=="true" (
    call :run_tests
    if errorlevel 1 exit /b 1
)

REM Build the project
call :build_project
if errorlevel 1 exit /b 1

REM If build-only flag is set, exit here
if "%build_only%"=="true" (
    call :print_success "Build completed. Use without -b flag to deploy."
    exit /b 0
)

REM Get commit message if not provided
if "%commit_message%"=="" (
    set /p "commit_message=Enter commit message: "
    if "!commit_message!"=="" (
        for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set "date=%%c-%%a-%%b"
        for /f "tokens=1-2 delims=: " %%a in ('time /t') do set "time=%%a:%%b"
        set "commit_message=Update portfolio site - !date! !time!"
    )
)

REM Confirm deployment
if "%force_deploy%"=="false" (
    echo.
    call :print_warning "This will deploy your changes to https://itsorv.github.io/Orv-Site/"
    set /p "confirm=Are you sure you want to continue? (y/N): "
    if /i not "!confirm!"=="y" (
        call :print_status "Deployment cancelled."
        exit /b 0
    )
)

REM Commit and push changes
call :commit_and_push "%commit_message%"
if errorlevel 1 exit /b 1

REM Show deployment status
call :show_deployment_status

call :print_success "Deployment process completed!"
call :print_status "GitHub Actions will automatically deploy your site."
call :print_status "It may take a few minutes for the changes to be live."

exit /b 0

:help
call :show_help
exit /b 0
