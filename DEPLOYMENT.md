# 🚀 Deployment Guide for Orv Portfolio

This guide will help you deploy your portfolio website to GitHub Pages with automated deployment scripts.

## 📋 Prerequisites

Before you can deploy your site, make sure you have:

1. **GitHub Account** with the repository `ItsOrv/Orv-Site`
2. **Node.js 18+** installed on your system
3. **Git** configured with your GitHub credentials
4. **GitHub Pages** enabled in your repository settings

## 🔧 Initial Setup

### 1. Enable GitHub Pages

1. Go to your repository: `https://github.com/ItsOrv/Orv-Site`
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 2. Configure GitHub Actions

The repository already includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that will:
- Build your project automatically
- Deploy to GitHub Pages
- Run on every push to `main` branch

### 3. Set up Git Authentication

You have several options for Git authentication:

#### Option A: Personal Access Token (Recommended)
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `repo` permissions
3. Use the token as your password when pushing

#### Option B: SSH Key
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Add the public key to your GitHub account
3. Use SSH URL: `git@github.com:ItsOrv/Orv-Site.git`

#### Option C: GitHub CLI
```bash
# Install GitHub CLI
npm install -g @github/cli

# Authenticate
gh auth login

# Clone with authentication
gh repo clone ItsOrv/Orv-Site
```

## 🚀 Deployment Methods

### Method 1: Automated Scripts (Recommended)

The project includes several deployment scripts for different platforms:

#### For Linux/macOS:
```bash
# Make script executable
chmod +x scripts/update-site.sh

# Deploy with commit message
./scripts/update-site.sh "Update portfolio with new features"

# Or use npm script
npm run update:linux "Update portfolio with new features"
```

#### For Windows:
```cmd
# Using batch script
scripts\update-site.bat "Update portfolio with new features"

# Or using npm script
npm run update:windows "Update portfolio with new features"
```

#### For PowerShell:
```powershell
# Using PowerShell script
.\scripts\update-site.ps1 "Update portfolio with new features"

# Or using npm script
npm run update:powershell "Update portfolio with new features"
```

#### Cross-platform (Node.js):
```bash
# Using Node.js script
npm run update "Update portfolio with new features"
```

### Method 2: Manual Deployment

If you prefer manual control:

```bash
# 1. Build the project
npm run build

# 2. Commit changes
git add .
git commit -m "Update portfolio"

# 3. Push to GitHub
git push origin main

# 4. GitHub Actions will automatically deploy
```

### Method 3: Using GitHub CLI

```bash
# Install GitHub CLI
npm install -g @github/cli

# Authenticate
gh auth login

# Deploy
gh workflow run deploy.yml
```

## 📝 Script Options

All deployment scripts support the following options:

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help message |
| `-t, --test` | Run tests before building |
| `-b, --build` | Only build, don't deploy |
| `-f, --force` | Force deployment without confirmation |
| `-s, --status` | Show deployment status |

### Examples:

```bash
# Run tests before deploying
npm run update -- -t "Add new skills section"

# Only build (don't deploy)
npm run update -- -b

# Force deployment without confirmation
npm run update -- -f "Quick fix"

# Show deployment status
npm run update -- -s
```

## 🔍 Monitoring Deployment

### 1. GitHub Actions
- Go to: `https://github.com/ItsOrv/Orv-Site/actions`
- Check the status of your deployment
- View logs if there are any issues

### 2. Your Live Site
- URL: `https://itsorv.github.io/Orv-Site/`
- It may take 5-10 minutes for changes to be live

### 3. Build Status
The GitHub Actions workflow will:
- ✅ Install dependencies
- ✅ Build the project
- ✅ Deploy to GitHub Pages
- ✅ Update your live site

## 🛠️ Troubleshooting

### Common Issues:

#### 1. Authentication Error (403)
```
remote: Permission to ItsOrv/Orv-Site.git denied
```
**Solution:**
- Use Personal Access Token instead of password
- Or set up SSH key authentication
- Or use GitHub CLI

#### 2. Build Failures
```
Build failed in 18.11s
```
**Solution:**
- Check for TypeScript errors: `npm run build`
- Fix any linting issues: `npm run lint`
- Ensure all dependencies are installed: `npm install`

#### 3. GitHub Actions Not Triggering
**Solution:**
- Ensure GitHub Pages is enabled in repository settings
- Check that the workflow file is in `.github/workflows/`
- Verify you're pushing to the `main` branch

#### 4. Site Not Updating
**Solution:**
- Wait 5-10 minutes for GitHub Pages to update
- Check GitHub Actions logs for errors
- Clear browser cache
- Check the correct URL: `https://itsorv.github.io/Orv-Site/`

## 📊 Performance Monitoring

The deployed site includes:
- **Analytics**: Track user behavior and performance
- **Core Web Vitals**: Monitor loading performance
- **Error Tracking**: Automatic error reporting
- **Performance Metrics**: Real-time performance data

## 🔄 Continuous Deployment

Once set up, your deployment process is fully automated:

1. **Make changes** to your code
2. **Run deployment script** with a commit message
3. **GitHub Actions** automatically builds and deploys
4. **Your site updates** within minutes

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment Best Practices](https://create-react-app.dev/docs/deployment/)

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs** in GitHub Actions
2. **Review this guide** for common solutions
3. **Test locally** with `npm run build` and `npm run preview`
4. **Check the repository** for similar issues
5. **Contact support** if needed

## 🎉 Success!

Once everything is set up, you can update your portfolio with a simple command:

```bash
npm run update "Add new project showcase"
```

Your site will be automatically updated at: `https://itsorv.github.io/Orv-Site/`

---

**Happy Deploying! 🚀**
