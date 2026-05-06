import React, { useState, useEffect } from 'react';
import { mockFetch } from '../utils/api';
import AnthropicChat from './AnthropicChat';

const MOCK_POINTERS = {
  winTheme: 'Turn QA from a release bottleneck into a velocity multiplier — cut regression time 89% and release daily instead of weekly.',
  aePointers: [
    { area: 'Opening Frame', pointer: 'Reference the production incident from the call: \'You mentioned a release failed because regression missed a critical bug. Let us show you exactly how that scenario looks in Testsigma.\'', priority: 'High' },
    { area: 'Budget Anchor', pointer: 'Their current spend is $30K/year on manual QA. Frame Testsigma at $50–70K as a replacement, not an addition. ROI is positive in month 1 if you factor in the 3 FTE hours saved.', priority: 'High' },
    { area: 'Multi-thread', pointer: 'VP Eng (Ananya) is the economic buyer. Close the demo with: \'Based on what you\'ve seen, would it make sense to get Ananya on a 20-min call this week?\'', priority: 'High' },
    { area: 'Competitor Handle', pointer: 'They\'re evaluating Katalon. Acknowledge it early: \'Katalon is a solid tool. The key difference is AI self-healing and cloud scale. Let me show you both side-by-side.\'', priority: 'Medium' },
    { area: 'Next Steps', pointer: 'Propose a 2-week POC on their actual test suite. Offer to migrate 50 of their existing Selenium tests as a free proof point.', priority: 'High' }
  ],
  sePointers: [
    { area: 'Demo Flow', pointer: 'Start with self-healing: break a test on purpose (rename a button), show it auto-heal in real time. This is the \'wow\' moment for their team\'s #1 pain.', priority: 'High' },
    { area: 'Parallel Execution', pointer: 'Run the same regression they described (6-hour suite equivalent) in parallel and show the time: \'This would take your 6-hour suite to under 30 minutes.\'', priority: 'High' },
    { area: 'CI/CD Integration', pointer: 'Show GitHub Actions / Jenkins integration live. They have a strong CI/CD culture. Demonstrate a PR trigger running automated tests in under 5 min.', priority: 'High' },
    { area: 'NLP Authoring', pointer: 'Invite the PM or BA persona in the room to write a test in plain English. This speaks directly to their bottleneck: only 3 engineers can write tests today.', priority: 'Medium' },
    { area: 'Reporting', pointer: 'Show the executive dashboard last. The QA head will love flaky test detection. But save it as a \'bonus\' — the first 3 demos drive the close.', priority: 'Medium' }
  ],
  demoFlow: [
    { step: 1, title: 'Context Setting', duration: '3 min', focus: 'Recap pain points from discovery call verbatim. Make them feel heard before showing anything.' },
    { step: 2, title: 'AI Self-Healing Live Demo', duration: '8 min', focus: 'Break a locator, show it self-heal. Map directly to their maintenance pain.' },
    { step: 3, title: 'Parallel Cloud Execution', duration: '7 min', focus: 'Show 6-hour suite running in 30 min. Use their actual app if POC is set up, otherwise use a comparable demo app.' },
    { step: 4, title: 'CI/CD Integration', duration: '5 min', focus: 'GitHub Actions trigger live. Emphasize zero infra setup.' },
    { step: 5, title: 'Migration Path', duration: '5 min', focus: 'Show Selenium migration tool. Address the \'we have 2,400 existing tests\' objection proactively.' },
    { step: 6, title: 'Commercial Discussion & Next Steps', duration: '7 min', focus: 'Anchor to their $30K current spend. Propose POC. Ask for VP Eng introduction.' }
  ],
  mustAddressObjections: [
    'We already have a Selenium framework — we\'ve invested too much to switch',
    'Katalon seems to do the same things at a lower cost',
    'We need IT Security to approve any new cloud tools',
    'We don\'t have bandwidth for a migration project right now'
  ]
};

