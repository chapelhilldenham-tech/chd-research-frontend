const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE ERROR:', msg.text());
    }
  });
  
  page.on('pageerror', error => {
    console.log('PAGE UNCAUGHT ERROR:', error.message, error.stack);
  });

  try {
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle', timeout: 10000 });
  } catch(e) {
    console.log('Timeout or goto error', e);
  }
  
  await browser.close();
})();
