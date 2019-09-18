import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { TwitterIcon, LinkedinIcon } from 'react-share'
import { Layout, Wrapper, SliceZone, Title, SEO } from '../components'
import prism from '../styles/prism'
import website from '../../config/website'
import drawer from '../assets/drawer.svg'
import Sidebar from '../components/Sidebar'
import { theme } from '../styles'
import { ExternLink } from '../components/Wrappers'
import SocialShare from '../components/SocialShare'
import fallbackImage from '../assets/bg_fallback.svg'

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
  margin-top: -10.8rem;
  @media (min-width: ${breakpoints.l}) {
    max-width: 55vw;
  }
  @media (max-width: ${breakpoints.l}) {
    max-width: 55vw;
  }
  @media (max-width: ${breakpoints.md}) {
    max-width: 50vw;
  }
  @media (max-width: ${breakpoints.s}) {
    max-width: 100%;
  }
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
    margin-top: 6rem;
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
  ${prism}
  width: 47vw;
  margin-top: 5rem;
  font-size: 1.8rem;
  line-height: 2.6rem;
  color: #333333;
  border-bottom: 2px solid #cccccc;
  padding-bottom: 4rem;
  @media (max-width: ${breakpoints.s}) {
    width: 100%;
  }
  img {
    width: 100%;
  }
  div[data-oembed] {
    width: 100%;
    height: 60vh;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  blockquote {
    margin-left: 0;
    padding: 2rem 2.2rem;
    border-left: 0.2rem solid #036600;
    font-size: 2rem;
    line-height: 2.8rem;
    color: #666666;
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
  engineering: {
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
  padding: 1.1rem 0.8rem;
  background: #f4f2ee;
  z-index: 2;
  @media (max-width: ${breakpoints.s}) {
    display: 30rem;
    left: 1rem;
    top: 1.5rem;
  }
`

const AuthorBio = styled.div`
  display: flex;
  margin-top: 4rem;
  align-items: flex-start;
  width: 47vw;
  .social-icons {
    display: flex;
  }
  .author-img {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .blog-meta {
    padding: 1rem 0 0 0.5rem;
  }
  a {
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }
  img {
    height: 3.2rem;
    max-width: 7.2rem;
    border-radius: 50%;
  }
  @media (max-width: ${breakpoints.s}) {
    width: 100%;
  }
`

const Post = ({ data: { prismicPost, allPosts }, location, path }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const { author, blog_image, body, published_on, title, category } = prismicPost.data
  const { author_image, author_name, author_position, bio, linkedin, twitter } = author.document[0].data
  const categorySlug = category.document[0].slugs[0]
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
    <Sidebar allPosts={allPosts} open={showSidebar} onSetOpen={open => setShowSidebar(open)}>
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
            <ImageWrapper
              categorySlug={categorySlug}
              hideTag={typeof window !== 'undefined' && window.innerWidth < 600}
            >
              <img className="blog-image" src={blog_image.url || fallbackImage} alt={blog_image.alt} />
              <span className="tag-wrapper">
                <span>#{category.document[0].data.title.text}</span>
              </span>
            </ImageWrapper>
          </BlogHeader>
          <SocialShare title={title.text} url={location.href} />
          <BlogInfoWrapper>
            <StyledTitle>{title.text}</StyledTitle>
            <img className="author-image" src={author_image.url} alt={author_name.text} />
            <span className="blog-meta">{`${author_name.text}, ${author_position.text}`}</span>
            <span className="blog-meta">{published_on}</span>
            <BlogContent dangerouslySetInnerHTML={{ __html: body.html }} />
            <AuthorBio>
              <span className="author-img">
                <img src={author_image.url} alt={author_name.text} />
                <span className="social-icons">
                  <ExternLink target="_blank" href={linkedin && linkedin.url}>
                    <LinkedinIcon round size={15} />
                  </ExternLink>
                  <ExternLink target="_blank" href={twitter && twitter.url}>
                    <TwitterIcon round size={15} />
                  </ExternLink>
                </span>
              </span>
              <span className="blog-meta">{bio.text || `${author_name.text}, ${author_position.text}`}</span>
            </AuthorBio>
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
              bio {
                text
              }
              linkedin {
                url
              }
              twitter {
                url
              }
            }
          }
        }
      }
    }
    allPosts: allPrismicBlogPost(sort: { order: DESC, fields: data___published_on }) {
      nodes {
        slugs
        data {
          published_on
          body {
            text
          }
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
