import React from 'react'
import styled from '@emotion/styled'
import { StyledLink } from './Wrappers'

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  line-height: 2rem;
  padding: 0 1.4rem 0 1.4rem;
  height: 26rem;
  color: #fff;
  width: 100vw;
  margin: 6rem auto 0 auto;
  background-color: black;
  flex-shrink: 0;
`

const isSingle = props => props.left && props.path === '/'

const Section = styled.span`
  flex: 1 0;
  display: flex;
  justify-content: ${props => (isSingle(props) ? 'start' : 'space-around')};
  margin-left: ${props => (isSingle(props) ? '14rem' : '0')};
`

const CategoriesWrapper = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  line-height: 2rem;
  color: #a6a6a6;
  span {
    margin-top: 1rem;
    color: #fff;
  }
`

const Footer = ({ categories, path }) => (
  <StyledFooter>
    <Section left path={path}>
      <StyledLink to="/careers">Careers</StyledLink>
      {path !== '/' && (
        <CategoriesWrapper>
          Journal
          {categories.map(cat => (
            <span>/ {cat.data.title.text}</span>
          ))}
        </CategoriesWrapper>
      )}
    </Section>
    <Section>
      <span>Privacy Policy</span>
      <span>© Clarisights 2019 </span>
    </Section>
  </StyledFooter>
)

export default Footer
