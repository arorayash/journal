import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { StyledLink } from '../Wrappers'
import CategoryCard from './CategoryCard.jsx'
import { getFirstCategory } from '../../utils'

const CategoriesWrapper = styled.div`
  display: flex;
  margin: 8rem 0 8rem 0;
  border-bottom: 1px solid #c4c4c4;
  flex-wrap: wrap;
`

const Categories = ({ categories, allPosts }) => {
  console.log({ allPosts, categories })

  return (
    <>
      <CategoriesWrapper>
        {categories.map((category, index) => (
          <StyledLink to={getFirstCategory(allPosts, category.uid)}>
            <CategoryCard key={category.data.title.text} data={category} index={index} />
          </StyledLink>
        ))}
      </CategoriesWrapper>
    </>
  )
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default Categories
