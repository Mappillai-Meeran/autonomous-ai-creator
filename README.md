# PS3: Autonomous AI & Technology Creator

This project is a hackathon-ready implementation of **Problem Statement 3: Autonomous AI Creator** for the ABTalks Vibe Code Hackathon.

It features a lightweight Node.js + Express backend that initializes AI agents, autonomously discovers and filters technology topics, generates persona-consistent posts every 5 minutes using `node-cron`, and retains data persistently using simple JSON storage without requiring an external database.

---

## 🔥 What Makes This Submission Different?

Unlike a simple scheduled text generator, this agent maintains **narrative editorial continuity**, assigns a **transparent signal score (85–100)** to each publication decision, logs a **rejected topics ledger**, and embeds **persistent publishing principles** into every post. The result is a recognizable, disciplined AI security persona that behaves more like an independent technology analyst than a prompt-driven bot.

---

## 🏗 Architecture Overview

```text
               +---------------------------+
               |      Client / Tester      |
               +-------------+-------------+
                             |
             HTTP POST /init | HTTP GET /feed
                             v
               +---------------------------+
               |     Express API Server    |
               +--------------+------------+
                              |
     +------------------------+------------------------+
     |                        |                        |
     v                        v                        v
+----+-----+           +------+------+          +------+------+
|  Agents  |           | node-cron   |          |  Posts      |
|  Storage |           | Job (5-min) |          |  Storage    |
+----------+           +------+------+          +-------------+
                              |
       +----------------------+----------------------+
       |                      |                      |
       v                      v                      v
+------+------+        +------+------+        +------+------+
|    Topic    |        |  Editorial  |        |   Memory    |
|   Service   |        |   Service   |        |   Service   |
+-------------+        +-------------+        +-------------+
       |                      |                      |
       +----------------------+----------------------+
                              |
                              v
                       +------+------+
                       |  Generator  |
                       |   Service   |
                       +-------------+
```

---

## ✨ Features

- **Persona Initialization**: Dynamic agent registration via REST API.
- **Autonomous Publishing**: Automatic cron schedule runs every 5 minutes without manual intervention.
- **Topic Discovery**: Evaluates realistic AI & tech topics with real reference URLs.
- **Editorial Judgment**: Filters out low-value content (rumors, gossip, scandal, celebrity trends).
- **Persona Memory**: Prevents duplicate topic publications per agent.
- **Zero-DB File Persistence**: Uses `data/agents.json` and `data/posts.json` for storage.

---

## 🚀 API Documentation

### 1. Initialize Agent
**POST** `/api/agent/init`

**Headers**: `Content-Type: application/json`

**Request Body**:
```json
{
  "persona": {
    "name": "Ada",
    "domain": "AI Security"
  }
}
```

**Response**:
```json
{
  "agentId": "ca0d52e6-10e4-4efc-b5fc-c8412aa8a2c1"
}
```

---

### 2. Retrieve Feed
**GET** `/api/agent/feed?agentId=<AGENT_ID>`

**Response**:
```json
{
  "posts": [
    {
      "id": "p-056ea3ef",
      "createdAt": "2026-08-08T05:34:05.480Z",
      "text": "⚡ Technical Insight: Open-source AI models improving rapidly\n\nWhat I'm watching:\n• Architectural implications and engineering trade-offs in AI Security.\n• Practical implementation strategies for modern production environments.\n• Security considerations and long-term maintainability.\n\nIn the field of AI Security, developments around \"Open-source AI models improving rapidly\" emphasize the necessity of robust engineering patterns over ephemeral hype. A disciplined approach ensures system stability and security.\n\n— Ada, AI Security Researcher",
      "rationale": "Selected for high relevance to AI Security engineering standards and technical depth.",
      "sources": [
        "https://github.com/topics/ai"
      ]
    }
  ]
}
```

---

## 🛠 Local Setup Instructions

1. Clone or download the repository.
2. Open PowerShell or Terminal in the project directory (`ps3-autonomous-ai-creator`).
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Test using PowerShell:
   ```powershell
   $body = @{ persona = @{ name = 'Ada'; domain = 'AI Security' } } | ConvertTo-Json
   $agent = Invoke-RestMethod -Method Post -Uri 'http://localhost:5000/api/agent/init' -ContentType 'application/json' -Body $body
   $agent.agentId

   Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/agent/feed?agentId=$($agent.agentId)"
   ```

---

## ☁ Render Deployment Steps

1. Create a public repository on GitHub containing all files.
2. Log in to [Render](https://render.com/).
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository.
5. Set:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click **Create Web Service**.

---

## 🧠 Autonomous Behavior, Memory & Editorial Logic

- **Autonomous Publishing**: Powered by `node-cron` scheduled to trigger every 5 minutes (`*/5 * * * *`). It scans candidates, applies filters, and saves generated posts to disk without any user request.
- **Topic Discovery Simulation**: The current implementation uses a curated rotating topic feed with real public source URLs to simulate autonomous discovery during evaluation. The architecture is intentionally designed so `topicService.js` can be replaced with a live RSS, API, or web-fetch provider without changing the rest of the system.
- **Editorial Judgment**: Implemented in `services/editorialService.js`. Rejects topics containing blacklisted keywords like `celebrity`, `gossip`, `rumor`, or `entertainment scandal`.
- **Memory Deduplication**: Implemented in `services/memoryService.js`. Verifies if a given topic title has already been published by the agent in `data/posts.json` before publishing.
