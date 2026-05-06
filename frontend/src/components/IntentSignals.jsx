import React, { useState, useEffect } from 'react';
import { mockFetch } from '../utils/api';

const MOCK_SIGNALS = [
  { source: 'G2', topic: 'Test Automation Platforms', intent: 'High', date: '2026-05-01', location: 'San Francisco, CA', details: 'Multiple employees viewed Testsigma vs Katalon comparison pages', pageViews: 14 },
  { source: 'G2', topic: 'QA Automation Tools', intent: 'High', date: '2026-04-28', location: 'Austin, TX', details: 'Viewed pricing page and competitor alternatives', pageViews: 8 },
  { source: 'Factor', topic: 'Continuous Testing', intent: 'Medium', date: '2026-04-25', location: 'Bangalore, India', details: 'Surge in research on CI/CD pipeline integration with testing tools', pageViews: 22 },
  { source: 'G2', topic: 'Selenium Alternatives', intent: 'Medium', date: '2026-04-20', location: 'New York, NY', details: 'Researching codeless test automation options', pageViews: 6 },
  { source: 'Factor', topic: 'Test Management Software', intent: 'Low', date: '2026-04-15', location: 'London, UK', details: 'General browsing on test management and reporting tools', pageViews: 3 }
];

const MOCK_SUMMARY = {
  overallIntentScore: 82,
  trending: 'Increasing',
  hotTopics: ['Selenium Migration', 'Codeless Automation', 'CI/CD Integration'],
  locations: ['San Francisco, CA', 'Austin, TX', 'Bangalore, India']
};

export default function IntentSignals({ formData }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    mockFetch({ signals: MOCK_SIGNALS, summary: MOCK_SUMMARY }, 1500).then(d => { setData(d); setLoading(false); });
  }, [formData.accountName]);

  const intentColor = intent =>
    intent === 'High' ? 'badge-high' : intent === 'Medium' ? 'badge-medium' : 'badge-low';

  const sourceColor = src =>
    src === 'G2' ? 'bg-red-900/40 text-red-300 border-red-800' : 'bg-blue-900/40 text-blue-300 border-blue-800';

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon bg-red-900/50"><span>📡</span></div>
        <div className="flex-1">
          <h2 className="section-title">Intent Signals</h2>
          <p className="text-sm text-slate-500">G2 + Factor buyer intent data</p>
        </div>
        {data && (
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-400">{data.summary.overallIntentScore}</div>
            <div className="text-xs text-slate-500">Intent Score ↑ {data.summary.trending}</div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="loading-pulse h-14 rounded-lg" />)}</div>
      ) : (
        <>
          {/* Hot Topics */}
          <div className="flex flex-wrap gap-2 mb-4">
            {data.summary.hotTopics.map(t => (
              <span key={t} className="badge bg-violet-900/40 text-violet-300 border border-violet-800">🔥 {t}</span>
            ))}
          </div>

          {/* Locations summary */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs text-slate-500 self-center">Top locations:</span>
            {data.summary.locations.map(l => (
              <span key={l} className="badge bg-slate-800 text-slate-300 border border-slate-700">📍 {l}</span>
            ))}
          </div>

          {/* Signals table */}
          <div className="space-y-3">
            {data.signals.map((sig, i) => (
              <div key={i} className="flex gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="flex-shrink-0 mt-0.5">
                  <span className={`badge border ${sourceColor(sig.source)}`}>{sig.source}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-slate-200 text-sm">{sig.topic}</div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`badge ${intentColor(sig.intent)}`}>{sig.intent}</span>
                      <span className="text-xs text-slate-500">{sig.pageViews}pv</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{sig.details}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-slate-500">📍 {sig.location}</span>
                    <span className="text-xs text-slate-600">{sig.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
