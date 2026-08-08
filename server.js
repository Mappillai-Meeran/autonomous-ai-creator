const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const { getCandidateTopics } = require('./services/topicService');
const { shouldPublish } = require('./services/editorialService');
const { generatePost } = require('./services/generatorService');
const { hasBeenPublished, getLatestPost } = require('./services/memoryService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const AGENTS_FILE = path.join(__dirname, 'data', 'agents.json');
const POSTS_FILE = path.join(__dirname, 'data', 'posts.json');

function loadJSON(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
}

function saveJSON(filePath, data) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error saving ${filePath}:`, err);
  }
}

app.post('/api/agent/init', (req, res) => {
  const { persona } = req.body;
  if (!persona || !persona.name || !persona.domain) {
    return res.status(400).json({ error: 'persona object with name and domain is required.' });
  }

  const agentId = uuidv4();
  const agents = loadJSON(AGENTS_FILE);

  const newAgent = {
    agentId,
    persona,
    createdAt: new Date().toISOString()
  };

  agents.push(newAgent);
  saveJSON(AGENTS_FILE, agents);

  setImmediate(() => {
    runAutonomousPublisher();
  });

  return res.status(200).json({ agentId });
});

app.get('/api/agent/feed', (req, res) => {
  const { agentId } = req.query;
  if (!agentId) {
    return res.status(400).json({ error: 'agentId query parameter is required.' });
  }

  const posts = loadJSON(POSTS_FILE);
  const agentPosts = posts.filter((p) => p.agentId === agentId);

  agentPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const formattedPosts = agentPosts.map((p) => ({
    id: p.id,
    createdAt: p.createdAt,
    text: p.text,
    rationale: p.rationale,
    sources: p.sources
  }));

  return res.status(200).json({ posts: formattedPosts });
});

function runAutonomousPublisher() {
  const agents = loadJSON(AGENTS_FILE);
  if (agents.length === 0) {
    return;
  }

  const posts = loadJSON(POSTS_FILE);
  const candidateTopics = getCandidateTopics();

  for (const agent of agents) {
    const rejectedTopics = [];
    let selectedTopic = null;

    for (const topic of candidateTopics) {
      if (!shouldPublish(topic)) {
        rejectedTopics.push({ title: topic.title, reason: 'failed editorial check (non-technical / low-value)' });
        continue;
      }

      if (hasBeenPublished(posts, agent.agentId, topic.title)) {
        continue;
      }

      selectedTopic = topic;
      break;
    }

    if (selectedTopic) {
      const previousPost = getLatestPost(posts, agent.agentId);
      const generated = generatePost(agent.persona, selectedTopic, previousPost, rejectedTopics);

      const newPost = {
        id: `p-${uuidv4().substring(0, 8)}`,
        agentId: agent.agentId,
        topicTitle: selectedTopic.title,
        createdAt: new Date().toISOString(),
        text: generated.text,
        rationale: generated.rationale,
        sources: [selectedTopic.source]
      };

      posts.push(newPost);
      saveJSON(POSTS_FILE, posts);
      console.log(`[Autonomous Publisher] Published new post for Agent ${agent.agentId}: "${selectedTopic.title}"`);
    }
  }
}

cron.schedule('*/5 * * * *', () => {
  runAutonomousPublisher();
});

app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`Autonomous AI Creator API Server running on port ${PORT}`);
  console.log(`Endpoint 1: POST http://localhost:${PORT}/api/agent/init`);
  console.log(`Endpoint 2: GET  http://localhost:${PORT}/api/agent/feed?agentId=<ID>`);
  console.log('====================================================');
  runAutonomousPublisher();
});
