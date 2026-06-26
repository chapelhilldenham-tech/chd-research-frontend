import fs from 'fs';
let css = fs.readFileSync('public/assets/css/components.css', 'utf8');

css = css.replace(/\.cred-grid \{[\s\S]*?\}/, `.cred-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  flex-wrap: wrap;
}`);

css = css.replace(/\.cred-card \{[\s\S]*?\}/, `.cred-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
}`);

css = css.replace(/\.cred-card:first-child \{[\s\S]*?\}/, ``);

fs.writeFileSync('public/assets/css/components.css', css);
console.log('Success');
