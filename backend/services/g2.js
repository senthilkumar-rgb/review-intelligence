// G2 + Bombora (Factor.io) intent signals service

async function getIntentSignals(accountName) {
  // In production: use G2 Buyer Intent API and Factor.io/Bombora APIs
  // For demo/dev: return structured mock data

  return {
    signals: [
      {
        source: 'G2',
        topic: 'Test Automation Platforms',
        intent: 'High',
        date: '2026-05-01',
        location: 'San Francisco, CA',
        details: 'Multiple employees viewed Testsigma vs Katalon comparison pages',
        pageViews: 14
      },
      {
        source: 'G2',
        topic: 'QA Automation Tools',
        intent: 'High',
        date: '2026-04-28',
        location: 'Austin, TX',
        details: 'Viewed pricing page and competitor alternatives',
        pageViews: 8
      },
      {
        source: 'Factor',
        topic: 'Continuous Testing',
        intent: 'Medium',
        date: '2026-04-25',
        location: 'Bangalore, India',
        details: 'Surge in research on CI/CD pipeline integration with testing tools',
        pageViews: 22
      },
      {
        source: 'G2',
        topic: 'Selenium Alternatives',
        intent: 'Medium',
        date: '2026-04-20',
        location: 'New York, NY',
        details: 'Researching codeless test automation options',
        pageViews: 6
      },
      {
        source: 'Factor',
        topic: 'Test Management Software',
        intent: 'Low',
        date: '2026-04-15',
        location: 'London, UK',
        details: 'General browsing on test management and reporting tools',
        pageViews: 3
      }
    ],
    summary: {
      overallIntentScore: 82,
      trending: 'Increasing',
      hotTopics: ['Selenium Migration', 'Codeless Automation', 'CI/CD Integration'],
      locations: ['San Francisco, CA', 'Austin, TX', 'Bangalore, India']
    }
  };
}

async function getReviews(accountName) {
  // In production: scrape/fetch G2 reviews for competitor products the account might be using
  // For demo/dev: return structured mock data of competitor reviews

  return {
    competitor: 'Current Testing Tool (Selenium/Manual)',
    reviews: [
      {
        id: 1,
        rating: 1,
        title: 'Maintenance nightmare as app grows',
        content: 'We spend more time maintaining our Selenium scripts than actually writing new tests. Every UI change breaks 30+ tests. The team morale is at an all-time low because of this.',
        author: 'QA Lead',
        date: '2026-03-15',
        helpful: 47,
        source: 'G2'
      },
      {
        id: 2,
        rating: 2,
        title: 'Slow execution kills our CI/CD pipeline',
        content: 'Our full regression suite takes 6 hours to run. We cannot run it on every PR. We end up catching bugs late in the cycle which is very costly to fix.',
        author: 'Senior QA Engineer',
        date: '2026-02-28',
        helpful: 38,
        source: 'G2'
      },
      {
        id: 3,
        rating: 2,
        title: 'No real support for cross-browser testing',
        content: 'Setting up cross-browser testing grids is a full-time job in itself. We need dedicated DevOps just to maintain the infrastructure for running tests in parallel.',
        author: 'Automation Engineer',
        date: '2026-02-10',
        helpful: 31,
        source: 'G2'
      },
      {
        id: 4,
        rating: 2,
        title: 'Non-technical team members cannot contribute',
        content: 'Only our 3 senior automation engineers can write tests. Product managers, business analysts - nobody else can contribute. It creates a huge bottleneck.',
        author: 'QA Manager',
        date: '2026-01-22',
        helpful: 29,
        source: 'G2'
      },
      {
        id: 5,
        rating: 3,
        title: 'Reporting is primitive',
        content: 'The test reports are just pass/fail logs. No trend analysis, no insights on flaky tests, no visibility for management on test coverage. We have to build our own dashboards.',
        author: 'Engineering Manager',
        date: '2026-01-08',
        helpful: 24,
        source: 'G2'
      }
    ]
  };
}

module.exports = { getIntentSignals, getReviews };
