#!/bin/bash

# Orv Portfolio Site Update Script
# This script automatically updates the GitHub Pages site when changes are made

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a git repository!"
        exit 1
    fi
}

# Function to check if there are uncommitted changes
check_uncommitted_changes() {
    if ! git diff-index --quiet HEAD --; then
        print_warning "You have uncommitted changes. Please commit them first."
        echo "Uncommitted files:"
        git diff --name-only
        read -p "Do you want to continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Function to run tests
run_tests() {
    print_status "Running tests..."
    if npm run test:run; then
        print_success "All tests passed!"
    else
        print_error "Tests failed! Please fix the issues before deploying."
        exit 1
    fi
}

# Function to build the project
build_project() {
    print_status "Building the project..."
    if npm run build; then
        print_success "Build completed successfully!"
    else
        print_error "Build failed! Please fix the issues before deploying."
        exit 1
    fi
}

# Function to commit and push changes
commit_and_push() {
    local commit_message="$1"
    
    print_status "Committing changes..."
    git add .
    
    if git diff --staged --quiet; then
        print_warning "No changes to commit."
        return 0
    fi
    
    git commit -m "$commit_message"
    
    print_status "Pushing to GitHub..."
    if git push origin main; then
        print_success "Changes pushed to GitHub successfully!"
    else
        print_error "Failed to push to GitHub!"
        exit 1
    fi
}

# Function to show deployment status
show_deployment_status() {
    print_status "Checking deployment status..."
    echo "You can check the deployment status at:"
    echo "https://github.com/ItsOrv/Orv-Site/actions"
    echo ""
    echo "Your site will be available at:"
    echo "https://itsorv.github.io/Orv-Site/"
}

# Function to show help
show_help() {
    echo "Orv Portfolio Site Update Script"
    echo ""
    echo "Usage: $0 [OPTIONS] [COMMIT_MESSAGE]"
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  -t, --test     Run tests before building"
    echo "  -b, --build    Only build, don't deploy"
    echo "  -f, --force    Force deployment without confirmation"
    echo "  -s, --status   Show deployment status"
    echo ""
    echo "Examples:"
    echo "  $0 \"Update portfolio with new projects\""
    echo "  $0 -t \"Add new skills section\""
    echo "  $0 -b  # Only build, don't deploy"
    echo "  $0 -s  # Show deployment status"
}

# Main function
main() {
    local run_tests_flag=false
    local build_only=false
    local force_deploy=false
    local show_status=false
    local commit_message=""
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -t|--test)
                run_tests_flag=true
                shift
                ;;
            -b|--build)
                build_only=true
                shift
                ;;
            -f|--force)
                force_deploy=true
                shift
                ;;
            -s|--status)
                show_status=true
                shift
                ;;
            -*)
                print_error "Unknown option: $1"
                show_help
                exit 1
                ;;
            *)
                commit_message="$1"
                shift
                ;;
        esac
    done
    
    # Show status and exit
    if [ "$show_status" = true ]; then
        show_deployment_status
        exit 0
    fi
    
    # Check if we're in a git repository
    check_git_repo
    
    # Check for uncommitted changes (unless force flag is used)
    if [ "$force_deploy" = false ]; then
        check_uncommitted_changes
    fi
    
    # Run tests if requested
    if [ "$run_tests_flag" = true ]; then
        run_tests
    fi
    
    # Build the project
    build_project
    
    # If build-only flag is set, exit here
    if [ "$build_only" = true ]; then
        print_success "Build completed. Use without -b flag to deploy."
        exit 0
    fi
    
    # Get commit message if not provided
    if [ -z "$commit_message" ]; then
        read -p "Enter commit message: " commit_message
        if [ -z "$commit_message" ]; then
            commit_message="Update portfolio site - $(date '+%Y-%m-%d %H:%M:%S')"
        fi
    fi
    
    # Confirm deployment
    if [ "$force_deploy" = false ]; then
        echo ""
        print_warning "This will deploy your changes to https://itsorv.github.io/Orv-Site/"
        read -p "Are you sure you want to continue? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_status "Deployment cancelled."
            exit 0
        fi
    fi
    
    # Commit and push changes
    commit_and_push "$commit_message"
    
    # Show deployment status
    show_deployment_status
    
    print_success "Deployment process completed!"
    print_status "GitHub Actions will automatically deploy your site."
    print_status "It may take a few minutes for the changes to be live."
}

# Run main function with all arguments
main "$@"
