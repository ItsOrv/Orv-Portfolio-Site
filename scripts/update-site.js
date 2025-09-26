#!/usr/bin/env node

/**
 * Orv Portfolio Site Update Script
 * This script automatically updates the GitHub Pages site when changes are made
 */

import { execSync, spawn } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Utility functions for colored output
const log = {
  info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}[SUCCESS]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`),
  status: (msg) => console.log(`${colors.cyan}[STATUS]${colors.reset} ${msg}`)
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    help: false,
    test: false,
    buildOnly: false,
    force: false,
    status: false,
    commitMessage: ''
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '-h':
      case '--help':
        options.help = true;
        break;
      case '-t':
      case '--test':
        options.test = true;
        break;
      case '-b':
      case '--build':
        options.buildOnly = true;
        break;
      case '-f':
      case '--force':
        options.force = true;
        break;
      case '-s':
      case '--status':
        options.status = true;
        break;
      default:
        if (!arg.startsWith('-') && !options.commitMessage) {
          options.commitMessage = arg;
        }
        break;
    }
  }

  return options;
}

// Show help information
function showHelp() {
  console.log(`${colors.bold}Orv Portfolio Site Update Script${colors.reset}`);
  console.log('');
  console.log('Usage: npm run update [OPTIONS] [COMMIT_MESSAGE]');
  console.log('');
  console.log('Options:');
  console.log('  -h, --help     Show this help message');
  console.log('  -t, --test     Run tests before building');
  console.log('  -b, --build    Only build, don\'t deploy');
  console.log('  -f, --force    Force deployment without confirmation');
  console.log('  -s, --status   Show deployment status');
  console.log('');
  console.log('Examples:');
  console.log('  npm run update "Update portfolio with new projects"');
  console.log('  npm run update -- -t "Add new skills section"');
  console.log('  npm run update -- -b  # Only build, don\'t deploy');
  console.log('  npm run update -- -s  # Show deployment status');
}

// Check if we're in a git repository
function checkGitRepo() {
  try {
    execSync('git rev-parse --git-dir', { stdio: 'pipe' });
    return true;
  } catch (error) {
    log.error('Not in a git repository!');
    return false;
  }
}

// Check for uncommitted changes
function checkUncommittedChanges() {
  try {
    const changes = execSync('git diff --name-only', { encoding: 'utf8' });
    if (changes.trim()) {
      log.warning('You have uncommitted changes. Please commit them first.');
      console.log('Uncommitted files:');
      console.log(changes);
      return false;
    }
    return true;
  } catch (error) {
    log.error('Failed to check git status');
    return false;
  }
}

// Run tests
function runTests() {
  log.info('Running tests...');
  try {
    execSync('npm run test:run', { stdio: 'inherit' });
    log.success('All tests passed!');
    return true;
  } catch (error) {
    log.error('Tests failed! Please fix the issues before deploying.');
    return false;
  }
}

// Build the project
function buildProject() {
  log.info('Building the project...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    log.success('Build completed successfully!');
    return true;
  } catch (error) {
    log.error('Build failed! Please fix the issues before deploying.');
    return false;
  }
}

// Commit and push changes
function commitAndPush(commitMessage) {
  log.info('Committing changes...');
  try {
    execSync('git add .', { stdio: 'pipe' });
    
    // Check if there are staged changes
    const stagedChanges = execSync('git diff --staged --name-only', { encoding: 'utf8' });
    if (!stagedChanges.trim()) {
      log.warning('No changes to commit.');
      return true;
    }
    
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'pipe' });
    
    log.info('Pushing to GitHub...');
    execSync('git push origin main', { stdio: 'inherit' });
    log.success('Changes pushed to GitHub successfully!');
    return true;
  } catch (error) {
    log.error('Failed to commit and push changes');
    return false;
  }
}

// Show deployment status
function showDeploymentStatus() {
  log.status('Checking deployment status...');
  console.log('You can check the deployment status at:');
  console.log(`${colors.cyan}https://github.com/ItsOrv/Orv-Site/actions${colors.reset}`);
  console.log('');
  console.log('Your site will be available at:');
  console.log(`${colors.cyan}https://itsorv.github.io/Orv-Site/${colors.reset}`);
}

// Get user input
function getUserInput(question) {
  return new Promise((resolve) => {
    process.stdout.write(question);
    process.stdin.once('data', (data) => {
      resolve(data.toString().trim());
    });
  });
}

// Main function
async function main() {
  const options = parseArgs();
  
  // Show help
  if (options.help) {
    showHelp();
    process.exit(0);
  }
  
  // Show status and exit
  if (options.status) {
    showDeploymentStatus();
    process.exit(0);
  }
  
  // Check if we're in a git repository
  if (!checkGitRepo()) {
    process.exit(1);
  }
  
  // Check for uncommitted changes (unless force flag is used)
  if (!options.force) {
    if (!checkUncommittedChanges()) {
      const continueAnyway = await getUserInput('Do you want to continue anyway? (y/N): ');
      if (continueAnyway.toLowerCase() !== 'y') {
        process.exit(1);
      }
    }
  }
  
  // Run tests if requested
  if (options.test) {
    if (!runTests()) {
      process.exit(1);
    }
  }
  
  // Build the project
  if (!buildProject()) {
    process.exit(1);
  }
  
  // If build-only flag is set, exit here
  if (options.buildOnly) {
    log.success('Build completed. Use without -b flag to deploy.');
    process.exit(0);
  }
  
  // Get commit message if not provided
  if (!options.commitMessage) {
    options.commitMessage = await getUserInput('Enter commit message: ');
    if (!options.commitMessage) {
      options.commitMessage = `Update portfolio site - ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`;
    }
  }
  
  // Confirm deployment
  if (!options.force) {
    console.log('');
    log.warning('This will deploy your changes to https://itsorv.github.io/Orv-Site/');
    const confirm = await getUserInput('Are you sure you want to continue? (y/N): ');
    if (confirm.toLowerCase() !== 'y') {
      log.info('Deployment cancelled.');
      process.exit(0);
    }
  }
  
  // Commit and push changes
  if (!commitAndPush(options.commitMessage)) {
    process.exit(1);
  }
  
  // Show deployment status
  showDeploymentStatus();
  
  log.success('Deployment process completed!');
  log.info('GitHub Actions will automatically deploy your site.');
  log.info('It may take a few minutes for the changes to be live.');
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n');
  log.warning('Process interrupted by user');
  process.exit(0);
});

// Run main function
main().catch((error) => {
  log.error(`Unexpected error: ${error.message}`);
  process.exit(1);
});
