import React, { useState, useEffect, useRef } from 'react'
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
  // position: sticky;
  // position: -webkit-sticky;
  // top: 4rem;
  color: #808080;
  font-size: 1.4rem;
  line-height: 2rem;
  margin-top: 0.5rem;

  .hide-on-medium {
    @media (max-width: ${breakpoints.m}) {
      display: none;
    }
  }

  @media (max-width: ${breakpoints.m}) {
    padding: 0 4vw;
  }

  textarea {
    opacity: 0;
    height: 0;
    width: 0;
  }

  form {
    @media (max-width: ${breakpoints.m}) {
      margin-bottom: 0;
    }
  }

  > div {
    margin-top: 1.8rem;
    width: 30px;
    height: 30px;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 250ms ease;

    @media (max-width: ${breakpoints.m}) {
      display: flex;
      display: inline-block;
      margin-right: 10px;
      margin-top: 0;
    }

    :active,
    :hover,
    :focus {
      outline: none;
      opacity: 1;
      svg {
        fill: #000;
      }
    }
  }

  svg {
    border-radius: 0.4rem;
    padding: 0.4rem;
    width: 30px;
    height: 30px;
  }
`
const getUsername = url => {
  return `from @${
    url.split('/').slice(-1)[0] === ''
      ? url.split('/').slice(-2)[0]
      : url.split('/').slice(-1)[0]
  }`
}

const CopyLink = props => {
  const [copySuccess, setCopySuccess] = useState('')
  const textAreaRef = useRef(null)

  const copyToClipboard = e => {
    textAreaRef.current.select()
    // if (document) {
    //   document.execCommand('copy')
    // }
    e.target.focus()
    setCopySuccess('Copied')
  }

  return (
    <>
      <div onClick={copyToClipboard}>{props.children}</div>
      <form>
        <textarea readOnly ref={textAreaRef} value={props.url} />
      </form>
    </>
  )
}

const SocialShare = ({ title, url, authorTwitter, className }) => (
  <ShareWrapper className={`${className}`}>
    <span className="hide-on-medium">Share</span>
    <TwitterShareButton
      url={url}
      title={`${title} ${
        authorTwitter ? getUsername(authorTwitter.url) : ''
      } via @clarisights`}>
      <TwitterIcon size={30} />
    </TwitterShareButton>
    <LinkedinShareButton url={url}>
      <LinkedinIcon size={30} />
    </LinkedinShareButton>
    <CopyLink url={url}>
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="#666"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M13.4499 8.50001L12.0319 7.08601L13.4469 5.67001C14.2329 4.88301 14.2269 3.62301 13.4469 2.84301C13.0728 2.46665 12.564 2.25502 12.0334 2.25502C11.5027 2.25502 10.994 2.46665 10.6199 2.84301L7.78988 5.67301C7.41377 6.04724 7.20231 6.55594 7.20231 7.08651C7.20231 7.61708 7.41377 8.12578 7.78988 8.50001L6.37888 9.90801L5.67288 9.20201C4.5009 8.03134 4.49956 6.13234 5.66988 4.96001L9.20988 1.41901C10.7699 -0.14099 13.3039 -0.13099 14.8639 1.42901C16.4238 2.99041 16.4251 5.51996 14.8669 7.08301L13.4499 8.50001ZM2.84288 7.79301V7.79001L4.25688 9.20001L2.84288 10.619C2.46671 10.9934 2.25523 11.5023 2.25523 12.033C2.25523 12.5637 2.46671 13.0726 2.84288 13.447C3.62988 14.232 4.88988 14.227 5.66988 13.447L8.49988 10.617C9.28688 9.83001 9.27988 8.57001 8.49988 7.79001L9.90988 6.38001L10.6129 7.08501C11.1768 7.64641 11.4944 8.40903 11.4955 9.20477C11.4966 10.0005 11.1812 10.764 10.6189 11.327L7.07888 14.867C5.51765 16.4259 2.98845 16.4246 1.42888 14.864C-0.131045 13.3026 -0.132387 10.7731 1.42588 9.21001L2.84288 7.79301Z" />
      </svg>
    </CopyLink>
  </ShareWrapper>
)

export default SocialShare
