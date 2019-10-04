export const getCategoryFirstPost = (allPosts, category) =>
  allPosts.nodes.find(post => post.data.category.slug === category).uid

export const blogReadTime = post =>
  Math.ceil(post.data.body.text.split(' ').length / 200)

// Reallly simple title and author matching search
export const searchBlogs = (blogs, text) => {
  return blogs.filter(blog => {
    const searchSpace = [
      ...blog.slugs[0].split('-'),
      ...blog.data.author.document[0].data.author_name.text.toLowerCase().split(' '),
      ...blog.uid.split('-'),
    ]
    return searchSpace.some(key => key.toLowerCase().includes(text.toLowerCase()))
  })
}
