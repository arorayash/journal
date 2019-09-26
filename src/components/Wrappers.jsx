import styled from '@emotion/styled'
import { Link } from 'gatsby'

export const ImageWrapper = styled.span`
  position: relative;
  img {
    height: 28rem;
  }
  .tag-wrapper {
    border: 1px solid #fcd06e;
    float: left;
    position: absolute;
    left: 0px;
    top: 0px;
    border-radius: 4px;
    z-index: 2;
    background-color: #fcd06e;
    font-size: 1.4rem;
    line-height: 1rem;
    padding: 0.4rem 1rem;
    span {
      color: #1a1a1a;
      opacity: 0.6;
    }
  }
`
const linkStyles = `
text-decoration: none;
color: #fff;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 20px;
&:hover,
&:active,
&:visited,
&:focus {
  text-decoration: underline;
}`

export const StyledLink = styled(Link)`
  ${linkStyles}
  // &:hover {
  //   text-decoration: ${props => (props.underline ? 'underline' : 'none')};
  // }
`

export const ExternLink = styled.a`
  ${linkStyles}
`
