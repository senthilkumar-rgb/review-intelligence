import React, { useState, useEffect } from 'react';
import { mockFetch } from '../utils/api';

const MOCK_REVIEWS = [
  { id: 1, rating: 1, title: 'Maintenance nightmare as app grows', content: 'We spend more time maintaining our Selenium scripts than actually writing new tests. Every UI change breaks 30+ tests. The team morale is at an all-time low because of this.', author: 'QA Lead', date: '2026-03-15', helpful: 47, source: 'G2' },
  { id: 2, rating: 2, title: 'Slow execution kills our CI/CD pipeline', content: 'Our full regression suite takes 6 hours to run. We cannot run it on every PR. We end up catching bugs late in the cycle which is very costly to fix.', author: 'Senior QA Engineer', date: '2026-02-28', helpful: 38, source: 'G2' },
  { id: 3, rating: 2, title: 'No real support for cross-browser testing', content: 'Setting up cross-browser testing grids is a full-time job in itself. We need dedicated DevOps just to maintain the infrastructure for running tests in parallel.', author: 'Automation Engineer', date: '2026-02-10', helpful: 31, source: 'G2' },
  { id: 4, rating: 2, title: 'Non-technical team members cannot contribute', content: 'Only our 3 senior automation engineers can write tests. Product managers, business analysts — nobody else can contribute. It creates a huge bottleneck.', author: 'QA Manager', date: '2026-01-22', helpful: 29, source: 'G2' },
  { id: 5, rating: 3, title: 'Reporting is too basic for management', content: 'The test reports are just pass/fail logs. No trend analysis, no insights on flaky tests, no visibility for management on test coverage. We have to build our own dashboards.', author: 'Engineering Manager', date: '2026-01-08', helpful: 24, source: 'G2' }
];

function Stars({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} className={n <= rating ? 'star-filled' : 'star-empty'}>★</span>
      ))}
    </div>
  );
}

export default function TechnicalReviews({ formData, onReviewsLoaded }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    mockFetch(MOCK_REVIEWS, 1800).then(data => {
      setReviews(data);
      onReviewsLoaded?.(data);
      setLoading(false);
    });
  }, [formData.accountName]);

  const ratingBg = r => r <= 1 ? 'bg-red-900/20 border-red-900/40' : r <= 2 ? 'bg-amber-900/20 border-amber-900/40' : 'bg-slate-800/50 border-slate-700/50';

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon bg-amber-900/50"><span>⭐</span></div>
        <div>
          <h2 className="section-title">Technical Reviews</h2>
          <p className="text-sm text-slate-500">5 lowest-rated reviews from G2 (competitor tool)</p>
        </div>
        <span className="badge bg-amber-900/30 text-amber-300 border border-amber-800 ml-auto">5 Reviews</span>
      </div>

      {loading ? (
        <div className="space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="loading-pulse h-28 rounded-lg" />)}</div>
      ) : (
        <div className="space-y-4">
          {reviews.map(rev => (
            <div key={rev.id} className={`p-4 rounded-lg border ${ratingBg(rev.rating)}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <Stars rating={rev.rating} />
                  <h4 className="font-semibold text-slate-200 mt-1">{rev.title}</h4>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="badge bg-slate-800 text-slate-400 border border-slate-700">{rev.source}</span>
                  <div className="text-xs text-slate-500 mt-1">{rev.date}</div>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{rev.content}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-slate-500">👤 {rev.author}</span>
                <span className="text-xs text-slate-500">👍 {rev.helpful} found helpful</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
