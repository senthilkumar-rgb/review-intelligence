// Gong.io integration service
// Uses Gong API to fetch call recordings and extract BANT insights

async function getBANTFromRecording(recordingUrl, accountName) {
  // In production: use Gong API to fetch transcript and run NLP analysis
  // Gong API docs: https://us-66251.api.gong.io/v2
  // For demo/dev: return structured mock data

  return {
    recordingUrl,
    accountName,
    callDate: new Date().toISOString().split('T')[0],
    duration: '42 minutes',
    gongScore: 78,
    bant: {
      budget: {
        score: 8,
        confirmed: true,
        amount: '$50,000 - $120,000 annually',
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

module.exports = { getBANTFromRecording };
