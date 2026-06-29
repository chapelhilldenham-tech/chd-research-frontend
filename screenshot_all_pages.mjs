import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

const LOCALHOST = 'http://localhost:5173';
const OUTPUT_DIR = resolve('screenshots', 'review');
const DESKTOP_SIZE = { width: 1440, height: 900 };
const MOBILE_SIZE = { width: 390, height: 844 };

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const pages = [
  { url: '/', name: 'home' },
  { url: '/reports', name: 'reports' },
  { url: '/analysts', name: 'analysts' },
  { url: '/price-lists', name: 'price-lists' },
  { url: '/login', name: 'login' },
  { url: '/signup', name: 'signup' },
  { url: '/contact', name: 'contact' },
  { url: '/subscribe', name: 'subscribe' },
];

const authPages = [
  { url: '/analytics', name: 'analytics', auth: true },
  { url: '/admin/analytics', name: 'admin-analytics', auth: true },
  { url: '/admin', name: 'admin-dashboard', auth: true },
];

async function screenshotPage(page, url, name, viewportSize, suffix) {
  try {
    await page.setViewportSize(viewportSize);
    await page.goto(`${LOCALHOST}${url}`, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for data to load
    await page.waitForTimeout(2000);

    const filename = `${name}-${suffix}.png`;
    const filepath = resolve(OUTPUT_DIR, filename);
    await page.screenshot({ path: filepath });
    console.log(`✓ Saved: ${filename}`);
    return filename;
  } catch (error) {
    console.error(`✗ Failed to screenshot ${name}-${suffix}: ${error.message}`);
    return null;
  }
}

async function getFirstReportId(page) {
  try {
    await page.setViewportSize(DESKTOP_SIZE);
    await page.goto(`${LOCALHOST}/reports`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Try to find a report link or data attribute
    const reportId = await page.evaluate(() => {
      const link = document.querySelector('a[href*="/report/"]');
      if (link) {
        const match = link.href.match(/\/report\/([^/]+)/);
        if (match) return match[1];
      }
      // Fallback: check if there's a data attribute or text content with ID
      return null;
    });

    return reportId || 'demo-report-1';
  } catch (error) {
    console.error('Failed to get first report ID:', error.message);
    return 'demo-report-1';
  }
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const screenshots = [];

  console.log('\n📸 Starting screenshot capture...\n');

  try {
    // Screenshot regular pages in both desktop and mobile
    for (const { url, name } of pages) {
      console.log(`\nCapturing ${name}...`);

      // Desktop
      const desktopFile = await screenshotPage(page, url, name, DESKTOP_SIZE, 'desktop');
      if (desktopFile) screenshots.push(desktopFile);

      // Mobile
      const mobileFile = await screenshotPage(page, url, name, MOBILE_SIZE, 'mobile');
      if (mobileFile) screenshots.push(mobileFile);
    }

    // Handle report detail page (need to get first report ID)
    console.log('\nCapturing report-detail (fetching first report ID)...');
    const reportId = await getFirstReportId(page);
    const desktopReportFile = await screenshotPage(
      page,
      `/report/${reportId}`,
      'report-detail',
      DESKTOP_SIZE,
      'desktop'
    );
    if (desktopReportFile) screenshots.push(desktopReportFile);

    const mobileReportFile = await screenshotPage(
      page,
      `/report/${reportId}`,
      'report-detail',
      MOBILE_SIZE,
      'mobile'
    );
    if (mobileReportFile) screenshots.push(mobileReportFile);

    // Screenshot auth-required pages (desktop only)
    for (const { url, name, auth } of authPages) {
      console.log(`\nCapturing ${name} (auth)...`);

      const filename = `${name}-desktop.png`;
      try {
        await page.setViewportSize(DESKTOP_SIZE);

        // Navigate first, then set localStorage
        await page.goto(`${LOCALHOST}${url}`, { waitUntil: 'networkidle', timeout: 30000 });

        // Set auth flag after navigation
        await page.evaluate(() => {
          try {
            localStorage.setItem('chd_subscriber_auth', 'true');
          } catch (e) {
            console.warn('Could not set localStorage');
          }
        });

        await page.waitForTimeout(2000);
        const filepath = resolve(OUTPUT_DIR, filename);
        await page.screenshot({ path: filepath });
        console.log(`✓ Saved: ${filename}`);
        screenshots.push(filename);
      } catch (error) {
        console.error(`✗ Failed to screenshot ${filename}: ${error.message}`);
      }
    }

  } finally {
    await browser.close();
  }

  console.log('\n\n✅ Screenshot capture complete!\n');
  console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);
  console.log('📋 Files saved:');
  screenshots.forEach(file => console.log(`  - ${file}`));
  console.log('\n');

  process.exit(0);
})().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
