import React from 'react'
import styled from '@emotion/styled'
import { StyledLink } from './Wrappers'
import { theme } from '../styles'

const { breakpoints } = theme;

const NavWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  width: intrinsic;
  width: -moz-max-content;
  width: -webkit-max-content;
  font-size: 1.4rem;
  line-height: 2rem;
  margin-left: 2rem;
  max-width: 20vw;
  .heading {
    position: relative;
    &:before {
      content: '';
      position: absolute;
      width: 1rem;
      height: 0.1rem;
      background: black;
      left: -1.5rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  @media (max-width: ${breakpoints.s}) {
    display: none;
  }
`

const SectionNav = ({ headings, path }) => {
  console.log(headings, path)
  return (
    <NavWrapper>
      {headings.map(heading => (
        <StyledLink to={`${path}#${heading.id}`}>
          <span className="heading">{heading.innerText}</span>
        </StyledLink>
      ))}
    </NavWrapper>
  )
}

export default SectionNav
