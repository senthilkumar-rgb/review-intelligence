import React, { useState } from 'react';
import InputSection from './components/InputSection';
import PreDiscoveryView from './components/PreDiscoveryView';
import PostDiscoveryView from './components/PostDiscoveryView';

export default function App() {
  const [formData, setFormData] = useState(null);
  const [view, setView] = useState(null); // 'pre' | 'post'

  function handleSubmit(data) {
    setFormData(data);
    setView(data.stage === 'pre' ? 'pre' : 'post');
    setTimeout(() => {
      document.getElementById('output-top')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  function handleReset() {
    setFormData(null);
    setView(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              RI
            </div>
            <div>
              <div className="font-bold text-slate-100 leading-tight">Review Intelligence</div>
              <div className="text-xs text-slate-500">Testsigma Sales Agent</div>
            </div>
          </div>
          {view && (
            <div className="flex items-center gap-3">
              <span className={`badge ${ view === 'pre' ? 'bg-violet-900/50 text-violet-300 border-violet-800' : 'bg-cyan-900/50 text-cyan-300 border-cyan-800' } border`}>
                {view === 'pre' ? '🔍 Pre Discovery' : '🚀 Post Discovery'}
              </span>
              <button onClick={handleReset} className="btn-secondary text-sm py-1.5 px-3">
                ← New Analysis
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero */}
        {!view && (
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold gradient-text mb-3">Sales Intelligence Agent</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              AI-powered account research, intent signals, and outreach generation for Testsigma's sales team.
            </p>
          </div>
        )}

        {/* Input always visible at top */}
        <InputSection onSubmit={handleSubmit} isSubmitted={!!view} />

        {/* Output */}
        {view && (
          <div id="output-top" className="mt-8">
            {view === 'pre' ? (
              <PreDiscoveryView formData={formData} />
            ) : (
              <PostDiscoveryView formData={formData} />
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 mt-16 py-6 text-center text-slate-600 text-sm">
        Review Intelligence &copy; {new Date().getFullYear()} &middot; Powered by Anthropic Claude, G2 Intent &amp; Gong
      </footer>
    </div>
  );
}
