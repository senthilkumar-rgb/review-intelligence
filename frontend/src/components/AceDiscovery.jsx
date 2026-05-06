import React, { useState, useEffect } from 'react';
import { mockFetch } from '../utils/api';

const MOCK_DISCOVERY = {
  callStructure: {
    intro: 'Start by thanking them for taking the time, set a collaborative tone: "My goal today is to understand what’s happening in your QA world, not to pitch. I want to make sure we’re actually a fit before either of us invests more time."',
    agenda: '1. Quick intro (2 min) → 2. Their current state & pain (10 min) → 3. Explore timelines & urgency (5 min) → 4. Budget & process (5 min) → 5. Next steps (3 min)',
    closingMove: 'End with: "Based on what you’ve shared, I think there’s a real fit here. Would it make sense to get your [VP/CTO] on a 30-min call so we can show them what this looks like for your specific stack?"'
  },
  bantQuestions: {
    budget: [
      { question: 'What are you currently spending on your QA tooling and infrastructure annually?', gongTip: 'Opens budget conversation naturally — Gong data shows leading with spend question gets 2x more candid answers than asking about budget directly', followUp: 'If vague: \'Is that mostly people cost, tool licenses, or infrastructure?\'' },
      { question: 'If you could solve the [main pain] problem, what\'s the business case you\'d present internally to get it approved?', gongTip: 'Forces them to articulate the ROI themselves — Gong scores this highly as it qualifies both budget and buying intent', followUp: 'If uncertain: \'Have you run similar tool evaluations before? What did that approval process look like?\'' }
    ],
    authority: [
      { question: 'Beyond yourself, who else would be involved in evaluating and approving a solution like this?', gongTip: 'Critical multi-threading question — Gong\'s #1 indicator of deal health is whether you\'ve met all decision makers', followUp: 'If they name others: \'Would it make sense to include them in our next conversation?\'' },
      { question: 'How does your organization typically evaluate and purchase new engineering tools?', gongTip: 'Uncovers procurement process and timeline — Gong scores deals 40% higher when buying process is understood early', followUp: 'If process is unclear: \'Is there a procurement or legal review step? Any security approval needed?\'' }
    ],
    need: [
      { question: 'Walk me through what happens when a developer pushes a code change today — what does the QA process look like end to end?', gongTip: 'Open-ended process walkthrough — Gong top performers use \'walk me through\' 3x more than average reps in discovery', followUp: 'Dig into: \'Where does that process break down most often?\'' },
      { question: 'What\'s the cost of your current regression cycle to the business — in delayed releases, engineering time, or escaped bugs?', gongTip: 'Quantifying pain is the #1 factor in Gong\'s BANT N-score — forces prospect to internalize and verbalize the pain\'s real cost', followUp: 'If unsure: \'Even a rough estimate — if each regression cycle costs X engineer-days, that\'s $Y per sprint. Does that math sound right?\'' },
      { question: 'What would it mean for your team if you could release 2x faster with the same quality bar?', gongTip: 'Future-state vision question — Gong coaches call this the \'dream close\' opener. Creates emotional engagement with the outcome', followUp: 'Silence after this question — let them paint the picture' }
    ],
    timeline: [
      { question: 'What\'s driving the timing for looking at this now? Was there a specific event or trigger?', gongTip: 'Trigger event identification — Gong data shows deals with identified triggers close 60% faster. Production incident, headcount freeze, or new VP are the top 3 triggers', followUp: 'If no trigger: \'If nothing changes, what does your QA situation look like in 6 months?\'' },
      { question: 'Do you have a target date for having a new solution in place? Is there a release or business milestone driving that?', gongTip: 'Timeline anchor — Gong scores T highly when tied to a business event vs. a vague \'soon\'. Ask for the milestone, not just the date', followUp: 'If vague: \'What would have to be true for you to make a decision this quarter?\'' }
    ]
  },
  gongScoreTips: [
    'Use \'talk tracks\' not scripts — Gong scores natural conversations higher than recited pitches. Know your questions cold so you can listen, not read.',
    'Mirror and label: When they describe pain, say \'It sounds like that\'s been frustrating\' before asking the next question. Gong top 10% reps use empathy statements 40% more.',
    'Hit all 4 BANT areas in sequence — Gong penalizes jumping between categories. Need → Authority → Timeline → Budget is the proven order.',
    'End questions with silence. Top Gong scorers speak 43% of the time in discovery. Resist filling silence — the best answers come after 3+ seconds of quiet.',
    'Confirm and summarize before moving on: \'So if I\'ve heard you correctly...\'  Gong shows deals where reps recap understanding have 30% higher win rates.'
  ]
};

export default function AceDiscovery({ formData }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('budget');

  useEffect(() => {
    setLoading(true);
    mockFetch(MOCK_DISCOVERY, 2800).then(d => { setData(d); setLoading(false); });
  }, [formData.accountName]);

  const bantSections = [
    { key: 'budget', label: 'Budget', icon: '💰', color: 'text-emerald-400' },
    { key: 'authority', label: 'Authority', icon: '👑', color: 'text-violet-400' },
    { key: 'need', label: 'Need', icon: '⚡', color: 'text-red-400' },
    { key: 'timeline', label: 'Timeline', icon: '📅', color: 'text-cyan-400' }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon bg-cyan-900/50"><span>🎤</span></div>
        <div>
          <h2 className="section-title">How to Ace Discovery</h2>
          <p className="text-sm text-slate-500">Gong-optimized BANT questions for a 10/10 qualification score</p>
        </div>
        <span className="badge bg-emerald-900/40 text-emerald-300 border border-emerald-800 ml-auto">Gong-Certified</span>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="loading-pulse h-32 rounded-lg" />)}</div>
      ) : (
        <div>
          {/* Call Structure */}
          <div className="mb-5 p-4 bg-brand-900/20 border border-brand-800/40 rounded-lg">
            <div className="text-xs font-semibold text-brand-400 uppercase tracking-wider mb-3">📞 Call Structure</div>
            <div className="space-y-2">
              <div>
                <span className="text-xs text-slate-500">Opener: </span>
                <span className="text-sm text-slate-300">{data.callStructure.intro}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500">Agenda: </span>
                <span className="text-sm text-slate-300">{data.callStructure.agenda}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500">Close: </span>
                <span className="text-sm text-slate-300">{data.callStructure.closingMove}</span>
              </div>
            </div>
          </div>

          {/* BANT Tabs */}
          <div className="flex gap-2 mb-4">
            {bantSections.map(s => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === s.key ? 'bg-slate-700 text-white' : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {data.bantQuestions[activeSection]?.map((q, i) => (
              <div key={i} className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-slate-500 font-mono text-sm flex-shrink-0">Q{i + 1}</span>
                  <p className="font-medium text-slate-200">&ldquo;{q.question}&rdquo;</p>
                </div>
                <div className="ml-7 space-y-2">
                  <div className="text-xs text-emerald-400">📊 Gong tip: {q.gongTip}</div>
                  <div className="text-xs text-amber-400">🔄 If vague: {q.followUp}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Gong Score Tips */}
          <div className="mt-5">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Gong Score Maximizers</div>
            <div className="space-y-2">
              {data.gongScoreTips.map((tip, i) => (
                <div key={i} className="flex gap-2 text-sm text-slate-300">
                  <span className="text-brand-400 flex-shrink-0">✓</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
