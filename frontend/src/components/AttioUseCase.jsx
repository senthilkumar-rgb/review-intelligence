import React, { useState, useEffect } from 'react';
import { mockFetch } from '../utils/api';

const MOCK = {
  customerName: 'Freshworks',
  industry: 'SaaS / Customer Engagement Software',
  challenge: 'Freshworks was struggling with 8-hour regression cycles that blocked their weekly release schedule. Their 12-person QA team spent 70% of time on manual regression, leaving minimal time for exploratory testing.',
  solution: "Implemented Testsigma as their primary automation platform, migrating 2,400+ test cases from Selenium in 6 weeks using Testsigma's NLP-based test authoring and AI-assisted migration tool.",
  results: [
    { metric: 'Regression Time', before: '8 hours', after: '45 minutes', improvement: '89% reduction' },
    { metric: 'Release Frequency', before: 'Weekly', after: 'Daily', improvement: '7x faster' },
    { metric: 'Test Coverage', before: '34%', after: '87%', improvement: '2.5x increase' },
    { metric: 'QA Productivity', before: '30% on innovation', after: '80% on innovation', improvement: '60% more high-value work' }
  ],
  quote: '"Testsigma transformed how we think about quality. What used to be a bottleneck is now a competitive advantage." — VP of Engineering, Freshworks',
  contactRole: 'VP Engineering'
};

export default function AttioUseCase({ formData }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    mockFetch(MOCK, 1400).then(d => { setData(d); setLoading(false); });
  }, [formData.accountName]);

  return (
    <div className="card border-emerald-900/30">
      <div className="card-header">
        <div className="card-icon bg-emerald-900/50"><span>🏆</span></div>
        <div className="flex-1">
          <h2 className="section-title">Customer Use Case</h2>
          <p className="text-sm text-slate-500">Powered by Attio &mdash; similar industry success story</p>
        </div>
        <span className="badge bg-emerald-900/40 text-emerald-300 border border-emerald-800 ml-auto">Attio CRM</span>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="loading-pulse h-10 rounded-lg" />)}</div>
      ) : (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200">
              {data.customerName[0]}
            </div>
            <div>
              <div className="font-semibold text-slate-200">{data.customerName}</div>
              <div className="text-xs text-slate-500">{data.industry}</div>
            </div>
            <span className="badge badge-success ml-auto">Won Deal</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-red-900/10 border border-red-900/30 rounded-lg">
              <div className="text-xs text-red-400 font-semibold uppercase tracking-wider mb-1">🔴 Challenge</div>
              <p className="text-sm text-slate-300">{data.challenge}</p>
            </div>
            <div className="p-3 bg-blue-900/10 border border-blue-900/30 rounded-lg">
              <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-1">🛠 Solution</div>
              <p className="text-sm text-slate-300">{data.solution}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {data.results.map((r, i) => (
              <div key={i} className="p-3 bg-emerald-900/10 border border-emerald-900/30 rounded-lg text-center">
                <div className="text-lg font-bold text-emerald-400">{r.improvement}</div>
                <div className="text-xs text-slate-400 mt-0.5">{r.metric}</div>
                <div className="text-xs text-slate-600 mt-1">{r.before} → {r.after}</div>
              </div>
            ))}
          </div>

          <blockquote className="border-l-4 border-emerald-700 pl-4 italic text-slate-300 text-sm">
            {data.quote}
          </blockquote>
        </div>
      )}
    </div>
  );
}
