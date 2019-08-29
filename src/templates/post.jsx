import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { Layout, Listing, Wrapper, SliceZone, Title, SEO } from '../components'
import Categories from '../components/Listing/Categories'
import website from '../../config/website'

const PostWrapper = Wrapper.withComponent('main')

const BlogInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

`

const renderContent = html => {
  return {__html: html}
}

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
        <img src={blog_image.url} alt={blog_image.alt} />
        <BlogInfoWrapper>
          <h1>{title.text}</h1>
          <img src={author_image.url} alt={author_name.text} />
          <span>{`${author_name.text}, ${author_position.text}`}</span>
          <div dangerouslySetInnerHTML={{__html: body.html}} />
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
        published_on
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
