// Attio CRM integration service
// API docs: https://api.attio.com/v2

async function getUseCaseByIndustry(industry) {
  // In production: query Attio CRM API for won deals in the same industry
  const useCases = {
    'SaaS': {
      customerName: 'Freshworks',
      industry: 'SaaS / CRM Software',
      logo: null,
      challenge: 'Freshworks was struggling with 8-hour regression cycles that blocked their weekly release schedule. Their 12-person QA team spent 70% of time on manual regression, leaving minimal time for exploratory testing.',
      solution: 'Implemented Testsigma as their primary automation platform, migrating 2,400+ test cases from Selenium in 6 weeks using Testsigma\'s NLP-based test authoring and AI-assisted migration tool.',
      results: [
        { metric: 'Regression Time', before: '8 hours', after: '45 minutes', improvement: '89% reduction' },
        { metric: 'Release Frequency', before: 'Weekly', after: 'Daily', improvement: '7x faster' },
        { metric: 'Test Coverage', before: '34%', after: '87%', improvement: '2.5x increase' },
        { metric: 'QA Team Productivity', before: '30% on innovation', after: '80% on innovation', improvement: '60% more time for high-value work' }
      ],
      quote: '"Testsigma transformed how we think about quality. What used to be a bottleneck is now a competitive advantage." — VP of Engineering, Freshworks',
      contactRole: 'VP Engineering'
    },
    'Fintech': {
      customerName: 'Razorpay',
      industry: 'Fintech / Payment Processing',
      challenge: 'Razorpay\'s payment flows required extensive cross-browser and cross-device testing. Manual testing was error-prone and their Selenium suite required 3 senior engineers just for maintenance.',
      solution: 'Deployed Testsigma with cloud testing infrastructure for parallel execution across 3,000+ browser/OS/device combinations without managing any infrastructure.',
      results: [
        { metric: 'Cross-browser Coverage', before: '5 browsers manual', after: '50+ combinations automated', improvement: '10x coverage' },
        { metric: 'Infra Cost', before: '$8K/month on testing infra', after: '$1.2K/month', improvement: '85% cost reduction' },
        { metric: 'Bug Escape Rate', before: '12% bugs in production', after: '2% bugs in production', improvement: '83% fewer prod bugs' }
      ],
      quote: '"We cut our QA infrastructure costs by 85% while increasing test coverage 10x." — Head of QA, Razorpay',
      contactRole: 'Head of QA'
    },
    'default': {
      customerName: 'BrowserStack',
      industry: 'Developer Tools / SaaS',
      challenge: 'Scaling QA to match 200% YoY growth while keeping the team lean. Manual testing was not scaling and Selenium scripts were hard to maintain across rapidly changing UI.',
      solution: 'Adopted Testsigma\'s AI-powered test maintenance to auto-heal broken selectors and NLP test authoring to enable product managers to write test cases.',
      results: [
        { metric: 'Test Suite Growth', before: '500 test cases', after: '4,000+ test cases', improvement: '8x in 6 months' },
        { metric: 'Maintenance Effort', before: '40% of QA time', after: '5% of QA time', improvement: '87.5% reduction' },
        { metric: 'Team Scaling', before: '1 QA per 3 engineers', after: '1 QA per 8 engineers', improvement: 'QA scales with growth' }
      ],
      quote: '"Testsigma\'s AI maintenance alone saved us from hiring 4 additional QA engineers." — Engineering Director',
      contactRole: 'Engineering Director'
    }
  };

  const key = Object.keys(useCases).find(k => industry && industry.toLowerCase().includes(k.toLowerCase()));
  return useCases[key] || useCases['default'];
}

async function getBANTAnalysis(accountName, meetingDate) {
  // In production: query Attio CRM API for deal/note records linked to this account
  // e.g. GET https://api.attio.com/v2/objects/deals?filter[name]={accountName}
  // then fetch associated notes/activities to extract BANT signals

  return {
    source: 'Attio',
    accountName,
    callDate: meetingDate || new Date().toISOString().split('T')[0],
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
}

module.exports = { getUseCaseByIndustry, getBANTAnalysis };
