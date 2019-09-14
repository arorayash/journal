export const getFirstCategory = (allPosts, category) =>
  allPosts.nodes.find(post => post.data.category.slug === category).slugs[0]

export const blogReadTime = post => {
  return Math.ceil(post.data.body.text.split(' ').length / 200)
}

// Reallly simple search
export const searchBlogs = (blogs, text) => {
  return blogs.filter(blog => {
    return blog.slugs[0].split('-').some(key => key.toLowerCase().includes(text.toLowerCase()))
  })
}
