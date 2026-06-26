const fs = require('fs');
let code = fs.readFileSync('src/data/mvpResearchReports.ts', 'utf8');

// Tie more reports to Bolade Agboola, Tajudeen Ibrahim, etc.
code = code.replace(
  /("synopsis": "This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Daily Market Report[^"]*",\s*"analysts": \[)/g,
  `$1
        {
          "id": "1",
          "name": "Tajudeen Ibrahim",
          "title": "Analyst"
        },
        {
          "id": "4",
          "name": "Boluwatife Ishola",
          "title": "Analyst"
        },`
);

// Specific reports
code = code.replace(
  /("synopsis": "This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: Airtel Africa Plc Company Research Update.",\s*"analysts": \[)/,
  `$1
        {
          "id": "1",
          "name": "Tajudeen Ibrahim",
          "title": "Analyst"
        },`
);

code = code.replace(
  /("synopsis": "This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: MTN Nigeria Communications PLC Initial Comments.",\s*"analysts": \[)/,
  `$1
        {
          "id": "3",
          "name": "Nabila Mohammed",
          "title": "Analyst"
        },`
);

fs.writeFileSync('src/data/mvpResearchReports.ts', code);
console.log('Updated reports with more analysts');
