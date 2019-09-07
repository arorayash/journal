import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import CategoryCard from './CategoryCard.jsx'

const CategoriesWrapper = styled.div`
  display: flex;
  margin: 8rem 0 8rem 0;
  border-bottom: 1px solid #c4c4c4;
  flex-wrap: wrap;
`

const Categories = ({ categories }) => (
  <>
    <CategoriesWrapper>
      {categories.map((category, index) => (
        <CategoryCard key={category.data.title.text} data={category} index={index} />
      ))}
    </CategoriesWrapper>
  </>
)

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default Categories
