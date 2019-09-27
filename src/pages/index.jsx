import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { Input, Icon, Button } from 'knit-ui'
import { Layout } from '../components'
import { Categories, Featured } from '../components/Listing'
import { theme } from '../styles'
import { searchBlogs } from '../utils'
import { StyledLink, ExternLink, SectionTitle } from '../components/Wrappers'
// import website from '../../config/website'

const { breakpoints } = theme

const HomepageHeader = styled.div`
  .topImages {
    display: flex;
    flex-direction: column;
    align-items: end;
  }
  .home-logo {
    margin-bottom: 1rem;
  }
  .about {
    font-size: 1.4rem;
    line-height: 2rem;
  }
  .search-wrapper {
    width: 100%;
    input {
      background: transparent;
      border: 1px solid #9b8964;
    }
  }
`

const Underline = styled.span`
  text-decoration-line: underline;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const EventsWrapper = styled.div`
  color: #4c4c4c;
  .event-card {
    &-title {
      font-weight: normal;
      font-style: normal;
      font-size: 1.6rem;
      line-height: 1.9rem;
    }

    .event-date {
      font-size: 14px;
    }
  }
`

const IndexWrapper = styled.div`
  // @media (max-width: ${breakpoints.m}) {
  //   padding: 5rem;
  // }
`

const NewsletterWrapper = styled.div`
  div {
    display: flex;
    font-size: 2.4rem;
    color: #4c4c4c;
    line-height: 2.9rem;
    input {
      font-size: 1.4rem;
      line-height: 2rem;
      height: 3.4rem;
      background: transparent;
      border: 1px solid #1a1a1a;
      margin-right: 0.5rem;
    }
    button {
      font-size: 1.4rem;
      line-height: 2rem;
      background-color: #9b8964;
      border-radius: 2px;
      color: white;
      border: 0;
      &:hover {
        background: #1a1a1a;
      }
    }
  }
`

const SearchResults = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  position: absolute;
  font-size: 1.4rem;
  line-height: 2rem;
  color: #1a1a1a;
  padding-left: 2.8rem;
  margin-top: 1rem;
  a {
    cursor: pointer;
    margin-bottom: 2rem;
    color: black;
  }
`

const EventLinkWrapper = styled(ExternLink)`
  color: #4c4c4c;
`

const ContentWrapper = styled.div`
  filter: blur(${props => (props.blur ? 1 : 0)}rem);
`

const Index = props => {
  const {
    data: { homepage, categories, events, featured_posts, allPosts },
    path,
  } = props
  const [search, setSearch] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)
  const filteredPosts = searchBlogs(allPosts.nodes, search)

  const featuredBlogs = featured_posts.nodes[0].data.featured_blogs
  return (
    <Layout path={path}>
      <div className="o-container">
        <IndexWrapper className="o-layout -gutter">
          <HomepageHeader className="o-layout_item u-3/6@from-medium u-margin-vertical-xlarge">
            <div className="topImages">
              <img className="home-logo" src={homepage.data.logo.url} alt="" />
              <img src={homepage.data.journal.url} alt="" />
            </div>
            <div className="about u-margin-top-small">
              A space where our team’s thoughts and explorations are logged in.
              We regularly jot down about our projects, product updates,
              business; breaking down our processes and findings to share them
              with you. - your friends at Clarisights
            </div>
            <div className="search-wrapper u-margin-top-small">
              <Input
                onChange={e => setSearch(e.target.value)}
                onFocus={e => setSearchFocus()}
                placeholder="Search for a post"
                addonBefore={<Icon type="oSearch" />}
              />
              {search !== '' && (
                <SearchResults>
                  {filteredPosts.map(post => (
                    <StyledLink to={post.slugs[0]}>
                      {post.data.title.text}
                    </StyledLink>
                  ))}
                </SearchResults>
              )}
            </div>
          </HomepageHeader>
          <ContentWrapper
            blur={search !== ''}
            className="o-layout_item u-6/6@from-medium">
            <Categories allPosts={allPosts} categories={categories.nodes} />
            <SectionTitle className="u-margin-top-xlarge u-margin-bottom-small">
              Featured Topics
            </SectionTitle>
            <Featured featured={featuredBlogs} />
            <hr />
          </ContentWrapper>
          <div className="o-layout_item u-3/6@from-medium">
            <NewsletterWrapper className="u-margin-top-xlarge">
              <div className="u-margin-bottom-small">
                Get the latest news and views from Clarisights delivered to your
                inbox. No spam, only quality content.
              </div>
              <div>
                <Input placeholder="Your Email address" size="large" />
                <button>Subscribe</button>
              </div>
            </NewsletterWrapper>
            <SectionTitle className="u-margin-top-xlarge u-margin-bottom-small">
              What's on
            </SectionTitle>
            <EventsWrapper className="u-margin-bottom-xlarge">
              {events.nodes.map((event, index) => (
                <>
                  {index !== 0 ? <hr /> : null}
                  <div
                    key={event.data.title.text}
                    className="event-card o-layout u-margin-vertical-xsmall">
                    <EventLinkWrapper
                      href={event.data.meetup_link.url}
                      target={event.data.meetup_link.target}
                      className="o-layout_item u-3/6@from-medium">
                      <span className="event-card-title">
                        {event.data.title.text}
                      </span>
                    </EventLinkWrapper>
                    <div className="o-layout_item u-3/6@from-medium">
                      <div className="o-layout -flex -right -col">
                        <div className="o-layout -flex -right -middle">
                          <Icon type="oLocationOn" />
                          <EventLinkWrapper
                            href={event.data.location_link.url}
                            target={event.data.location_link.target}>
                            {event.data.location.text}
                          </EventLinkWrapper>
                        </div>
                        <div className="event-date">{event.data.time}</div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </EventsWrapper>
          </div>
        </IndexWrapper>
      </div>
    </Layout>
  )
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
    categories: allPrismicCategory {
      nodes {
        data {
          description {
            text
          }
          title {
            text
          }
        }
        uid
      }
    }
    events: allPrismicEvents {
      nodes {
        data {
          title {
            text
          }
          location {
            text
          }
          location_link {
            url
            target
          }
          meetup_link {
            url
            target
          }
          time(formatString: "Do MMMM, YYYY")
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
    featured_posts: allPrismicFeatured {
      nodes {
        data {
          featured_blogs {
            blog {
              document {
                data {
                  author {
                    document {
                      data {
                        author_name {
                          text
                        }
                      }
                    }
                  }
                  published_on(formatString: "MMM D, YYYY")
                  blog_image {
                    alt
                    url
                  }
                  title {
                    text
                  }
                  body {
                    text
                  }
                  category {
                    document {
                      slugs
                      data {
                        title {
                          text
                        }
                      }
                    }
                  }
                }
                slugs
              }
            }
          }
        }
      }
    }
  }
`
