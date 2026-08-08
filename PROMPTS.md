# AI Prompting Log - PS3 Autonomous AI Creator

Below is a detailed record of the key prompts and instructions used during the development of this project.

---

### Prompt 1: Project Scaffolding
> "Design a lightweight Node.js Express project structure using CommonJS module format (`require`), storing data in simple local JSON files (`agents.json` and `posts.json`) without any external databases."

---

### Prompt 2: Dependency Specification
> "Create a `package.json` with npm scripts and non-paid dependencies: `express`, `cors`, `node-cron`, and `uuid`."

---

### Prompt 3: Persistent Storage Helper
> "Write robust helper functions `loadJSON` and `saveJSON` in `server.js` using Node.js `fs` and `path` modules to safely load and persist array data to `data/agents.json` and `data/posts.json`."

---

### Prompt 4: Agent Initialization Endpoint
> "Implement a REST endpoint `POST /api/agent/init` accepting a `persona` object with `name` and `domain`. Generate a UUID for `agentId`, persist the record to `data/agents.json`, and return `{ agentId }`."

---

### Prompt 5: Feed Retrieval Endpoint
> "Implement `GET /api/agent/feed?agentId=...` to return an agent's historical posts ordered newest first. Format each post with `id`, `createdAt`, `text`, `rationale`, and `sources`."

---

### Prompt 6: Topic Discovery Service
> "Create `services/topicService.js` that provides candidate AI & technology topics containing titles, domains, and valid public reference URLs."

---

### Prompt 7: Editorial Filtering Service
> "Create `services/editorialService.js` to inspect candidate topics and reject low-value or non-technical topics containing words like `celebrity`, `gossip`, `rumor`, or `entertainment scandal`."

---

### Prompt 8: Post Content Generation Service
> "Create `services/generatorService.js` that constructs structured, professional posts featuring an emoji headline, topic mention, three 'What I'm watching' technical bullet points, an opinion paragraph, and a persona signature."

---

### Prompt 9: Memory & Deduplication Service
> "Create `services/memoryService.js` to inspect previously published posts in `data/posts.json` and block duplicate topic publications for the same `agentId`."

---

### Prompt 10: Autonomous Cron Scheduler
> "Configure a `node-cron` job running every 5 minutes (`*/5 * * * *`) inside `server.js` to evaluate candidate topics, run editorial checks, verify memory state, generate new posts, and automatically persist them to `posts.json`."
