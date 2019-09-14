/* eslint no-unused-expressions: 0 */
/* eslint react/destructuring-assignment: 0 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { Global, css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import "@reach/skip-nav/styles.css";

import Footer from "./Footer";
import SEO from "./SEO";
import SkipNavLink from "./SkipNavLink";
import { theme, reset } from "../styles";

import "typeface-inter";
import "typeface-source-code-pro";

const globalStyle = css`
  ${reset}
  h1, h2, h3, h4, h5, h6 {
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
    color: ${theme.colors.bg};
    background-color: ${theme.colors.primary};
  }
  a {
    color: ${theme.colors.primary};
    transition: all 0.4s ease-in-out;
    text-decoration: none;
    font-weight: 700;
    font-style: italic;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
  @media (max-width: ${theme.breakpoints.s}) {
    h1 {
      font-size: 2.8rem !important;
    }
    h2 {
      font-size: 1.777rem !important;
    }
    h3 {
      font-size: 1.333rem !important;
    }
    h4 {
      font-size: 1rem !important;
    }
    h5 {
      font-size: 0.75rem !important;
    }
    h6 {
      font-size: 0.563rem !important;
    }
  }
`;

const PureLayout = ({ children, data, customSEO, path }) => (
  <ThemeProvider theme={theme}>
    <>
      <Global styles={globalStyle} />
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
);

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
              sort: { order: ASC, fields: first_publication_date }
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
    );
  }
}

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired
};

PureLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  data: PropTypes.object.isRequired,
  customSEO: PropTypes.bool
};

PureLayout.defaultProps = {
  customSEO: false
};
