import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

const LOCALHOST = 'http://localhost:5173';
const OUTPUT_DIR = resolve('screenshots', 'redesign');
const DESKTOP_SIZE = { width: 1440, height: 900 };

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

async function screenshotPage(page, url, name) {
  try {
    await page.setViewportSize(DESKTOP_SIZE);
    await page.goto(`${LOCALHOST}${url}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const filename = `${name}-desktop.png`;
    const filepath = resolve(OUTPUT_DIR, filename);
    await page.screenshot({ path: filepath });
    console.log(`✓ ${filename}`);
    return filename;
  } catch (error) {
    console.error(`✗ ${name}: ${error.message}`);
    return null;
  }
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const screenshots = [];

  console.log('📸 Capturing redesign screenshots...\n');

  try {
    for (const { url, name } of pages) {
      const file = await screenshotPage(page, url, name);
      if (file) screenshots.push(file);
    }
  } finally {
    await browser.close();
  }

  console.log(`\n✅ ${screenshots.length} pages captured to ${OUTPUT_DIR}`);
  process.exit(0);
})().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
