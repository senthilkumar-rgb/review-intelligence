import React, { useState, useEffect } from 'react';
import { mockFetch } from '../utils/api';

const MOCK_PAINPOINTS = [
  {
    title: 'High Test Maintenance Cost',
    description: 'Teams spend 40–60% of QA time maintaining existing Selenium scripts rather than writing new tests. Every UI update breaks dozens of test cases.',
    frequency: 'High',
    testsigmaUSP: 'AI-powered self-healing locators automatically update when UI changes. Testsigma reduces maintenance effort by up to 70%, verified across 500+ enterprise customers.'
  },
  {
    title: 'Slow Regression Cycles',
    description: '6–8 hour regression suites block CI/CD pipelines, forcing teams to run tests only nightly or weekly. Bugs reach production undetected.',
    frequency: 'High',
    testsigmaUSP: 'Parallel cloud execution across 3,000+ environments cuts regression time from hours to minutes. Teams run full suites on every PR without managing infrastructure.'
  },
  {
    title: 'Cross-Browser Testing Infrastructure',
    description: 'Maintaining Selenium Grid and browser farms requires dedicated DevOps bandwidth. Teams frequently skip cross-browser testing due to infrastructure complexity.',
    frequency: 'High',
    testsigmaUSP: 'Instant cloud access to 3,000+ real browser/OS/device combinations. Zero infrastructure setup or maintenance — pay only for what you use.'
  },
  {
    title: 'Automation Gatekeeping',
    description: 'Only senior engineers with coding skills can write automated tests. Non-technical stakeholders (PMs, BAs, manual QA) are excluded from the automation process.',
    frequency: 'Medium',
    testsigmaUSP: 'NLP-based test authoring lets anyone write tests in plain English. Product managers and business analysts contribute test cases directly, removing bottlenecks.'
  },
  {
    title: 'Poor Visibility & Reporting',
    description: 'Test results are raw pass/fail logs without trend analysis, flaky test identification, or executive dashboards. Leadership has no visibility into quality health.',
    frequency: 'Medium',
    testsigmaUSP: 'Built-in smart dashboards with flaky test detection, coverage trends, and failure heatmaps. One-click executive reports that need zero additional setup.'
  }
];

export default function TechnicalPainpoints({ formData, reviews }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    setLoading(true);
    mockFetch(MOCK_PAINPOINTS, 2000).then(d => { setData(d); setLoading(false); });
  }, [formData.accountName]);

  const freqColor = f => f === 'High' ? 'badge-high' : f === 'Medium' ? 'badge-medium' : 'badge-low';

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon bg-orange-900/50"><span>⚡</span></div>
        <div>
          <h2 className="section-title">Technical Painpoints &amp; Testsigma USPs</h2>
          <p className="text-sm text-slate-500">Derived from competitor reviews &mdash; mapped to Testsigma strengths</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="loading-pulse h-16 rounded-lg" />)}</div>
      ) : (
        <div className="space-y-3">
          {data.map((item, i) => (
            <div key={i} className="border border-slate-700 rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono text-sm w-5">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-semibold text-slate-200">{item.title}</span>
                  <span className={`badge ${freqColor(item.frequency)}`}>{item.frequency}</span>
                </div>
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${expanded === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expanded === i && (
                <div className="px-4 pb-4 space-y-3 border-t border-slate-700">
                  <div className="pt-3">
                    <div className="text-xs text-red-400 font-semibold uppercase tracking-wider mb-1">🔴 Pain Point</div>
                    <p className="text-slate-300 text-sm">{item.description}</p>
                  </div>
                  <div className="p-3 bg-emerald-900/10 border border-emerald-900/30 rounded-lg">
                    <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">✅ Testsigma USP</div>
                    <p className="text-slate-300 text-sm">{item.testsigmaUSP}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
