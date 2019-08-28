import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  line-height: 20rem;
  padding: 0 14rem 0 14rem;
  height: 26rem;
  color: #fff;
  width: 100vw;
  margin: 6rem auto 0 auto;
  background-color: black;
`

const RightSection = styled.span`
  span {
    padding: 5rem;
  }
`

const Footer = () => (
  <StyledFooter>
    <span>
      <Link to="/careers">Careers</Link>
    </span>
    <RightSection>
      <span>Privacy Policy</span>
      <span>© Clarisights 2019 </span>
    </RightSection>
  </StyledFooter>
)

export default Footer
