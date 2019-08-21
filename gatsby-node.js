const _ = require('lodash')

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = require.resolve('./src/templates/post.jsx')
  const categoryTemplate = require.resolve('./src/templates/category.jsx')

  const result = await wrapper(
    graphql(`
      {
        allPrismicBlogPost {
          edges {
            node {
              id
              uid
              data {
                blog_image {
                  url
                  alt
                  copyright
                }
                body {
                  html
                }
                title {
                  text
                }
              }
            }
          }
        }
        categories: allPrismicCategory {
          edges {
            node {
              data {
                tag
              }
            }
          }
        }
      }
    `)
  )

  const categorySet = new Set()
  console.log(result)
  const postsList = result.data.allPrismicBlogPost.edges

  // Double check that the post has a category assigned
  postsList.forEach(edge => {
    console.log(edge)
    if (edge.node.data.categories.category.tag.text) {
      edge.node.data.categories.forEach(cat => {
        categorySet.add(cat.category.document[0].data.name)
      })
    }

    // The uid you assigned in Prismic is the slug!
    createPage({
      path: `/${edge.node.uid}`,
      component: postTemplate,
      context: {
        // Pass the unique ID (uid) through context so the template can filter by it
        uid: edge.node.uid,
      },
    })
  })

  const categoryList = Array.from(categorySet)

  categoryList.forEach(category => {
    createPage({
      path: `/categories/${_.kebabCase(category)}`,
      component: categoryTemplate,
      context: {
        category,
      },
    })
  })
}
