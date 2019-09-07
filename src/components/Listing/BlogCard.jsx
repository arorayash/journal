import React from 'react'
import styled from '@emotion/styled'
import { StyledLink } from '../Wrappers'
import { theme } from '../../styles'

const { breakpoints } = theme

const CardWrapper = styled.div`
  display: flex;
  text-decoration: none;
  flex-wrap: wrap;
  flex: 1 0 48%;
  margin-bottom: ${props => props.sidebar ? '2': '0'}rem;
  @media (max-width: ${breakpoints.md}) {
    flex: 1 0 100%;
    flex-direction: column;
    max-width: 100%;
  }
  max-width: ${props => (props.sidebar ? '100': '50')}%;
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${props => props.sidebar ? '0': '4'}rem;
  .post-title {
    font-size: ${props => props.sidebar ? '2': '2.4'}rem;
    line-height: 2.9rem;
    font-weight: 600;
    margin-top: ${props => props.sidebar ? '0': '2'}rem;
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
    height: ${props => props.sidebar ? '16': '28'}rem;
    object-fit: cover;
    width: 100%;
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

const BlogCard = ({ post, sidebar = false }) => {
  console.log(post, sidebar)
  const slug = post.slugs[0]
  const { title, published_on, blog_image } = post.data
  const { author_name } = post.data.author.document[0].data

  return (
    <CardWrapper sidebar={sidebar}>
      <BlogLink to={slug}>
        <CardContent sidebar={sidebar}>
          <ImageWrapper sidebar={sidebar}>
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
