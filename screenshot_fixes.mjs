import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import { resolve } from 'path';

const LOCALHOST = 'http://localhost:5173';
const OUTPUT_DIR = resolve('screenshots', 'fixes');
mkdirSync(OUTPUT_DIR, { recursive: true });

async function screenshot(page, url, name) {
  try {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${LOCALHOST}${url}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    const file = `${name}.png`;
    await page.screenshot({ path: resolve(OUTPUT_DIR, file) });
    console.log(`✓ ${file}`);
    return file;
  } catch (error) {
    console.error(`✗ ${name}: ${error.message}`);
    return null;
  }
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('📸 Capturing fixes...\n');

  const results = [];
  results.push(await screenshot(page, '/reports', 'reports-fixed'));
  results.push(await screenshot(page, '/analysts', 'analysts-fixed'));
  results.push(await screenshot(page, '/contact', 'contact-fixed'));
  results.push(await screenshot(page, '/signup', 'signup-fixed'));

  await browser.close();

  console.log(`\n✅ ${results.filter(Boolean).length} pages captured`);
  process.exit(0);
})().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
