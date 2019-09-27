import React from 'react'
import styled from '@emotion/styled'

const categoryColors = {
  engineering: {
    bg: '#FCD06E',
    text: '#1a1a1a',
    opacity: 0.6,
  },
  'business,growth': {
    bg: '#025C52',
    text: '#f7f7f7',
    opacity: 0.8,
  },
  'product,design': {
    bg: '#813A4C',
    text: '#ffffff',
    opacity: 0.8,
  },
}

const baseTag = {
  bg: '#f2f2f2',
  text: '#4c4c4c',
  opacity: 1,
}

const getTagProps = tag => {
  const prop = Object.entries(categoryColors).find(category =>
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
  &:not(:last-child) {
    margin-right: 1rem;
  }
`

const Tag = ({ text }) => {
  return <StyledTag tag={text}>{text}</StyledTag>
}

export default Tag;