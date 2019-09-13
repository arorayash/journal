export const getFirstCategory = (allPosts, category) =>
  allPosts.nodes.find(post => post.data.category.slug === category).slugs[0]
