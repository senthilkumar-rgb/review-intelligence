// Attio CRM integration service

async function getUseCaseByIndustry(industry) {
  // In production: query Attio CRM API for won deals in the same industry
  // Attio API: https://api.attio.com/v2
  // For demo/dev: return structured mock use case data

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

module.exports = { getUseCaseByIndustry };
