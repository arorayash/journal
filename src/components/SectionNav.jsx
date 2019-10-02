import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { StyledLink } from './Wrappers'
import { theme } from '../styles'

const { breakpoints, colors } = theme

const NavWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 2rem;
  margin-left: 3.2rem;
  max-width: 10vw;
  top: 50%;
  z-index: 2;

  .relative-wrapper {
    position: relative;
  }

  .default {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;

    .dash {
      height: 1px;
      width: 2rem;
      background: ${colors.neutral45};
      margin: 2.1rem 0;
      transition: width 350ms ease;
      &.active {
        width: 4rem;
        background: black;
      }

      @media (max-width: ${breakpoints.mx}) {
        width: 0.8rem;
      }
    }

    &:hover ~ .on-hover {
        visibility: visible;
        left: 0;
        opacity: 1;
      }
    }

    .on-hover{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -1rem;
      visibility: hidden;
      opacity: 0;
      background: white;
      z-index: 100;
      transition: all 250ms linear;
      padding: 1rem 0;
    
      a {
        color: ${colors.neutral50} !important;
      }

      .heading {
        display: flex;
      }

      .active {
        color: black !important;
        font-weight: bolder;
      }

      .heading-text {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 1.2rem;
          line-height: 1.8rem;
          padding: 0.2rem 1rem 0.2rem 0;
      }

      &:hover {
        visibility: visible;
        left: 0;
        opacity: 1;
      }
    }
  }

  @media (max-width: ${breakpoints.s}) {
    display: none;
  }
`

const SectionNav = ({ headings, path }) => {
  const [activeHead, setActiveHead] = useState('')

  useEffect(() => {
    if (headings && headings[0] && activeHead === '') {
      setActiveHead(headings[0].id)
    }
    const getActive = () => {
      const top = headings.find(head => head.getBoundingClientRect().top > 0)
      if (top && activeHead !== top.id) {
        setActiveHead(top.id)
      }
    }
    window.addEventListener('scroll', getActive, true)
    return () => {
      window.removeEventListener('scroll', getActive, true)
    }
  }, [headings])

  return (
    <>
      {headings.length > 0 && (
        <NavWrapper>
          <div className="default">
            {headings.map(heading => (
              <div className="dash-wrapper" key={heading.id}>
                <div
                  className={`dash ${
                    heading.id === activeHead ? 'active' : ''
                  }`}></div>
              </div>
            ))}
          </div>
          <div className="on-hover">
            {headings.map(heading => (
              <StyledLink
                className={`heading ${
                  heading.id === activeHead ? 'active' : ''
                }`}
                key={heading.id}
                to={`${path}#${heading.id}`}>
                <span className="heading-text">{heading.innerText}</span>
              </StyledLink>
            ))}
          </div>
        </NavWrapper>
      )}
    </>
  )
}

export default SectionNav
