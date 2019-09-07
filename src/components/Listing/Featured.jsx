import React from 'react'
import styled from '@emotion/styled'
import BlogCard from './BlogCard'

const ArticlesWrapper = styled.div`
  display: flex;
  margin: 8rem 0 8rem 0;
  border-bottom: 1px solid #c4c4c4;
  flex-wrap: wrap;
`

const Featured = ({ featured }) => (
  <ArticlesWrapper>
    {featured.map(post => (
      <BlogCard sidebar={false} key={post.blog.document[0].slugs[0]} post={post.blog.document[0]} />
    ))}
  </ArticlesWrapper>
)

export default Featured
