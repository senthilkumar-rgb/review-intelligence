import React, { useState, useEffect } from 'react';
import { mockFetch } from '../utils/api';

const MOCK_OUTREACH = [
  {
    contactName: 'Ravi Shankar',
    contactTitle: 'Head of QA',
    role: 'Champion',
    reviewConnection: 'Based on G2 review: \'We spend more time maintaining scripts than writing new tests\'',
    email: {
      subject: 'Cut your regression maintenance time by 70% — specifically for Selenium teams',
      body: `Hi Ravi,

I came across a G2 review from a QA Lead that stopped me in my tracks: "We spend more time maintaining our Selenium scripts than actually writing new tests. Every UI change breaks 30+ tests."

I imagine that might resonate with what your team experiences at ${'{account}'}.

At Testsigma, we built AI-powered self-healing locators that automatically update when the UI changes — your tests keep running even after a frontend deployment, without anyone touching the scripts. Teams like yours typically see a 70% drop in maintenance overhead within the first quarter.

Worth a 20-minute call this week to see if it fits your workflow?

Best,
[Your Name]
Testsigma`
    },
    callScript: {
      opener: 'Hi Ravi, I\'m reaching out because we work with a lot of QA leads who are stuck spending more time maintaining automation scripts than actually expanding test coverage — and I wanted to see if that\'s something your team deals with.',
      valueProposition: 'Testsigma\'s AI self-healing cuts script maintenance by 70%, giving your team back the hours to build new coverage instead of fighting broken locators.',
      discoveryQuestion: 'What percentage of your team\'s sprint capacity is currently going toward maintaining existing test scripts vs. writing new ones?',
      objectionHandle: 'If they say \'we\'re happy with Selenium\': \'Completely fair — most of our customers started with Selenium too. The question is whether the maintenance overhead has become the ceiling on how fast your team can grow test coverage. Mind if I show you what the delta looks like?\''
    }
  },
  {
    contactName: 'Ananya Krishnan',
    contactTitle: 'VP Engineering',
    role: 'Decision Maker',
    reviewConnection: 'Based on G2 review: \'Full regression suite takes 6 hours — cannot run on every PR\'',
    email: {
      subject: 'Reducing your QA cycle from 6 hours to 45 minutes (no infra change needed)',
      body: `Hi Ananya,

VP Engineering at companies scaling through aggressive release cycles often hit the same wall: the QA pipeline becomes the bottleneck.

A G2 review from a senior QA engineer recently caught my attention: "Our full regression suite takes 6 hours to run. We cannot run it on every PR."

Testsigma solves this by running your regression suite in parallel across the cloud — no grid to manage, no infra overhead. Freshworks went from 8-hour regressions to 45 minutes and moved to daily releases within 6 weeks.

If faster release velocity is on your roadmap for this quarter, I\'d love to show you what that looks like for your stack.

[Your Name]
Testsigma`
    },
    callScript: {
      opener: 'Hi Ananya, I work with VP Engs who are trying to move faster but keep hitting their QA pipeline as the bottleneck — I wanted to see if that\'s a theme at your company.',
      valueProposition: 'Testsigma eliminates the regression time ceiling with parallel cloud execution — Freshworks cut theirs from 8 hours to 45 minutes and 7x\'d their release frequency.',
      discoveryQuestion: 'How long does your full regression cycle take today, and does that limit how often you can ship to production?',
      objectionHandle: 'If they say \'we have our own CI setup\': \'Great — Testsigma integrates directly with GitHub Actions, Jenkins, Azure DevOps. We plug into what you already have, we don\'t replace it.\''
    }
  },
  {
    contactName: 'James Mitchell',
    contactTitle: 'Senior QA Automation Engineer',
    role: 'End User',
    reviewConnection: 'Based on G2 review: \'Maintenance nightmare — every UI change breaks 30+ tests\'',
    email: {
      subject: 'You wrote the test. Let AI maintain it.',
      body: `Hi James,

As someone who lives in the automation stack daily, you probably know the pain better than anyone: you write a solid test suite, a designer tweaks the UI, and suddenly 30 tests are broken.

We built Testsigma specifically to solve this for engineers like you. Our AI self-healing engine detects when a locator breaks and automatically finds the right element — your pipeline stays green without you spending Friday afternoon firefighting.

We also support NLP-based authoring so the team around you (PMs, BAs) can contribute test cases without you having to translate requirements into code.

Happy to do a quick technical walkthrough this week?

[Your Name]`
    },
    callScript: {
      opener: 'Hi James, I\'m calling because I work with automation engineers who\'ve told me they\'re spending a huge chunk of their week on test maintenance instead of building new coverage — and I wanted to see if that\'s your reality too.',
      valueProposition: 'Self-healing AI + parallel execution means you write once, Testsigma keeps it running — and your test suite grows without you becoming a full-time maintenance engineer.',
      discoveryQuestion: 'When was the last time a frontend deployment caused a wave of test failures for your team?',
      objectionHandle: 'If they say \'I prefer code-based frameworks\': \'Testsigma is fully code-friendly — you can write in Java, Python, or JavaScript. The AI layer sits underneath and handles the flaky locator problem without changing how you write tests.\''
    }
  }
];

