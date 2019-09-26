import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { StyledLink, ExternLink } from './Wrappers'
import { theme } from '../styles'
import { getCategoryFirstPost } from '../utils'
import clarisightsLogo from '../assets/white-logo.svg'

const { breakpoints, colors } = theme

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1.4rem;
  line-height: 2rem;
  color: #fff;
  width: 100vw;
  background-color: black;
  .social-links {
    justify-content: space-between;
  }
  @media (max-width: ${breakpoints.s}) {
    flex-direction: column;
    align-items: start;
    padding: 5.6rem 2.8rem 5.6rem 2.8rem;
  }
`

const isSingle = props => props.left && props.path === '/'

const Section = styled.span`
  display: flex;
  width: 100%;
  justify-content: space-between;
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
  margin: 7rem 0 10rem 0;

  @media (max-width: ${breakpoints.s}) {
    margin: 4.2rem 0;
  }
`

const Title = styled.div`
  margin-bottom: 0.7rem;
  color: ${colors.neutral45};
`

const Logo = styled.img`
  margin-bottom: 0.7rem;
`

const Footer = ({ categories, path, allPosts }) => (
  <StyledFooter path={path}>
    <Section left path={path} className="o-container">
      <Column>
        <ExternLink to="/">
          <Logo src={clarisightsLogo} alt="Journal Home" />
        </ExternLink>
        <StyledLink to="/careers">Job listings</StyledLink>
      </Column>
      <Column>
        <Title>Journal</Title>
        {categories.map(cat => (
          <StyledLink to={getCategoryFirstPost(allPosts, cat.uid)}>
            <span key={cat.data.title.text}>
              / {cat.data.title.text}{' '}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M5 15V4L16 15H5Z" fill="#025C52" />
              </svg>
            </span>
          </StyledLink>
        ))}
      </Column>
      <Column className="social-links">
        <ExternLink target="_blank" href="https://github.com/clarisights">
          GitHub
        </ExternLink>
        <ExternLink target="_blank" href="https://twitter.com/clarisights">
          Twitter
        </ExternLink>
        <ExternLink
          target="_blank"
          href="https://www.linkedin.com/company/clarisights/">
          LinkedIn
        </ExternLink>
        <ExternLink target="_blank" href="https://www.dribble.com/clarisights">
          Dribble
        </ExternLink>
      </Column>
      <Column>
        <Title>© Clarisights 2019</Title>
        <ExternLink
          target="_blank"
          href="https://clarisights.com/privacy-policy">
          Privacy Policy
        </ExternLink>
      </Column>
    </Section>
  </StyledFooter>
)

export default Footer
