import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { Layout, Wrapper, SliceZone, Title, SEO } from '../components'
import Categories from '../components/Listing/Categories'
import website from '../../config/website'

const PostWrapper = styled(Wrapper.withComponent('main'))`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .blog-image {
    height: 38rem;
  }
`

const BlogInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  .blog-image {
    height: 38rem;
    width: fit-content;
  }
  .author-image {
    border: 50%;
    height: 2.8rem;
    width: 2.8rem;
  }
  .blog-meta {
    font-size: 1.4rem;
    line-height: 2rem;
    color: #808080;
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
`

const Post = ({ data: { prismicPost }, location }) => {
  console.log(prismicPost.data)
  const { author, blog_image, body, published_on, title } = prismicPost.data
  const { author_image, author_name, author_position } = author.document[0].data
  return (
    <Layout customSEO>
      <SEO
        title={`${title.text} | ${website.titleAlt}`}
        pathname={location.pathname}
        desc={title.text}
        node={prismicPost}
        article
      />
      <PostWrapper>
        <img className="blog-image" src={blog_image.url} alt={blog_image.alt} />
        <BlogInfoWrapper>
          <StyledTitle>{title.text}</StyledTitle>
          <img className="author-image" src={author_image.url} alt={author_name.text} />
          <span className="blog-meta">{`${author_name.text}, ${author_position.text}`}</span>
          <span className="blog-meta">{published_on}</span>
          <BlogContent dangerouslySetInnerHTML={{__html: body.html}} />
        </BlogInfoWrapper>
      </PostWrapper>
      {/* <PostWrapper id={website.skipNavId}>
        <SliceZone allSlices={data.body} />
        <Title style={{ marginTop: '4rem' }}>Recent posts</Title>
        <Listing posts={posts.nodes} />
      </PostWrapper> */}
    </Layout>
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
  }
`