export default function AceDemo({ formData, bant }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ae');

  const demoContext = {
    stage: 'Post Discovery – Demo Prep',
    accountName: formData.accountName,
    companyUrl: formData.companyUrl,
    industry: formData.industry,
    bant: bant?.bant
  };

  useEffect(() => {
    if (!bant) return;
    setLoading(true);
    mockFetch(MOCK_POINTERS, 1500).then(d => { setData(d); setLoading(false); });
  }, [bant]);

  if (!bant) {
    return (
      <div className="card border-dashed border-slate-700">
        <div className="card-header">
          <div className="card-icon bg-brand-900/50"><span>🎯</span></div>
          <div><h2 className="section-title">How to Ace the Demo</h2><p className="text-sm text-slate-500">Waiting for BANT analysis from One-Pager...</p></div>
        </div>
        <div className="text-center py-8 text-slate-500"><div className="text-3xl mb-2">⏳</div>BANT data loading...</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon bg-brand-900/50"><span>🎯</span></div>
        <div className="flex-1">
          <h2 className="section-title">How to Ace the Demo</h2>
          <p className="text-sm text-slate-500">Powered by Anthropic &mdash; tailored from your BANT analysis</p>
        </div>
        <span className="badge bg-violet-900/40 text-violet-300 border border-violet-800">Claude</span>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="loading-pulse h-16 rounded-lg" />)}</div>
      ) : (
        <div>
          {/* Win Theme */}
          <div className="mb-5 p-4 bg-brand-900/20 border border-brand-700/30 rounded-xl">
            <div className="text-xs text-brand-400 font-semibold uppercase tracking-wider mb-1">🏆 Win Theme</div>
            <p className="text-slate-100 font-medium">{data.winTheme}</p>
          </div>

          {/* AE / SE Tab Toggle */}
          <div className="flex gap-2 mb-4">
            {[
              { key: 'ae', label: '👔 AE Pointers' },
              { key: 'se', label: '🔧 SE / Presales Pointers' },
              { key: 'flow', label: '📈 Demo Flow' },
              { key: 'objections', label: '🛡️ Objections' }
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                  activeTab === t.key ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'ae' && (
            <div className="space-y-3">
              {data.aePointers.map((p, i) => (
                <PointerCard key={i} item={p} />
              ))}
            </div>
          )}

          {activeTab === 'se' && (
            <div className="space-y-3">
              {data.sePointers.map((p, i) => (
                <PointerCard key={i} item={p} />
              ))}
            </div>
          )}

          {activeTab === 'flow' && (
            <div className="space-y-3">
              {data.demoFlow.map((step, i) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-800/40 border border-slate-700/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-brand-900/50 border border-brand-700 flex items-center justify-center text-brand-300 font-bold text-sm flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200 text-sm">{step.title}</span>
                      <span className="badge bg-slate-800 text-slate-400 border border-slate-700">{step.duration}</span>
                    </div>
                    <p className="text-sm text-slate-300 mt-1">{step.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'objections' && (
            <div className="space-y-2">
              <p className="text-xs text-slate-500 mb-3">Prepare responses for these likely objections from {formData.accountName}:</p>
              {data.mustAddressObjections.map((obj, i) => (
                <div key={i} className="flex gap-3 p-3 bg-red-900/10 border border-red-900/30 rounded-lg">
                  <span className="text-red-400 flex-shrink-0">🛡️</span>
                  <span className="text-sm text-slate-300">{obj}</span>
                </div>
              ))}
            </div>
          )}

          {/* Embedded LLM Chat for Demo Prep */}
          <div className="mt-6">
            <AnthropicChat context={demoContext} label="Demo Prep Assistant" />
          </div>
        </div>
      )}
    </div>
  );
}

function PointerCard({ item }) {
  return (
    <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-lg">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="font-semibold text-slate-200 text-sm">{item.area}</span>
        <span className={`badge ${item.priority === 'High' ? 'badge-high' : 'badge-medium'}`}>{item.priority}</span>
      </div>
      <p className="text-sm text-slate-300">{item.pointer}</p>
    </div>
  );
}
