import React, { useState } from 'react';

export default function InputSection({ onSubmit, isSubmitted }) {
  const [stage, setStage] = useState('pre');
  const [form, setForm] = useState({
    accountName: '',
    companyUrl: '',
    industry: '',
    sdrName: '',
    aeName: '',
    presalesName: '',
    meetingDate: '',
    gongRecordingUrl: ''
  });

  function set(key, val) {
    setForm(f => ({ ...f, [key]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.accountName.trim()) return;
    onSubmit({ ...form, stage });
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon bg-brand-900/50">
          <span>🎯</span>
        </div>
        <div>
          <h2 className="section-title">Agent Configuration</h2>
          <p className="text-sm text-slate-500">Configure account details and select discovery stage</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Row 1: Account + URL + Stage */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="label">Account Name *</label>
            <input
              className="input-field"
              placeholder="e.g. Freshworks"
              value={form.accountName}
              onChange={e => set('accountName', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Company URL</label>
            <input
              className="input-field"
              placeholder="e.g. freshworks.com"
              value={form.companyUrl}
              onChange={e => set('companyUrl', e.target.value)}
            />
          </div>
          <div>
            <label className="label">Industry</label>
            <input
              className="input-field"
              placeholder="e.g. SaaS, Fintech"
              value={form.industry}
              onChange={e => set('industry', e.target.value)}
            />
          </div>
        </div>

        {/* Discovery Stage Dropdown */}
        <div className="mb-4">
          <label className="label">Discovery Stage *</label>
          <div className="relative w-full sm:w-64">
            <select
              className="select-field"
              value={stage}
              onChange={e => setStage(e.target.value)}
            >
              <option value="pre">🔍 Pre Discovery</option>
              <option value="post">🚀 Post Discovery</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1.5">
            {stage === 'pre'
              ? 'Generate account research, intent signals, reviews, contacts, outreach, and discovery questions.'
              : 'Analyze Gong recording for BANT, generate demo pointers, and pull Attio customer use case.'}
          </p>
        </div>

        {/* Post Discovery extra fields */}
        {stage === 'post' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-3">Post Discovery Details</p>
            </div>
            <div>
              <label className="label">SDR Name</label>
              <input className="input-field" placeholder="e.g. Sarah Chen" value={form.sdrName} onChange={e => set('sdrName', e.target.value)} />
            </div>
            <div>
              <label className="label">Account Executive Name</label>
              <input className="input-field" placeholder="e.g. Marcus Webb" value={form.aeName} onChange={e => set('aeName', e.target.value)} />
            </div>
            <div>
              <label className="label">Presales / SE Name</label>
              <input className="input-field" placeholder="e.g. Priya Nair" value={form.presalesName} onChange={e => set('presalesName', e.target.value)} />
            </div>
            <div>
              <label className="label">Meeting Date</label>
              <input className="input-field" type="date" value={form.meetingDate} onChange={e => set('meetingDate', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Gong Recording URL</label>
              <input className="input-field" placeholder="https://app.gong.io/call?id=..." value={form.gongRecordingUrl} onChange={e => set('gongRecordingUrl', e.target.value)} />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button type="submit" className="btn-primary">
            <span>✨</span>
            {isSubmitted ? 'Re-Generate Analysis' : `Generate ${stage === 'pre' ? 'Pre Discovery' : 'Post Discovery'} Report`}
          </button>
          {isSubmitted && (
            <span className="text-xs text-slate-500">Analysis complete. Scroll down to view results.</span>
          )}
        </div>
      </form>
    </div>
  );
}
