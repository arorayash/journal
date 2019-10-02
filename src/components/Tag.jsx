import React from 'react'
import styled from '@emotion/styled'

const categoryData = {
  engineering: {
    bg: '#FCD06E',
    text: '#1a1a1a',
    opacity: 0.6,
    category: 'Engineering',
  },
  'business,growth': {
    bg: '#025C52',
    text: '#f7f7f7',
    opacity: 0.8,
    category: 'Business & Growth',
  },
  'product,design': {
    bg: '#813A4C',
    text: '#ffffff',
    opacity: 0.8,
    category: 'Product & Design',
  },
}

const baseTag = {
  bg: '#f2f2f2',
  text: '#4c4c4c',
  opacity: 1,
}

const getTagProps = tag => {
  const prop = Object.entries(categoryData).find(category =>
    category[0].split(',').includes(tag.toString().toLowerCase())
  )
  return prop ? prop[1] : baseTag
}

const StyledTag = styled.span`
  height: 2.8rem;
  color: ${props => getTagProps(props.tag).text};
  font-size: 1.4rem;
  line-height: 2rem;
  border-radius: 0.4rem;
  background-color: ${props => getTagProps(props.tag).bg};
  opacity: ${props => getTagProps(props.tag).opacity};
  padding: 0.4rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`

const handleTagClick = props => {
  const { text, setCategory, setShowSidebar } = props
  const TagData = Object.entries(categoryData).find(category =>
    category[0].split(',').includes(text.toString().toLowerCase())
  )
  if (!TagData) return null
  setCategory(TagData[1].category)
  setShowSidebar(true)
}

const Tag = props => {
  const { text } = props
  return (
    <StyledTag onClick={() => handleTagClick(props)} tag={text}>
      {text}
    </StyledTag>
  )
}

export default Tag
