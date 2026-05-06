import React, { useState, useEffect } from 'react';
import { mockFetch } from '../utils/api';

const MOCK_CONTACTS = [
  { name: 'Ravi Shankar', title: 'Head of QA', role: 'Champion', email: 'ravi.shankar@account.com', linkedin: 'linkedin.com/in/ravishankar', painPoint: 'Regression cycles blocking releases', priority: 'High' },
  { name: 'Ananya Krishnan', title: 'VP Engineering', role: 'Decision Maker', email: 'ananya.krishnan@account.com', linkedin: 'linkedin.com/in/ananyak', painPoint: 'QA bottleneck slowing release velocity', priority: 'High' },
  { name: 'James Mitchell', title: 'Senior QA Automation Engineer', role: 'End User', email: 'james.mitchell@account.com', linkedin: 'linkedin.com/in/jamesmitch', painPoint: 'Spending too much time on script maintenance', priority: 'Medium' },
  { name: 'Priya Reddy', title: 'Product Manager', role: 'Influencer', email: 'priya.reddy@account.com', linkedin: 'linkedin.com/in/priyareddy', painPoint: 'Cannot contribute to test creation, dependent on QA', priority: 'Medium' },
  { name: 'David Lau', title: 'CTO', role: 'Economic Buyer', email: 'david.lau@account.com', linkedin: 'linkedin.com/in/davidlau', painPoint: 'Testing infrastructure cost and team scaling', priority: 'High' }
];

const roleColors = {
  Champion: 'bg-violet-900/40 text-violet-300 border-violet-800',
  'Decision Maker': 'bg-cyan-900/40 text-cyan-300 border-cyan-800',
  'Economic Buyer': 'bg-emerald-900/40 text-emerald-300 border-emerald-800',
  Influencer: 'bg-blue-900/40 text-blue-300 border-blue-800',
  'End User': 'bg-slate-800 text-slate-400 border-slate-700'
};

export default function ICPContacts({ formData, onContactsLoaded }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    mockFetch(MOCK_CONTACTS, 2200).then(data => {
      setContacts(data);
      onContactsLoaded?.(data);
      setLoading(false);
    });
  }, [formData.accountName]);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon bg-violet-900/50"><span>👥</span></div>
        <div>
          <h2 className="section-title">ICP &amp; Contacts</h2>
          <p className="text-sm text-slate-500">Buying committee members and decision-making roles</p>
        </div>
        {contacts.length > 0 && <span className="badge badge-success ml-auto">{contacts.length} contacts</span>}
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="loading-pulse h-20 rounded-lg" />)}</div>
      ) : (
        <div className="space-y-3">
          {contacts.map((c, i) => (
            <div key={i} className="flex gap-4 p-4 bg-slate-800/40 border border-slate-700/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-brand-900/50 border border-brand-700 flex items-center justify-center text-brand-300 font-semibold text-sm flex-shrink-0">
                {c.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <span className="font-semibold text-slate-200">{c.name}</span>
                  <span className={`badge border ${roleColors[c.role] || roleColors['End User']}`}>{c.role}</span>
                  <span className={`badge ${ c.priority === 'High' ? 'badge-high' : 'badge-medium'}`}>{c.priority}</span>
                </div>
                <div className="text-sm text-slate-400 mt-0.5">{c.title}</div>
                <div className="text-xs text-slate-500 mt-1.5 space-y-0.5">
                  <div>📧 <a href={`mailto:${c.email}`} className="hover:text-slate-300 transition-colors">{c.email}</a></div>
                  <div>🔗 <a href={`https://${c.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">{c.linkedin}</a></div>
                </div>
                <div className="mt-2 text-xs text-amber-400">📌 {c.painPoint}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
