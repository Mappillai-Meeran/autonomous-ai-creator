const LOW_VALUE_TERMS = [
  "celebrity",
  "gossip",
  "rumor",
  "entertainment scandal"
];

function shouldPublish(topic) {
  if (!topic || !topic.title) {
    return false;
  }

  const titleLower = topic.title.toLowerCase();

  for (const term of LOW_VALUE_TERMS) {
    if (titleLower.includes(term)) {
      return false;
    }
  }

  return true;
}

module.exports = {
  shouldPublish
};
