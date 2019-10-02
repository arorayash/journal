import React from 'react'
import styled from '@emotion/styled'
import BlogCard from './BlogCard'

const ArticlesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Featured = ({ featured }) => (
  <ArticlesWrapper className="o-layout -gutter u-margin-bottom-large">
    {featured.map(post => (
      <div
        className="o-layout_item u-3/6@from-medium u-margin-bottom"
        key={post.blog.document[0].slugs[0]}>
        <BlogCard sidebar={false} post={post.blog.document[0]} />
      </div>
    ))}
  </ArticlesWrapper>
)

export default Featured
