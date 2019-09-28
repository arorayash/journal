import styled from '@emotion/styled'

const Wrapper = styled.div`
  max-width: ${props => props.theme.maxWidth};
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding: 0 1.5rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    width: 100%;
    max-width: 100%;
  }
`

export default Wrapper
