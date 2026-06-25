import fs from 'fs';
let content = fs.readFileSync('src/data/analyticsSnapshot.ts', 'utf8');
content = content.replace(/'Previous snapshot — pending update'/g, "''");
content = content.replace(/'Pending update'/g, "'-'");
fs.writeFileSync('src/data/analyticsSnapshot.ts', content);
