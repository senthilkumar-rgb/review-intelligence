# Review Intelligence

AI-powered sales intelligence agent for Testsigma's SDR and AE teams.

## Features

### Pre Discovery Mode
- **Account Summary** — Quick overview, industry, account owner, last conversation history
- **Intent Signals** — G2 + Factor buyer intent data with location intelligence
- **Technical Reviews** — 5 lowest-rated competitor reviews from G2
- **Technical Painpoints & Testsigma USPs** — Review-derived pain points mapped to Testsigma strengths
- **ICP & Contacts** — Buying committee with roles, emails, LinkedIn, and priority scores
- **Cold Email & Call Scripts** — Personalized per contact, informed by G2 reviews and their specific role
- **How to Ace Discovery** — Gong-optimized BANT questions for a 10/10 qualification score
- **Pre Discovery Assistant** — Anthropic Claude LLM for further account research

### Post Discovery Mode
- **Account Summary** — Same as Pre Discovery + SDR, AE, Presales names, and meeting date
- **Customer Use Case (Attio)** — 1 similar-industry customer success story from Attio CRM
- **Discovery Call One-Pager** — BANT analysis from Gong.io recording with key moments and scores
- **How to Ace the Demo** — Anthropic-powered AE + SE pointers derived from BANT, demo flow, objection prep
- **Demo Prep Assistant** — Embedded Anthropic Claude LLM for demo prep questions

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **AI**: Anthropic Claude (claude-sonnet-4-6)
- **Integrations**: G2 Intent API, Gong.io API, Attio CRM API, Factor (Bombora)

## Setup

```bash
# Install all dependencies
npm run install:all

# Copy env vars
cp .env.example .env
# Fill in your API keys

# Run development (two terminals)
npm run dev:backend   # starts Express on :3001
npm run dev:frontend  # starts Vite on :5173
```

## Environment Variables

See `.env.example` for required keys:
- `ANTHROPIC_API_KEY` — for Claude LLM sections
- `GONG_API_KEY` — for BANT analysis from call recordings
- `G2_API_KEY` — for intent signals and reviews
- `ATTIO_API_KEY` — for customer use case lookup
