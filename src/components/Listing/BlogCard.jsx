import React from 'react'
import styled from '@emotion/styled'
import { blogReadTime } from '../../utils'
import { StyledLink } from '../Wrappers'
import { theme } from '../../styles'
import fallbackImage from '../../assets/bg_fallback.svg'

const { breakpoints } = theme

const CardWrapper = styled.div`
  text-decoration: none;
  margin-bottom: ${props => (props.sidebar ? '2' : '0')}rem;

  a:hover {
    text-decoration: none !important;
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .post-title {
    font-size: ${props => (props.sidebar ? '2' : '2.4')}rem;
    line-height: 2.9rem;
    font-weight: 600;
    margin-top: ${props => (props.sidebar ? '0' : '2')}rem;
    color: #1a1a1a;
    text-decoration: underline;
    text-decoration-color: #e5e5e5;
    text-decoration-skip-ink: auto;
  }
  .post-info {
    color: #808080;
    font-size: 1.4rem;
    line-height: 2rem;
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
  }
  &:hover {
    .post-title {
      text-decoration-color: #1a1a1a;
    }
  }
`

const ImageWrapper = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  img {
    // height: ${props => (props.sidebar ? '16' : '28')}rem;
    object-fit: contain;
    width: 100%;
    border-radius: 4px;
  }
  .tag-wrapper {
    float: left;
    position: absolute;
    left: 0px;
    bottom: 0px;
    border-radius: 0 4px;
    z-index: 2;
    background-color: ${props => categoryColors[props.categorySlug].bg};
    color: ${props => categoryColors[props.categorySlug].text};
    font-size: 1.4rem;
    line-height: 1rem;
    padding: 0.4rem 1rem;
    line-height: 2rem;
    span {
      opacity: 0.6;
    }
  }
`

const BlogLink = styled(StyledLink)`
  width: 100%;
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

const BlogCard = ({ post, sidebar = false, className }) => {
  const slug = post.slugs[0]
  const { title, published_on, blog_image } = post.data
  const { author_name } = post.data.author.document[0].data
  const category = post.data.category.document[0].data.title.text
  const categorySlug = post.data.category.document[0].slugs[0]
  return (
    <CardWrapper sidebar={sidebar} className={className}>
      <BlogLink to={slug}>
        <CardContent sidebar={sidebar}>
          <ImageWrapper
            categorySlug={categorySlug}
            sidebar={sidebar}
            className="o-ratio u-2:1">
            <img alt={blog_image.alt} src={blog_image.url || fallbackImage} />
            <span className="tag-wrapper">
              <span>{category}</span>
            </span>
          </ImageWrapper>
          <span className="post-title">{title.text}</span>
          <span className="post-info">
            <span>
              By {author_name.text} | {published_on}
            </span>
            <span className="time">{`${blogReadTime(post)} min read`}</span>
          </span>
        </CardContent>
      </BlogLink>
    </CardWrapper>
  )
}

export default BlogCard
