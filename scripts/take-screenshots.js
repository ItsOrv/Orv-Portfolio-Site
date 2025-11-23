import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const screenshotsDir = join(__dirname, '..', 'docs', 'screenshots');

// Create screenshots directory if it doesn't exist
if (!existsSync(screenshotsDir)) {
  mkdirSync(screenshotsDir, { recursive: true });
}

const baseURL = 'http://localhost:5173';

async function takeScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  try {
    console.log('Taking screenshots...');

    // Home/Hero section
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for animations
    await page.screenshot({ 
      path: join(screenshotsDir, 'hero.png'),
      fullPage: false,
    });
    console.log('✓ Hero section screenshot taken');

    // About section
    await page.goto(`${baseURL}#about`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ 
      path: join(screenshotsDir, 'about.png'),
      fullPage: false,
    });
    console.log('✓ About section screenshot taken');

    // Skills section
    await page.goto(`${baseURL}#skills`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ 
      path: join(screenshotsDir, 'skills.png'),
      fullPage: false,
    });
    console.log('✓ Skills section screenshot taken');

    // Projects section
    await page.goto(`${baseURL}#projects`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ 
      path: join(screenshotsDir, 'projects.png'),
      fullPage: false,
    });
    console.log('✓ Projects section screenshot taken');

    // Contact section
    await page.goto(`${baseURL}#contact`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ 
      path: join(screenshotsDir, 'contact.png'),
      fullPage: false,
    });
    console.log('✓ Contact section screenshot taken');

    // Full page screenshot
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ 
      path: join(screenshotsDir, 'full-page.png'),
      fullPage: true,
    });
    console.log('✓ Full page screenshot taken');

    // Mobile view
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 },
      deviceScaleFactor: 2,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(baseURL, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(2000);
    await mobilePage.screenshot({ 
      path: join(screenshotsDir, 'mobile.png'),
      fullPage: false,
    });
    console.log('✓ Mobile view screenshot taken');
    await mobileContext.close();

    console.log('\n✅ All screenshots taken successfully!');
    console.log(`📁 Screenshots saved to: ${screenshotsDir}`);

  } catch (error) {
    console.error('Error taking screenshots:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

takeScreenshots();

