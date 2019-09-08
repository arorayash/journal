// Reallly simple search
export const searchBlogs = (blogs, text) => {
  return blogs.filter(blog => {
    return blog.slugs[0].split('-').some(key => key.includes(text))
  })
}
