import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { StyledLink } from './Wrappers'
import { theme } from '../styles'

const { breakpoints } = theme

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
  .heading-text {
    visibility: hidden;
    transition: visibility 0.3s linear, opacity 0.3s linear;
  }
  &:hover {
    .heading-text {
      visibility: visible;
    }
    .active {
      &:before {
        width: 1rem;
      }
    }
  }
  .heading {
    color: black;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      display: block;
      width: 1rem;
      height: 0.3rem;
      border-radius: 0.1rem;
      background: #808080;
      left: -1.5rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .active {
    &:before {
      width: 4rem;
      background: #000000;
    }
  }
  @media (max-width: ${breakpoints.s}) {
    display: none;
  }
`

const SectionNav = ({ headings, path }) => {
  // console.log(headings, path)
  const [activeHead, setActiveHead] = useState('')

  useEffect(() => {
    const getActive = () => {
      // headings.forEach(h => console.log(h.getBoundingClientRect().top, h.id))
      const top = headings.find(head => head.getBoundingClientRect().top > 0)
      console.log({ top, headings })
      if (top && activeHead !== top.id) {
        setActiveHead(top.id)
      }
    }
    window.addEventListener('scroll', getActive, true)
    return () => {
      window.removeEventListener('scroll', getActive)
    }
  }, [headings])

  return (
    <>
      {headings.length > 0 && (
        <NavWrapper>
          {headings.map(heading => (
            <StyledLink
              className={`heading ${heading.id === activeHead ? 'active' : ''}`}
              to={`${path}#${heading.id}`}>
              <span className="heading-text">{heading.innerText}</span>
            </StyledLink>
          ))}
        </NavWrapper>
      )}
    </>
  )
}

export default SectionNav
