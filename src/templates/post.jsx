import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { Layout, Wrapper, SliceZone, Title, SEO } from '../components'
import Categories from '../components/Listing/Categories'
import website from '../../config/website'
import drawer from '../assets/drawer.svg'
import Sidebar from '../components/Sidebar'
import { theme } from '../styles'

const { breakpoints } = theme

const PostWrapper = styled(Wrapper.withComponent('main'))`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .blog-image {
    height: 38rem;
    object-fit: cover;
    @media (max-width: ${breakpoints.s}) {
      height: 30rem;
    }
  }
`

const BlogInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-top: 6rem;
  .author-image {
    border-radius: 50%;
    height: 2.8rem;
    width: 2.8rem;
    margin-bottom: 1rem;
  }
  .blog-meta {
    font-size: 1.4rem;
    line-height: 2rem;
    color: #808080;
  }
  @media (max-width: ${breakpoints.s}) {
    width: 100%;
  }
`

const BlogHeader = styled.div`
  height: 38rem;
  widht: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: ${breakpoints.s}) {
    height: 30rem;
  }
`

const StyledTitle = styled.h1`
  line-height: 3.4rem;
  font-weight: 600;
  font-size: 2.4rem;
  margin-bottom: 1rem;
`

const BlogContent = styled.div`
  width: 47vw;
  margin-top: 5rem;
  font-size: 1.8rem;
  line-height: 2.6rem;
  color: #333333;
  @media (max-width: ${breakpoints.s}) {
    width: 100%;
  }
`

const ImageWrapper = styled.span`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  object-fit: cover;
  .tag-wrapper {
    display: ${props => (props.hideTag ? 'none' : 'block')};
    float: left;
    position: absolute;
    line-height: 2rem;
    left: 0px;
    top: 0px;
    border-radius: 4px;
    z-index: 2;
    background-color: ${props => categoryColors[props.categorySlug].bg};
    font-size: 1.4rem;
    padding: 0.4rem 1rem;
    span {
      color: ${props => categoryColors[props.categorySlug].text};
      opacity: 0.6;
    }
  }
`

const categoryColors = {
  'engineering': {
    bg: '#FCD06E',
    text: '#1a1a1a',
  },
  'business--growth': {
    bg: '#025C52',
    text: '#f7f7f7',
  },
  'product--design': {
    bg: '#813A4C',
    text: '#ffffff',
  },
}

const DrawerIcon = styled.span`
  position: fixed;
  top: 2.8rem;
  left: 2.4rem;
  cursor: pointer;
  @media (max-width: ${breakpoints.s}) {
    display: 30rem;
  }
`

const Post = ({ data: { prismicPost, allPosts }, location, path }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const { author, blog_image, body, published_on, title, category } = prismicPost.data
  const { author_image, author_name, author_position } = author.document[0].data
  console.log({prismicPost})
  // useEffect(() => {
  //   document.addEventListener('click', e => {
  //     e.stopImmediatePropagation()
  //     console.log(e.target)
  //   })
  //   return () => {
  //     document.removeEventListener('click')
  //   };
  // }, [])
  return (
    <Sidebar allPosts={allPosts} open={showSidebar}>
      <Layout customSEO path={path}>
        <SEO
          title={`${title.text} | ${website.titleAlt}`}
          pathname={location.pathname}
          desc={title.text}
          node={prismicPost}
          article
        />
        <PostWrapper className="posts">
          <DrawerIcon onClick={() => setShowSidebar(!showSidebar)}>
            <img src={drawer} alt="drawer icon" />
          </DrawerIcon>
          <BlogHeader>
            <ImageWrapper categorySlug={category.document[0].slugs[0]} hideTag={window.innerWidth < 600}>
              <img className="blog-image" src={blog_image.url} alt={blog_image.alt} />
              <span className="tag-wrapper">
                <span>#{category.document[0].data.title.text}</span>
              </span>
            </ImageWrapper>
          </BlogHeader>
          <BlogInfoWrapper>
            <StyledTitle>{title.text}</StyledTitle>
            <img className="author-image" src={author_image.url} alt={author_name.text} />
            <span className="blog-meta">{`${author_name.text}, ${author_position.text}`}</span>
            <span className="blog-meta">{published_on}</span>
            <BlogContent dangerouslySetInnerHTML={{ __html: body.html }} />
          </BlogInfoWrapper>
        </PostWrapper>
      </Layout>
    </Sidebar>
  )
}

export default Post

Post.propTypes = {
  data: PropTypes.shape({
    prismicPost: PropTypes.object.isRequired,
    posts: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
}

// The typenames come from the slice names
// If this doesn't work for you query for __typename in body {} and GraphiQL will show them to you

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    prismicPost: prismicBlogPost(slugs: { eq: $slug }) {
      data {
        published_on(formatString: "MMM D, YYYY")
        title {
          text
        }
        body {
          html
        }
        blog_image {
          alt
          url
        }
        category {
          document {
            slugs
            data {
              title {
                text
              }
            }
          }
        }
        author {
          document {
            data {
              author_image {
                alt
                url
              }
              author_name {
                text
              }
              author_position {
                text
              }
            }
          }
        }
      }
    }
    allPosts: allPrismicBlogPost {
      nodes {
        slugs
        data {
          published_on
          author {
            document {
              data {
                author_name {
                  text
                }
              }
            }
          }
          category {
            document {
              slugs
              data {
                title {
                  text
                }
              }
            }
          }
          blog_image {
            alt
            url
          }
          title {
            text
          }
        }
      }
    }
  }
`
