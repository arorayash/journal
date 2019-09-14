import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { StyledLink, ExternLink } from './Wrappers'
import { theme } from '../styles'
import { getFirstCategory } from '../utils'
import clarisightsLogo from '../assets/white-logo.svg'

const { breakpoints } = theme

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
  @media (max-width: ${breakpoints.s}) {
    flex-direction: column;
    align-items: start;
    height: 43rem;
    padding: 2.6rem 2.6rem 5rem 2.6rem;
  }
`

const isSingle = props => props.left && props.path === '/'

const Section = styled.span`
  flex: 1 0;
  display: flex;
  width: 100%;
  justify-content: ${props => (isSingle(props) ? 'start' : 'space-around')};
  margin-left: ${props => (isSingle(props) ? '14rem' : '0')};
  @media (max-width: ${breakpoints.s}) {
    margin-left: 0;
    flex-direction: column;
    &:not(:last-child) {
      padding-bottom: 5rem;
    }
  }
`

const CategoriesWrapper = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  line-height: 2rem;
  color: #a6a6a6;
  a {
    margin-top: 1rem;
    color: #fff;
  }
  @media (max-width: ${breakpoints.s}) {
    margin-top: 2rem;
  }
`

const SpacedFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  &:last-child {
    margin-top: 3rem;
  }
`

const Footer = ({ categories, path, allPosts }) => (
  <StyledFooter path={path}>
    <Section left path={path}>
      {typeof window !== 'undefined' && window.innerWidth < 600 ? (
        <SpacedFlex>
          <StyledLink underline to="/careers">
            Careers
          </StyledLink>
          <Link to="/">
            <img src={clarisightsLogo} alt="" />
          </Link>
        </SpacedFlex>
      ) : (
        <ExternLink target="_blank" href="https://clarisights.com/careers">
          Careers
        </ExternLink>
      )}
      {path !== '/' && (
        <CategoriesWrapper>
          Journal
          {categories.map(cat => (
            <StyledLink to={getFirstCategory(allPosts, cat.uid)}>
              <span key={cat.data.title.text}>/ {cat.data.title.text}</span>
            </StyledLink>
          ))}
        </CategoriesWrapper>
      )}
    </Section>
    <Section>
      <Column>
        <ExternLink target="_blank" href="https://github.com/clarisights">
          GitHub
        </ExternLink>
        <ExternLink target="_blank" href="https://twitter.com/clarisights">
          Twitter
        </ExternLink>
        <ExternLink target="_blank" href="https://www.linkedin.com/company/clarisights/">
          LinkedIn
        </ExternLink>
        <ExternLink target="_blank" href="https://www.dribble.com/clarisights">
          Dribble
        </ExternLink>
      </Column>
      <Column>
        <span>© Clarisights 2019</span>
        <ExternLink target="_blank" href="https://clarisights.com/privacy-policy">
          Privacy Policy
        </ExternLink>
      </Column>
    </Section>
  </StyledFooter>
)

export default Footer
