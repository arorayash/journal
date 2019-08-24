import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import CategoryCard from './CategoryCard.jsx'

const CategoriesWrapper = styled.div`
  display: flex;
  margin-top: 8rem;
`

export default class Categories extends Component {
  render() {
    const { categories } = this.props
    console.log(categories)
    return <>
      <CategoriesWrapper>
        {categories.map((c, index) => (
          <CategoryCard data={c} index={index} />
        ))}
      </CategoriesWrapper>
    </>
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
}
