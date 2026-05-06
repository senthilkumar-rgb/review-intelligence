import React, { useState, useEffect } from 'react';
import { mockFetch } from '../utils/api';

const MOCK_BANT = {
  source: 'Attio',
  accountName: 'Account',
  callDate: '2026-05-05',
  duration: '42 minutes',
  attioScore: 78,
  bant: {
    budget: {
      score: 8,
      confirmed: true,
      amount: '$50,000 – $120,000 annually',
      approvalProcess: 'VP Engineering + CFO sign-off for deals above $75K',
      currentSpend: 'Spending ~$30K/year on manual QA resources',
      notes: 'Budget allocated in Q3 planning, ready to move'
    },
    authority: {
      score: 7,
      champion: 'Head of QA',
      decisionMakers: ['VP Engineering', 'CTO'],
      buyingCommittee: ['Head of QA (Champion)', 'VP Eng (Economic Buyer)', 'IT Security (Influencer)'],
      notes: 'Champion has strong influence but VP Eng makes final call'
    },
    need: {
      score: 9,
      urgency: 'High',
      primaryPain: 'Manual regression testing taking 2 weeks per release cycle',
      businessImpact: 'Slowing release velocity, losing competitive edge',
      quantifiedPain: '3 FTEs spending 60% time on manual regression',
      notes: 'Strong pain, tied to board-level OKR on release frequency'
    },
    timeline: {
      score: 7,
      decisionDate: 'End of Q3',
      goLiveTarget: 'Before Q4 major release',
      competitors: ['Selenium + internal framework', 'Evaluating Katalon'],
      trigger: 'Failed release caused by missed regression test',
      notes: 'Motivated by recent incident, real urgency'
    }
  },
  keyMoments: [
    { timestamp: '4:23', quote: 'We had a production incident last month because our regression suite missed a critical bug', type: 'pain' },
    { timestamp: '12:47', quote: 'Our VP wants us to go from monthly to bi-weekly releases by EOY', type: 'urgency' },
    { timestamp: '28:15', quote: 'Budget is approved, we just need to pick the right vendor', type: 'budget' }
  ],
  overallBANTScore: 7.75,
  recommendation: 'High probability deal. Focus demo on regression automation speed and CI/CD integration.'
};

const scoreColor = s => s >= 8 ? 'text-emerald-400' : s >= 6 ? 'text-amber-400' : 'text-red-400';
const scoreRingColor = s => s >= 8 ? 'border-emerald-500' : s >= 6 ? 'border-amber-500' : 'border-red-500';
const momentColor = t => t === 'pain' ? 'border-red-800 bg-red-900/10' : t === 'urgency' ? 'border-amber-800 bg-amber-900/10' : 'border-emerald-800 bg-emerald-900/10';

export default function OnePager({ formData, onBANTLoaded }) {
  const [bant, setBant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const mock = { ...MOCK_BANT, accountName: formData.accountName };
    mockFetch(mock, 2000).then(data => {
      setBant(data);
      onBANTLoaded?.(data);
      setLoading(false);
    });
  }, [formData.accountName]);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon bg-cyan-900/50"><span>📄</span></div>
        <div className="flex-1">
          <h2 className="section-title">Discovery Call One-Pager</h2>
          <p className="text-sm text-slate-500">BANT analysis from Attio CRM</p>
        </div>
        {bant && (
          <div className="text-right">
            <div className={`text-2xl font-bold ${scoreColor(bant.overallBANTScore)}`}>{bant.overallBANTScore}/10</div>
            <div className="text-xs text-slate-500">BANT Score &middot; <span className="text-emerald-400">Attio</span></div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="loading-pulse h-24 rounded-lg" />)}</div>
      ) : (
        <div>
          {/* Source badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="badge bg-emerald-900/40 text-emerald-300 border border-emerald-800">Powered by Attio</span>
            <span className="text-xs text-slate-500">{bant.callDate} &middot; {bant.duration}</span>
          </div>

          {/* BANT Scores Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              { key: 'budget', label: 'Budget', icon: '💰', data: bant.bant.budget },
              { key: 'authority', label: 'Authority', icon: '👑', data: bant.bant.authority },
              { key: 'need', label: 'Need', icon: '⚡', data: bant.bant.need },
              { key: 'timeline', label: 'Timeline', icon: '📅', data: bant.bant.timeline }
            ].map(({ key, label, icon, data }) => (
              <div key={key} className={`p-4 bg-slate-800/50 border-2 ${scoreRingColor(data.score)} rounded-xl text-center`}>
                <div className="text-2xl mb-1">{icon}</div>
                <div className={`text-2xl font-bold ${scoreColor(data.score)}`}>{data.score}/10</div>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="space-y-3 mb-5">
            <DetailCard title="💰 Budget" color="emerald">
              <Row label="Amount" value={bant.bant.budget.amount} />
              <Row label="Process" value={bant.bant.budget.approvalProcess} />
              <Row label="Current Spend" value={bant.bant.budget.currentSpend} />
              <Row label="Notes" value={bant.bant.budget.notes} />
            </DetailCard>
            <DetailCard title="👑 Authority" color="violet">
              <Row label="Champion" value={bant.bant.authority.champion} />
              <Row label="Decision Makers" value={bant.bant.authority.decisionMakers.join(', ')} />
              <Row label="Buying Committee" value={bant.bant.authority.buyingCommittee.join(' | ')} />
              <Row label="Notes" value={bant.bant.authority.notes} />
            </DetailCard>
            <DetailCard title="⚡ Need" color="red">
              <Row label="Primary Pain" value={bant.bant.need.primaryPain} />
              <Row label="Business Impact" value={bant.bant.need.businessImpact} />
              <Row label="Quantified" value={bant.bant.need.quantifiedPain} />
              <Row label="Urgency" value={bant.bant.need.urgency} />
            </DetailCard>
            <DetailCard title="📅 Timeline" color="cyan">
              <Row label="Decision Date" value={bant.bant.timeline.decisionDate} />
              <Row label="Go-Live Target" value={bant.bant.timeline.goLiveTarget} />
              <Row label="Competitors" value={bant.bant.timeline.competitors.join(', ')} />
              <Row label="Trigger" value={bant.bant.timeline.trigger} />
            </DetailCard>
          </div>

          {/* Key Moments */}
          <div className="mb-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">🎞 Key Call Moments</div>
            <div className="space-y-2">
              {bant.keyMoments.map((m, i) => (
                <div key={i} className={`flex gap-3 p-3 border rounded-lg ${momentColor(m.type)}`}>
                  <span className="text-xs font-mono text-slate-400 flex-shrink-0 mt-0.5">{m.timestamp}</span>
                  <span className="text-sm text-slate-300 italic">&ldquo;{m.quote}&rdquo;</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="p-4 bg-brand-900/20 border border-brand-800/40 rounded-lg">
            <div className="text-xs text-brand-400 font-semibold uppercase tracking-wider mb-1">👤 AE Recommendation</div>
            <p className="text-slate-200">{bant.recommendation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailCard({ title, color, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden">
      <button className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/50 transition-colors" onClick={() => setOpen(!open)}>
        <span className="font-medium text-slate-200 text-sm">{title}</span>
        <svg className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && <div className="px-4 pb-3 space-y-1.5 border-t border-slate-700">{children}</div>}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex gap-2 pt-1.5">
      <span className="text-xs text-slate-500 flex-shrink-0 w-28">{label}</span>
      <span className="text-sm text-slate-300">{value}</span>
    </div>
  );
}
