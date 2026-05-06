import React, { useState, useEffect } from 'react';
import { fetchAPI, mockFetch } from '../utils/api';

const MOCK = {
  overview: 'A fast-growing SaaS company offering customer engagement software, serving over 60,000 businesses globally across CRM, helpdesk, and marketing automation verticals.',
  industry: 'SaaS / Customer Engagement Software',
  owner: 'Head of QA / VP Engineering',
  lastConversation: 'SDR sent LinkedIn message 3 weeks ago — no reply. Previous AE had a demo call in Q4 2025 that ended with "budget freeze" objection.',
  employeeCount: '5,000 – 10,000',
  founded: '2010',
  headquarters: 'San Mateo, CA (India HQ: Chennai)'
};

export default function AccountSummary({ formData, postDiscovery }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    mockFetch(MOCK, 1200).then(d => { setData(d); setLoading(false); });
  }, [formData.accountName]);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon bg-blue-900/50"><span>🏢</span></div>
        <div>
          <h2 className="section-title">Account Summary</h2>
          <p className="text-sm text-slate-500">{formData.accountName} &middot; {formData.companyUrl}</p>
        </div>
      </div>

      {/* Post Discovery: Team & Meeting Info */}
      {postDiscovery && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 p-4 bg-cyan-900/10 border border-cyan-900/30 rounded-lg">
          {[
            { label: 'SDR', value: formData.sdrName || '—' },
            { label: 'Account Executive', value: formData.aeName || '—' },
            { label: 'Presales / SE', value: formData.presalesName || '—' },
            { label: 'Meeting Date', value: formData.meetingDate || '—' }
          ].map(item => (
            <div key={item.label}>
              <div className="text-xs text-slate-500 mb-0.5">{item.label}</div>
              <div className="font-semibold text-cyan-300 text-sm">{item.value}</div>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="loading-pulse h-4" style={{ width: `${75 + i * 5}%` }} />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Overview</div>
            <p className="text-slate-300 leading-relaxed">{data.overview}</p>
          </div>
          <Field label="Industry" value={data.industry} icon="🏭" />
          <Field label="Account Owner / Champion" value={data.owner} icon="👤" />
          <Field label="Headquarters" value={data.headquarters} icon="📍" />
          <Field label="Founded" value={data.founded} icon="📅" />
          <Field label="Employees" value={data.employeeCount} icon="👥" />
          <div className="sm:col-span-2 p-3 bg-amber-900/10 border border-amber-900/30 rounded-lg">
            <div className="text-xs text-amber-400 font-semibold mb-1">💬 Last Conversation</div>
            <p className="text-slate-300 text-sm">{data.lastConversation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, icon }) {
  return (
    <div>
      <div className="text-xs text-slate-500 mb-0.5">{icon} {label}</div>
      <div className="text-slate-200 font-medium">{value}</div>
    </div>
  );
}