export default function ColdEmailScript({ formData, contacts, reviews }) {
  const [outreach, setOutreach] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [activeType, setActiveType] = useState('email');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    mockFetch(MOCK_OUTREACH, 2500).then(data => { setOutreach(data); setLoading(false); });
  }, [formData.accountName]);

  function copy(text) {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon bg-emerald-900/50"><span>📧</span></div>
        <div>
          <h2 className="section-title">Cold Email &amp; Call Scripts</h2>
          <p className="text-sm text-slate-500">Personalized per contact, informed by G2 reviews</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="loading-pulse h-48 rounded-lg" />)}</div>
      ) : (
        <div>
          {/* Contact tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {outreach.map((o, i) => (
              <button
                key={i}
                onClick={() => { setActiveTab(i); setActiveType('email'); }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === i ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {o.contactName}
                <span className="ml-1.5 text-xs opacity-70">{o.role}</span>
              </button>
            ))}
          </div>

          {/* Type toggle */}
          <div className="flex gap-2 mb-4">
            {['email', 'call'].map(t => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeType === t ? 'bg-slate-600 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                {t === 'email' ? '📧 Email' : '📞 Call Script'}
              </button>
            ))}
          </div>

          {outreach[activeTab] && (
            <div>
              <div className="p-3 bg-amber-900/10 border border-amber-900/30 rounded-lg mb-3 text-xs text-amber-300">
                🔗 Review connection: {outreach[activeTab].reviewConnection}
              </div>

              {activeType === 'email' ? (
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xs text-slate-500">To: </span>
                      <span className="text-sm text-slate-300">{outreach[activeTab].contactName} &lt;{outreach[activeTab].contactName.toLowerCase().replace(' ', '.')}@{formData.companyUrl || 'account.com'}&gt;</span>
                    </div>
                    <button onClick={() => copy(`Subject: ${outreach[activeTab].email.subject}\n\n${outreach[activeTab].email.body}`)} className="btn-secondary text-xs py-1 px-2">
                      {copied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="text-xs text-slate-500 mb-1">Subject: <span className="text-slate-300 font-medium">{outreach[activeTab].email.subject}</span></div>
                  <div className="border-t border-slate-700 mt-3 pt-3">
                    <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed">
                      {outreach[activeTab].email.body.replace('{account}', formData.accountName)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {[
                    { label: '👋 Opener', key: 'opener' },
                    { label: '✨ Value Proposition', key: 'valueProposition' },
                    { label: '❓ Discovery Question', key: 'discoveryQuestion' },
                    { label: '🛡️ Objection Handle', key: 'objectionHandle' }
                  ].map(({ label, key }) => (
                    <div key={key} className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                      <div className="text-xs font-semibold text-slate-400 mb-1.5">{label}</div>
                      <p className="text-sm text-slate-300">{outreach[activeTab].callScript[key]}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
