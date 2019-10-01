/* eslint no-unused-expressions: 0 */
/* eslint react/destructuring-assignment: 0 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { Global, css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import '@reach/skip-nav/styles.css'

import Footer from './Footer'
import SEO from './SEO'
import SkipNavLink from './SkipNavLink'
import { theme } from '../styles'

import 'typeface-inter'
import 'typeface-source-code-pro'

import '../styles/scss/index.scss'

const globalStyle = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${theme.colors.title};
  }
  html {
    font-size: 10px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    font-family: Inter;
    color: ${theme.colors.greyDarker};
    background-color: ${theme.colors.bg};
  }
  ::selection {
    color: inherit;
    background-color: #ddeee5;
  }
`

const PureLayout = ({ children, data, customSEO, path }) => (
  <ThemeProvider theme={theme}>
    <>
      <Global
        styles={css`
          ${globalStyle}
          body {
            background-color: ${path === '/' ? '#f4f2ed' : theme.colors.bg};
          }
        `}
      />
      <SkipNavLink />
      {!customSEO && <SEO />}
      {children}
      <Footer
        path={path}
        categories={data.allPrismicCategory.nodes}
        allPosts={data.allPosts}
      />
    </>
  </ThemeProvider>
)

class Layout extends Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            allPrismicCategory {
              nodes {
                slugs
                uid
                data {
                  title {
                    text
                  }
                }
              }
            }
            allPosts: allPrismicBlogPost(
              sort: { order: DESC, fields: data___published_on }
            ) {
              nodes {
                slugs
                data {
                  title {
                    text
                  }
                  category {
                    slug
                  }
                }
              }
            }
          }
        `}
        render={data => (
          <PureLayout {...this.props} data={data}>
            {this.props.children}
          </PureLayout>
        )}
      />
    )
  }
}

export default Layout

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
}

PureLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  data: PropTypes.object.isRequired,
  customSEO: PropTypes.bool,
}

PureLayout.defaultProps = {
  customSEO: false,
}
