function hasBeenPublished(posts, agentId, topicTitle) {
  if (!Array.isArray(posts)) {
    return false;
  }

  return posts.some((post) => {
    return (
      post.agentId === agentId &&
      post.topicTitle === topicTitle
    );
  });
}

function getLatestPost(posts, agentId) {
  if (!Array.isArray(posts)) {
    return null;
  }

  const agentPosts = posts.filter((p) => p.agentId === agentId);
  if (agentPosts.length === 0) {
    return null;
  }

  agentPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return agentPosts[0];
}

module.exports = {
  hasBeenPublished,
  getLatestPost
};
