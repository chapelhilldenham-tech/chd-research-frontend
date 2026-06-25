const fs = require('fs');
const { JSDOM } = require('jsdom');
const path = require('path');

const html = fs.readFileSync('dist/index.html', 'utf8');

const dom = new JSDOM(html, {
  url: 'http://localhost/',
  runScripts: 'dangerously',
  resources: 'usable',
  beforeParse(window) {
    window.console.log = function(...args) {
      fs.appendFileSync('scratch/jsdom.log', 'LOG: ' + args.join(' ') + '\n');
    };
    window.console.error = function(...args) {
      fs.appendFileSync('scratch/jsdom.log', 'ERROR: ' + args.join(' ') + '\n');
    };
    window.onerror = function(message, source, lineno, colno, error) {
      fs.appendFileSync('scratch/jsdom.log', `WINDOW ERROR: ${message} at ${source}:${lineno}:${colno}\n`);
      if (error && error.stack) {
        fs.appendFileSync('scratch/jsdom.log', error.stack + '\n');
      }
    };
  }
});

setTimeout(() => {
  console.log("Done evaluating. Check scratch/jsdom.log");
}, 3000);
