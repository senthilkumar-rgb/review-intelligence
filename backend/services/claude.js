const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = 'claude-sonnet-4-6';

async function getAccountSummary(accountName, companyUrl) {
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `You are a B2B sales intelligence assistant. Provide a concise account summary for ${accountName} (${companyUrl}).

Return a JSON object with these exact keys:
{
  "overview": "2-3 sentence quick overview of the company",
  "industry": "specific industry vertical",
  "owner": "likely account owner/champion title",
  "lastConversation": "summary of typical last touchpoint or 'No previous interaction found'",
  "employeeCount": "approximate employee count range",
  "founded": "year founded",
  "headquarters": "HQ location"
}

Respond ONLY with valid JSON.`
    }]
  });
  return JSON.parse(msg.content[0].text);
}

async function analyzePainpoints(accountName, reviews) {
  const reviewText = reviews.map(r => `Rating: ${r.rating}/5\n${r.content}`).join('\n\n');
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Analyze these customer reviews for ${accountName} and identify technical pain points, then map Testsigma USPs to each pain point.

Reviews:
${reviewText}

Return JSON:
{
  "painpoints": [
    { "title": "Pain Point Name", "description": "Details", "frequency": "High/Medium/Low", "testsigmaUSP": "How Testsigma solves this" }
  ]
}

Respond ONLY with valid JSON.`
    }]
  });
  return JSON.parse(msg.content[0].text);
}

async function getICPContacts(accountName, companyUrl) {
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Generate realistic ICP contacts for ${accountName} (${companyUrl}) who would be involved in a test automation purchase decision.

Return JSON:
{
  "contacts": [
    {
      "name": "Full Name",
      "title": "Job Title",
      "role": "Champion/Decision Maker/Influencer/End User",
      "email": "firstname.lastname@company.com",
      "linkedin": "linkedin.com/in/handle",
      "painPoint": "Their specific pain point",
      "priority": "High/Medium/Low"
    }
  ]
}

Include 4-5 contacts. Respond ONLY with valid JSON.`
    }]
  });
  return JSON.parse(msg.content[0].text);
}

async function generateColdOutreach(accountName, contacts, reviews) {
  const topReview = reviews[0]?.content || 'Common test automation challenges';
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `Generate personalized cold outreach for each contact at ${accountName}. Use insights from their customer reviews to make each email relevant.

Top review insight: "${topReview}"

Contacts: ${JSON.stringify(contacts.map(c => ({ name: c.name, title: c.title, role: c.role, painPoint: c.painPoint })))}

Return JSON:
{
  "outreach": [
    {
      "contactName": "Name",
      "contactTitle": "Title",
      "email": {
        "subject": "Email subject line",
        "body": "Full email body 3-4 paragraphs"
      },
      "callScript": {
        "opener": "Phone call opener sentence",
        "valueProposition": "Key value prop for this role",
        "discoveryQuestion": "One key discovery question",
        "objectionHandle": "Common objection + handle"
      },
      "reviewConnection": "How this outreach connects to the review insights"
    }
  ]
}

Respond ONLY with valid JSON.`
    }]
  });
  return JSON.parse(msg.content[0].text);
}

async function getDiscoveryQuestions(accountName, companyUrl) {
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `You are a Gong-certified sales coach. Generate discovery call questions for ${accountName} that will achieve a 10/10 BANT score based on Gong's intro call qualification criteria.

Gong's BANT scoring criteria:
- Budget: Uncover budget range, approval process, current spend on testing tools
- Authority: Identify decision makers, buying committee, procurement process
- Need: Quantify pain, understand urgency, tie to business outcomes
- Timeline: Uncover project timelines, triggers, competitors being evaluated

Return JSON:
{
  "bantQuestions": {
    "budget": [
      { "question": "Question text", "gongTip": "Why this scores high in Gong", "followUp": "Follow-up if they answer vaguely" }
    ],
    "authority": [ ... ],
    "need": [ ... ],
    "timeline": [ ... ]
  },
  "callStructure": {
    "intro": "How to open the call (2-3 sentences)",
    "agenda": "Suggested agenda to share",
    "closingMove": "How to close for next steps"
  },
  "gongScoreTips": ["Tip 1 to maximize Gong score", "Tip 2", "Tip 3"]
}

Respond ONLY with valid JSON.`
    }]
  });
  return JSON.parse(msg.content[0].text);
}

async function getDemoPointers(bant, accountName) {
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `You are a sales enablement expert. Based on the BANT analysis from the discovery call with ${accountName}, give specific pointers for the AE and SE to ace the demo.

BANT Analysis:
${JSON.stringify(bant, null, 2)}

Return JSON:
{
  "aePointers": [
    { "area": "Area name", "pointer": "Specific action/talking point", "priority": "High/Medium" }
  ],
  "sePointers": [
    { "area": "Technical area", "pointer": "Demo flow recommendation", "priority": "High/Medium" }
  ],
  "demoFlow": [
    { "step": 1, "title": "Section title", "duration": "X min", "focus": "What to show/say" }
  ],
  "mustAddressObjections": ["Objection 1", "Objection 2"],
  "winTheme": "The single most compelling win theme for this account"
}

Respond ONLY with valid JSON.`
    }]
  });
  return JSON.parse(msg.content[0].text);
}

async function chat(message, context, history = []) {
  const systemPrompt = `You are Review Intelligence, an AI assistant for Testsigma's sales team. You have deep knowledge of test automation, Testsigma's product, and B2B SaaS sales. Context: ${JSON.stringify(context)}`;

  const messages = [
    ...history.map(h => ({ role: h.role, content: h.content })),
    { role: 'user', content: message }
  ];

  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: systemPrompt,
    messages
  });

  return { response: msg.content[0].text };
}

module.exports = { getAccountSummary, analyzePainpoints, getICPContacts, generateColdOutreach, getDiscoveryQuestions, getDemoPointers, chat };
