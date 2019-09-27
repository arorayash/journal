import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { TwitterIcon, LinkedinIcon } from 'react-share'
import { Layout, Wrapper, SliceZone, Title, SEO } from '../components'
import { BlogCard, Featured } from '../components/Listing'
import prism from '../styles/prism'
import website from '../../config/website'
import drawer from '../assets/drawer.svg'
import Sidebar from '../components/Sidebar'
import { theme } from '../styles'
import BlogTag from '../components/Tag'
import { ExternLink, SectionTitle } from '../components/Wrappers'
import SocialShare from '../components/SocialShare'
import SectionNav from '../components/SectionNav'
import fallbackImage from '../assets/bg_fallback.svg'

const { breakpoints } = theme

const PostWrapper = styled(Wrapper.withComponent('main'))`
  .blog-image {
    height: 38rem;
    object-fit: cover;
    @media (max-width: ${breakpoints.s}) {
      height: 30rem;
    }
  }

  .blog-meta {
    font-size: 1.4rem;
    line-height: 2rem;
    color: #808080;
  }
`

const BlogInfoWrapper = styled.div`
  .author-image {
    border-radius: 50%;
    height: 2.8rem;
    width: 2.8rem;
    margin-bottom: 1rem;
  }
  @media (max-width: ${breakpoints.s}) {
    width: 100%;
    margin-top: 6rem;
  }
`

const BlogHeader = styled.div`
  height: 38rem;
  widht: 100%;
  @media (max-width: ${breakpoints.s}) {
    height: 30rem;
  }
`

const StyledTitle = styled.h1`
  margin-bottom: 0;
`

const BlogContent = styled.div`
  ${prism}
  font-size: 1.8rem;
  line-height: 2.6rem;
  img {
    width: 100%;
  }
  figure {
    margin-bottom: 2rem;
  }
  figcaption {
    margin-top: 1rem;
    font-size: 1.4rem;
    line-height: 1.7rem;
    color: #666666;
  }
  div[data-oembed] {
    width: 100%;
    height: 60vh;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  pre {
    background: #f7f7f7;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    color: #333333;
    padding: 2rem;
    font-family: Source Code Pro;
    line-height: 2rem;
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
    left: 1rem;
    top: 1.5rem;
  }
`

const TagWrapper = styled.div`
  display: flex;
  &:empty {
    display: none;
  }
`

const AuthorBio = styled.div`
  display: flex;
  .author-img {
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      border: 1px solid black;
    }
  }
  .blog-meta {
    padding: 1rem 0 0 0.5rem;
  }
  img {
    height: 3.2rem;
    max-width: 7.2rem;
    border-radius: 50%;
  }
`

const RelatedWrapper = styled.div``

const filterRelatedPosts = (allPosts, categorySlug, blogSlug) => {
  return allPosts
    .filter(
      post =>
        post.data.category.document[0].slugs[0] === categorySlug &&
        post.slugs[0] !== blogSlug
    )
    .slice(0, 2)
}

const Post = ({ data: { prismicPost, allPosts }, location, path }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [headers, setHeaders] = useState([])

  useEffect(() => {
    const content = document.querySelector('.blog-content')
    const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6')
    setHeaders(headings)
    console.log(headings)
  }, [])

  const blogTags = prismicPost.tags
  const blogSlug = prismicPost.slugs[0]
  const {
    author,
    blog_image,
    preview_image,
    body,
    published_on,
    title,
    category,
    description,
  } = prismicPost.data
  const {
    author_image,
    author_name,
    author_position,
    bio,
    linkedin,
    twitter,
  } = author.document[0].data
  const categorySlug = category.document[0].slugs[0]
  const categoryTitle = category.document[0].data.title.text
  const relatedPosts = filterRelatedPosts(
    allPosts.nodes,
    categorySlug,
    blogSlug
  )
  return (
    <Sidebar
      allPosts={allPosts}
      open={showSidebar}
      setShowSidebar={setShowSidebar}
      onSetOpen={open => setShowSidebar(open)}>
      <Layout customSEO path={path}>
        <SEO
          title={`${title.text} | ${website.titleAlt}`}
          pathname={location.pathname}
          desc={description}
          banner={preview_image.url || blog_image.url}
          node={prismicPost}
          article
        />
        <DrawerIcon onClick={() => setShowSidebar(!showSidebar)}>
          <img src={drawer} alt="drawer icon" />
        </DrawerIcon>
        <SectionNav path={path} headings={[...headers]} />
        <div className="o-container u-margin-bottom-xlarge">
          <PostWrapper className="posts o-layout">
            <BlogHeader className="o-layout_item u-6/6@from-medium">
              <ImageWrapper
                categorySlug={categorySlug}
                hideTag={
                  typeof window !== 'undefined' && window.innerWidth < 600
                }>
                <img
                  className="blog-image"
                  src={blog_image.url || fallbackImage}
                  alt={blog_image.alt}
                />
              </ImageWrapper>
            </BlogHeader>
            <div className="o-layout">
              <div className="o-layout_item u-1/6@from-medium u-margin-vertical-large">
                <div className="blog-meta">{author_name.text}</div>
                <div className="blog-meta">{published_on}</div>
              </div>
              <StyledTitle className="o-layout_item u-4/6@from-medium u-margin-vertical-large">
                {title.text}
              </StyledTitle>
            </div>

            <BlogInfoWrapper className="o-layout u-margin-bottom-large">
              <SocialShare
                className="o-layout_item u-1/6@from-medium u-margin-bottom-large"
                title={title.text}
                url={location.href}
                authorTwitter={twitter}
              />
              <BlogContent
                className="blog-content o-layout_item u-4/6@from-medium u-margin-bottom-large"
                dangerouslySetInnerHTML={{ __html: body.html }}
              />
              <div className="o-layout -flex -center">
                <div className="o-layout_item -middle u-4/6@from-medium">
                  <TagWrapper>
                    {blogTags.map(tag => (
                      <BlogTag text={tag} />
                    ))}
                  </TagWrapper>
                  <hr className="u-margin-vertical-small" />
                  <AuthorBio>
                    <span className="author-img">
                      <span className="social-icons">
                        <ExternLink
                          target="_blank"
                          href={linkedin && linkedin.url}>
                          <img src={author_image.url} alt={author_name.text} />
                        </ExternLink>
                      </span>
                    </span>
                    <span className="blog-meta">
                      {bio.text ||
                        `${author_name.text}, ${author_position.text}`}
                    </span>
                  </AuthorBio>
                </div>
              </div>
            </BlogInfoWrapper>
          </PostWrapper>
          {relatedPosts.length > 0 && (
            <RelatedWrapper className="o-layout_item u-6/6@from-medium u-margin-top-large">
              <SectionTitle className="u-margin-bottom-small">
                Related in {categoryTitle}
              </SectionTitle>
              <div className="posts o-layout -gutter">
                {relatedPosts.map(post => (
                  <BlogCard
                    post={post}
                    className="o-layout_item u-3/6@from-medium"
                  />
                ))}
              </div>
            </RelatedWrapper>
          )}
        </div>
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
      tags
      last_publication_date
      slugs
      data {
        published_on(formatString: "MMM D, YYYY")
        description
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
        preview_image {
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
    allPosts: allPrismicBlogPost(
      sort: { order: DESC, fields: data___published_on }
    ) {
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
