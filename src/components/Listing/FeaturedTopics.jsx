import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import BlogCard from './BlogCard.jsx'

const FeaturedWrapper = styled.div`
  display: flex;
  margin-top: 10rem;
`

const FeaturedTopics = ({ featured }) => (
  <>
    <FeaturedWrapper>
      {featured.map((blog, index) => (
        <BlogCard blog={blog} index={index} />
      ))}
    </FeaturedWrapper>
  </>
)

FeaturedTopics.propTypes = {
  featured: PropTypes.array.isRequired,
}

export default FeaturedTopics
