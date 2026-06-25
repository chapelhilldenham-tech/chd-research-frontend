import fs from 'fs';

const filePath = 'src/pages/Analytics.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Add Recharts imports if not present
if (!code.includes('recharts')) {
  code = code.replace(
    `import { Link } from 'react-router-dom';`,
    `import { Link } from 'react-router-dom';\nimport { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';`
  );
}

const paramountPoints = `const paramountPoints = [
  { label: 'Jan', value: 2015 },
  { label: 'Feb', value: 2200 },
  { label: 'Mar', value: 2350 },
  { label: 'Apr', value: 2480 },
  { label: 'May', value: 2610 },
  { label: 'Jun', value: 2750.40 },
];`;

const newChartsCode = `
function MacroChart({ activeTab }: { activeTab: (typeof macroTabs)[number] }) {
  const isGdpChart = activeTab === 'GDP Growth';
  const data = activeTab === 'Inflation vs MPR'
    ? analyticsSnapshot.macroChart.inflationMpr.map(p => ({ name: p.label, Inflation: p.inflation, MPR: p.mpr }))
    : analyticsSnapshot.macroChart.gdpGrowth.map(p => ({ name: p.label, 'GDP Growth': p.value }));

  return (
    <div className="chart-shell chart-shell-tall analytics-svg-chart" style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        {isGdpChart ? (
          <BarChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e303a" />
            <XAxis dataKey="name" stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={val => val + '%'} />
            <Tooltip contentStyle={{ backgroundColor: '#1f2028', border: '1px solid #2e303a', borderRadius: '4px' }} itemStyle={{ color: '#c084fc' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="GDP Growth" fill="#aa3bff" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e303a" />
            <XAxis dataKey="name" stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={val => val + '%'} />
            <Tooltip contentStyle={{ backgroundColor: '#1f2028', border: '1px solid #2e303a', borderRadius: '4px' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="Inflation" stroke="#aa3bff" strokeWidth={3} activeDot={{ r: 6 }} dot={{ strokeWidth: 2 }} />
            <Line type="monotone" dataKey="MPR" stroke="#eab308" strokeWidth={3} activeDot={{ r: 6 }} dot={{ strokeWidth: 2 }} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

${paramountPoints}

function ParamountChart() {
  return (
    <div className="chart-shell chart-shell-paramount analytics-svg-chart" style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={paramountPoints} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e303a" />
          <XAxis dataKey="label" stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} domain={['dataMin - 100', 'dataMax + 100']} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#1f2028', border: '1px solid #2e303a', borderRadius: '4px' }} />
          <Line type="monotone" dataKey="value" stroke="#aa3bff" strokeWidth={3} activeDot={{ r: 6 }} dot={{ strokeWidth: 2, r: 4 }} name="Index Value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
`;

// Replace from `type ChartPoint` to before `export default function Analytics()`
const regex = /type ChartPoint = \{[\s\S]*?\}\s*(?=export default function Analytics)/;
code = code.replace(regex, newChartsCode);

fs.writeFileSync(filePath, code);
console.log('Successfully rewrote Analytics.tsx');
