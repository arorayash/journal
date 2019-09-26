import React from 'react'
import styled from '@emotion/styled'
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
  PocketShareButton,
  PocketIcon,
} from 'react-share'
import { theme } from '../styles'

const { breakpoints } = theme

const ShareWrapper = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 4rem;
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
    margin-top: 1.2rem;
  }
`

const SocialShare = ({ title, url }) => (
  <ShareWrapper>
    <span>Share</span>
    <TwitterShareButton url={url} title={`${title} via @clarisights`}>
      <TwitterIcon size={30} />
    </TwitterShareButton>
    <LinkedinShareButton url={url}>
      <LinkedinIcon size={30} />
    </LinkedinShareButton>
    <FacebookShareButton quote={title} hashtag="clarisights" url={url}>
      <FacebookIcon size={30} />
    </FacebookShareButton>
    <PocketShareButton url={url} title={title}>
      <PocketIcon size={30} />
    </PocketShareButton>
  </ShareWrapper>
)

export default SocialShare
