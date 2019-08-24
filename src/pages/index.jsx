import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { Layout, Listing, Wrapper, Title } from '../components'
import website from '../../config/website'

const IndexWrapper = Wrapper.withComponent('main')

const HomepageHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  flex: 1 0 auto;
  align-items: start;
  .topImages {
    margin-bottom: 40px;
  }
  input {
    margin-top: 40px;
    border: 1px solid #9b8964;
    border-radius: 2px;
    width: 100%;
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
          <span>
            A space where our team’s thoughts and explorations are logged in. We regularly jot down about our projects,
            product updates, business; breaking down our processes and findings to share them with you. - your friends
            at Clarisights
          </span>
          <input type="text" placeholder="🔍 Search for a post"/>
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
