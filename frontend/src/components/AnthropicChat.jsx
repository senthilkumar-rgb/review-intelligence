import React, { useState, useRef, useEffect } from 'react';

export default function AnthropicChat({ context, label = 'AI Assistant' }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send() {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput('');
    const userMsg = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, context, history: messages })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || data.error || 'No response received.' }]);
    } catch {
      // Demo mode: simulate a response when backend unavailable
      const demoReplies = [
        `Great question about ${context.accountName}! Based on the account data, I\'d recommend focusing on their CI/CD integration pain points — that\'s where Testsigma has the strongest differentiation.`,
        'Looking at the intent signals, the team in San Francisco has been most active on G2. That might be your warmest entry point for outreach.',
        'For the BANT qualification, I\'d prioritize the "Need" conversation first — they have strong urgency signals from the production incident mentioned in the Gong call notes.'
      ];
      const reply = demoReplies[messages.length % demoReplies.length];
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    }
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const suggestions = [
    'What\'s the best angle to open this account?',
    'Which contact should I reach out to first?',
    'How does Testsigma compare to what they\'re using?',
    'What objections should I prepare for?'
  ];

  return (
    <div className="card border-brand-800/50">
      <div className="card-header">
        <div className="card-icon bg-violet-900/50"><span>🤖</span></div>
        <div className="flex-1">
          <h2 className="section-title">{label}</h2>
          <p className="text-sm text-slate-500">Powered by Anthropic Claude &mdash; ask anything about this account</p>
        </div>
        <span className="badge bg-violet-900/40 text-violet-300 border border-violet-800">Claude</span>
      </div>

      {/* Chat messages */}
      <div className="min-h-32 max-h-80 overflow-y-auto space-y-3 mb-4 pr-1">
        {messages.length === 0 ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">🤖</div>
            <p className="text-slate-500 text-sm">Ask me anything about <span className="text-brand-400">{context.accountName}</span></p>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => setInput(s)} className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-full transition-colors border border-slate-700">
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' && <div className="w-6 h-6 rounded-full bg-violet-700 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">🤖</div>}
              <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
                m.role === 'user'
                  ? 'bg-brand-600 text-white rounded-br-sm'
                  : 'bg-slate-800 text-slate-200 rounded-bl-sm'
              }`}>
                {m.content}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-violet-700 flex items-center justify-center text-xs flex-shrink-0">🤖</div>
            <div className="bg-slate-800 px-3 py-2 rounded-xl rounded-bl-sm">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <textarea
          className="input-field flex-1 resize-none text-sm"
          rows={2}
          placeholder="Ask about this account, outreach strategy, competitive positioning..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          className="btn-primary px-4 self-end"
        >
          Send
        </button>
      </div>
      <p className="text-xs text-slate-600 mt-2">Press Enter to send &middot; Shift+Enter for new line</p>
    </div>
  );
}
