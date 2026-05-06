const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const claudeService = require('./services/claude');
const g2Service = require('./services/g2');
const attioService = require('./services/attio');
const reviewsData = require('./data/sample_reviews.json');

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend static files in production
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// --- Pre Discovery Endpoints ---

app.post('/api/account-summary', async (req, res) => {
  try {
    const { accountName, companyUrl } = req.body;
    const data = await claudeService.getAccountSummary(accountName, companyUrl);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/intent-signals', async (req, res) => {
  try {
    const { accountName } = req.body;
    const data = await g2Service.getIntentSignals(accountName);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { accountName } = req.body;
    const data = await g2Service.getReviews(accountName);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/painpoints', async (req, res) => {
  try {
    const { accountName, reviews } = req.body;
    const data = await claudeService.analyzePainpoints(accountName, reviews);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/icp-contacts', async (req, res) => {
  try {
    const { accountName, companyUrl } = req.body;
    const data = await claudeService.getICPContacts(accountName, companyUrl);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/cold-outreach', async (req, res) => {
  try {
    const { accountName, contacts, reviews } = req.body;
    const data = await claudeService.generateColdOutreach(accountName, contacts, reviews);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/ace-discovery', async (req, res) => {
  try {
    const { accountName, companyUrl } = req.body;
    const data = await claudeService.getDiscoveryQuestions(accountName, companyUrl);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Post Discovery Endpoints ---

app.post('/api/bant-analysis', async (req, res) => {
  try {
    const { accountName, meetingDate } = req.body;
    const data = await attioService.getBANTAnalysis(accountName, meetingDate);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/attio-usecase', async (req, res) => {
  try {
    const { industry } = req.body;
    const data = await attioService.getUseCaseByIndustry(industry);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/ace-demo', async (req, res) => {
  try {
    const { bant, accountName } = req.body;
    const data = await claudeService.getDemoPointers(bant, accountName);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- Shared LLM Chat Endpoint ---

app.post('/api/chat', async (req, res) => {
  try {
    const { message, context, history } = req.body;
    const data = await claudeService.chat(message, context, history);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Catch-all for frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Review Intelligence server running on port ${PORT}`));
