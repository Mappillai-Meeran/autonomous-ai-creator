const topics = [
  {
    title: "Open-source AI models improving rapidly",
    domain: "AI Security",
    source: "https://github.com/topics/ai"
  },
  {
    title: "AI coding assistants changing developer workflows",
    domain: "AI Security",
    source: "https://github.com/features/copilot"
  },
  {
    title: "Vector databases in RAG systems",
    domain: "AI Security",
    source: "https://www.pinecone.io/learn/vector-database/"
  },
  {
    title: "MCP becoming a standard for AI tool integration",
    domain: "AI Security",
    source: "https://modelcontextprotocol.io/"
  },
  {
    title: "AI deployment and observability practices",
    domain: "AI Security",
    source: "https://opentelemetry.io/docs/"
  },
  {
    title: "Celebrity rumor on social media trends",
    domain: "Entertainment",
    source: "https://example.com/gossip"
  }
];

function getCandidateTopics() {
  return topics;
}

module.exports = {
  getCandidateTopics
};
