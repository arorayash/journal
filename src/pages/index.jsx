import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { Input, Icon } from 'knit-ui'
import { Layout, Listing, Wrapper, Title } from '../components'
import website from '../../config/website'

const IndexWrapper = Wrapper.withComponent('main')

const HomepageHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  flex: 1 0 auto;
  align-items: start;
  .topImages {
    margin-bottom: 40px;
  }
  .about {
    font-size: 1.4rem;
    line-height: 2rem;
  }
  .search-wrapper {
    width: 100%;
    margin-top: 40px;
  }
`

class Index extends Component {
  render() {
    const {
      data: { homepage },
    } = this.props
    return (
      <Layout>
        <HomepageHeader>
          <span className="topImages">
            <img src={homepage.data.logo.url} alt="" />
            <img src={homepage.data.journal.url} alt="" />
          </span>
          <span className="about">
            A space where our team’s thoughts and explorations are logged in. We regularly jot down about our projects,
            product updates, business; breaking down our processes and findings to share them with you. - your friends
            at Clarisights
          </span>
          <span className="search-wrapper">
            <Input placeholder="Search for a post" addonBefore={<Icon type="oSearch" />} />
          </span>
        </HomepageHeader>
      </Layout>
    )
  }
}

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    homepage: PropTypes.shape({
      data: PropTypes.shape({
        title: PropTypes.shape({
          text: PropTypes.string.isRequired,
        }),
        content: PropTypes.shape({
          html: PropTypes.string.isRequired,
        }),
      }),
    }),
    social: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
    posts: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
    projects: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query {
    homepage: prismicHomepage {
      data {
        title {
          text
        }
        logo {
          url
        }
        journal {
          url
        }
      }
    }
  }
`
