import React from 'react'
import styled from '@emotion/styled'
import { StyledLink } from '../Wrappers'

const CardWrapper = styled.div`
  display: flex;
  text-decoration: none;
  flex-wrap: wrap;
  flex: 1 0 48%;
  max-width: 50%;
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px;
  .post-title {
    font-size: 2.4rem;
    line-height: 2.9rem;
    font-weight: 600;
    margin-top: 2rem;
    color: #1a1a1a;
    border-bottom: 0.2rem solid #e5e5e5;
    width: fit-content;
  }
  .post-info {
    color: #808080;
    font-size: 1.4rem;
    line-height: 2rem;
    margin-top: 0.5rem;
  }
  &:hover {
    .post-title {
      border-bottom: 0.2rem solid #1a1a1a;
    }
  }
`

const ImageWrapper = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  img {
    height: 28rem;
  }
  .tag-wrapper {
    border: 1px solid #fcd06e;
    float: left;
    position: absolute;
    left: 0px;
    bottom: 0px;
    border-radius: 4px;
    z-index: 2;
    background-color: #fcd06e;
    font-size: 1.4rem;
    line-height: 1rem;
    padding: 1rem 0.4rem;
    span {
      color: #1a1a1a;
      opacity: 0.6;
    }
  }
`

const BlogLink = styled(StyledLink)`
  width: 100%;
`

const BlogCard = ({ post }) => {
  const {data} = post.blog.document[0]
  const slug = post.blog.document[0].slugs[0]
  const { title, published_on, blog_image } = data
  const { author_name } = data.author.document[0].data

  return (
    <CardWrapper>
      <BlogLink to={slug}>
        <CardContent>
          <ImageWrapper>
            <img alt={blog_image.alt} src={blog_image.url} />
            <span className="tag-wrapper">
              <span>#Engineering</span>
            </span>
          </ImageWrapper>
          <span className="post-title">{title.text}</span>
          <span className="post-info">
            By {author_name.text} | {published_on}
          </span>
        </CardContent>
      </BlogLink>
    </CardWrapper>
  )
}

export default BlogCard
