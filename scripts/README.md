# Deployment Scripts

This directory contains automated deployment scripts for the Orv Portfolio website. These scripts help you easily update your GitHub Pages site whenever you make changes to your portfolio.

## Available Scripts

### 1. Node.js Script (Cross-platform)
```bash
npm run update "Your commit message"
```

### 2. Linux/macOS Script
```bash
./scripts/update-site.sh "Your commit message"
# or
npm run update:linux "Your commit message"
```

### 3. Windows Batch Script
```cmd
scripts\update-site.bat "Your commit message"
# or
npm run update:windows "Your commit message"
```

### 4. PowerShell Script
```powershell
.\scripts\update-site.ps1 "Your commit message"
# or
npm run update:powershell "Your commit message"
```

## Usage Examples

### Basic Usage
```bash
# Simple update
npm run update "Update portfolio with new projects"

# Update with tests
npm run update -- -t "Add new skills section"

# Only build (don't deploy)
npm run update -- -b

# Force deployment without confirmation
npm run update -- -f "Quick update"

# Show deployment status
npm run update -- -s
```

### Advanced Usage
```bash
# Run tests before building and deploying
npm run update -- -t "Add new contact form"

# Build only (useful for testing)
npm run update -- -b

# Force deployment (skip confirmations)
npm run update -- -f "Emergency fix"
```

## Script Options

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help message |
| `-t, --test` | Run tests before building |
| `-b, --build` | Only build, don't deploy |
| `-f, --force` | Force deployment without confirmation |
| `-s, --status` | Show deployment status |

## How It Works

1. **Validation**: Checks if you're in a git repository
2. **Changes Check**: Verifies for uncommitted changes
3. **Testing** (optional): Runs tests if `-t` flag is used
4. **Building**: Compiles the project for production
5. **Confirmation**: Asks for confirmation before deploying
6. **Commit & Push**: Commits changes and pushes to GitHub
7. **Deployment**: GitHub Actions automatically deploys to Pages

## Prerequisites

- Node.js 18+ installed
- Git repository initialized
- GitHub repository with Actions enabled
- Proper GitHub Pages configuration

## GitHub Actions Workflow

The deployment is handled by GitHub Actions (`.github/workflows/deploy.yml`):

- **Trigger**: Push to `main` or `master` branch
- **Build**: Installs dependencies and builds the project
- **Deploy**: Automatically deploys to GitHub Pages
- **Status**: Available at `https://github.com/ItsOrv/Orv-Site/actions`

## Troubleshooting

### Common Issues

1. **"Not in a git repository"**
   - Make sure you're in the project root directory
   - Initialize git if needed: `git init`

2. **"Tests failed"**
   - Fix failing tests before deploying
   - Use `-f` flag to skip tests (not recommended)

3. **"Build failed"**
   - Check for TypeScript errors
   - Ensure all dependencies are installed: `npm install`

4. **"Failed to push to GitHub"**
   - Check your GitHub authentication
   - Ensure you have push permissions to the repository

### Getting Help

- Check the GitHub Actions logs: `https://github.com/ItsOrv/Orv-Site/actions`
- Review the build output for specific error messages
- Ensure all environment variables are properly set

## Security Notes

- Never commit sensitive information (API keys, passwords)
- Use environment variables for configuration
- Review changes before deploying with `-f` flag

## Best Practices

1. **Always test locally** before deploying
2. **Use descriptive commit messages**
3. **Review changes** in GitHub before merging
4. **Monitor deployment status** in GitHub Actions
5. **Keep dependencies updated**

## File Structure

```
scripts/
├── README.md              # This file
├── update-site.js         # Node.js script (cross-platform)
├── update-site.sh         # Linux/macOS shell script
├── update-site.bat        # Windows batch script
└── update-site.ps1        # PowerShell script
```

## Contributing

To improve these scripts:

1. Test on your platform
2. Follow the existing code style
3. Add appropriate error handling
4. Update documentation
5. Submit a pull request

## License

These scripts are part of the Orv Portfolio project and follow the same license terms.
