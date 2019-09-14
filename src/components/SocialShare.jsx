import React from 'react'
import styled from '@emotion/styled'
import { TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, PocketShareButton, PocketIcon } from 'react-share'
import { theme } from '../styles'

const { breakpoints } = theme

const ShareWrapper = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 4rem;
  width: fit-content;
  color: #808080;
  font-size: 1.4rem;
  line-height: 2rem;
  padding: 2rem 0 0 5rem;
  @media (max-width: ${breakpoints.s}) {
    display: none;
  }
  @media (max-width: ${breakpoints.md}) {
    padding-left: 0;
  }
  div {
    width: fit-content;
    margin-top: 1.2rem;
  }
`

const SocialShare = ({ title, url  }) => {
  return (
    <ShareWrapper>
      <span>Share</span>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={20} />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={20} />
      </LinkedinShareButton>
      <PocketShareButton url={url} title={title}>
        <PocketIcon size={20} />
      </PocketShareButton>
    </ShareWrapper>
  )
}

export default SocialShare
