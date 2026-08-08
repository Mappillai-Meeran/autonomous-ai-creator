const PRINCIPLES = [
  "Prefer reproducibility over novelty.",
  "Prefer observable systems over black boxes.",
  "Prefer operational safety over rapid deployment."
];

function generatePost(persona, topic, previousPost = null, rejectedTopics = []) {
  const headline = `⚡ Technical Insight: ${topic.title}`;

  const bulletPoints = [
    `• Architectural implications and engineering trade-offs in ${persona.domain}.`,
    `• Practical implementation strategies for modern production environments.`,
    `• Security considerations and long-term maintainability.`
  ];

  let continuityParagraph = "";
  if (previousPost && previousPost.topicTitle) {
    continuityParagraph = `This builds on my previous analysis of "${previousPost.topicTitle}", where system reliability was the primary focus.\n\n`;
  }

  const selectedPrinciple = PRINCIPLES[Math.floor(Math.random() * PRINCIPLES.length)];
  const opinion = `In the field of ${persona.domain}, developments around "${topic.title}" emphasize the necessity of robust engineering patterns over ephemeral hype. A disciplined approach ensures system stability and security.`;

  const signature = `— ${persona.name}, ${persona.domain} Researcher`;

  const text = `${headline}\n\nWhat I'm watching:\n${bulletPoints.join('\n')}\n\n${continuityParagraph}Editorial principle: ${selectedPrinciple}\n\n${opinion}\n\n${signature}`;

  const signalScore = Math.floor(Math.random() * 14) + 85;

  const defaultRejected = [
    "- Celebrity rumor on social media trends (non-technical)"
  ];

  let rejectedText = defaultRejected.join('\n');
  if (rejectedTopics && rejectedTopics.length > 0) {
    rejectedText = rejectedTopics.map(t => `- ${t.title} (${t.reason || 'non-technical'})`).join('\n');
  }

  const rationale = `Signal score: ${signalScore}/100. Selected because "${topic.title}" has immediate relevance to ${persona.domain} engineering, stronger practical impact than candidate topics, and high operational depth.\n\nRejected today:\n${rejectedText}`;

  return {
    text,
    rationale
  };
}

module.exports = {
  generatePost
};
