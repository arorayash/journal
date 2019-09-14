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

export const StyledLink = styled(Link)`
  text-decoration: none;
  font: inherit;
  color: inherit;
  &:hover {
    text-decoration: ${props => (props.underline ? 'underline' : 'none')};
  }
`

export const ExternLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 0.5rem;
  height: fit-content;
  width: fit-content;
  &:hover,
  &:active,
  &:visited,
  &:focus {
    text-decoration: none;
  }
`
