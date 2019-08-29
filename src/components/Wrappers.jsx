import styled from '@emotion/styled'

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
    z-index: 1000;
    background-color: #fcd06e;
    font-size: 1.4rem;
    line-height: 1rem;
    padding: 1rem 0.4rem;
    span {
      color: #1a1a1a;
      opacity: 0.6;
    }
  }
`
