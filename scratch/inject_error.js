const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const script = `
<script>
window.addEventListener('error', function(e) {
  console.log('GLOBAL ERROR', e.message, e.filename, e.lineno, e.colno, e.error ? e.error.stack : '');
  document.body.innerHTML += '<div style="color:red;z-index:9999;position:absolute;top:0;background:white;padding:20px;">' + e.message + '</div>';
});
</script>
`;
const newHtml = html.replace('<head>', '<head>' + script);
fs.writeFileSync('dist/index.html', newHtml);
