import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { StyledLink } from '../Wrappers'
import CategoryCard from './CategoryCard.jsx'
import { getCategoryFirstPost } from '../../utils'

const CategoriesWrapper = styled.div``

const categoriesOrder = ['engineering', 'business--growth', 'product--design']

const Categories = ({ categories, allPosts }) => {
  // Fix the order of catrgories since prismic sends them unordered
  categories.sort(
    (a, b) => categoriesOrder.indexOf(a.uid) - categoriesOrder.indexOf(b.uid)
  )
  return (
    <>
      <CategoriesWrapper className="o-layout -gutter">
        {categories.map((category, index) => (
          <div className="o-layout_item u-1/3@from-medium u-margin-bottom-small">
            <CategoryCard
              cardLink={getCategoryFirstPost(allPosts, category.uid)}
              key={category.data.title.text}
              data={category}
              index={index}
            />
          </div>
        ))}
      </CategoriesWrapper>
    </>
  )
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
}

export default Categories
