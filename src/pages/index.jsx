import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { Input, Icon, Button } from 'knit-ui'
import { Layout, Listing, Wrapper, Title } from '../components'
import { Categories, Featured } from '../components/Listing'
import { theme } from '../styles'
import { searchBlogs } from '../utils/search'
import { StyledLink } from '../components/Wrappers'
// import website from '../../config/website'

const { breakpoints } = theme

const HomepageHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 35vw;
  flex: 1 0 auto;
  align-items: start;
  .topImages {
    display: flex;
    flex-direction: column;
    align-items: end;
    margin-bottom: 4rem;
    img:last-child {
      margin-top: 2rem;
    }
  }
  .about {
    font-size: 1.4rem;
    line-height: 2rem;
  }
  .search-wrapper {
    width: 100%;
    margin-top: 40px;
    input {
      background: transparent;
      border: 1px solid #9b8964;
    }
  }
  @media (max-width: ${breakpoints.m}) {
    width: 60%;
  }
  @media (max-width: ${breakpoints.s}) {
    width: 100%;
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

const SectionTitle = styled.div`
  margin: 10rem 0 2rem 0;
  font-size: 2.4rem;
  line-height: 2.8rem;
  color: #4c4c4c;
`

const EventsWrapper = styled.div`
  width: 50%;
  color: #4c4c4c;
  .event-card {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0 1rem 0;
    &-title {
      font-weight: normal;
      font-style: normal;
      font-size: 1.6rem;
      line-height: 1.9rem;
    }
    &:not(:last-child) {
      border-bottom: 1px solid #c4c4c4;
    }
  }
  @media (max-width: ${breakpoints.md}) {
    width: 100%;
  }
`

const IndexWrapper = styled.div`
  padding: 12.5rem;
  @media (max-width: ${breakpoints.m}) {
    padding: 5rem;
  }
  @media (max-width: ${breakpoints.s}) {
    padding: 2.6rem;
    margin-top: 7.5rem;
  }
`

const NewsletterWrapper = styled.div`
  width: 40vw;
  font-size: 2.4rem;
  color: #4c4c4c;
  margin-top: 4rem;
  line-height: 2.9rem;
  span {
    margin-top: 2rem;
    height: 3.4rem;
    display: flex;
    font-size: 1.4rem;
    line-height: 2rem;
    input {
      height: 3.4rem;
      background: transparent;
      border: 1px solid #1a1a1a;
      margin-right: 0.5rem;
    }
    button {
      background-color: #9b8964;
      border-radius: 2px;
      color: white;
      &:hover {
        background: #1a1a1a;
      }
    }
  }
  @media (max-width: ${breakpoints.md}) {
    width: 100%;
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
    width: fit-content;
    cursor: pointer;
    margin-bottom: 2rem;
  }
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
  const filteredPosts = searchBlogs(allPosts.nodes, search)
  return (
    <Layout path={path}>
      <IndexWrapper>
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
            <Input
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for a post"
              addonBefore={<Icon type="oSearch" />}
            />
            {search !== '' && (
              <SearchResults>
                {filteredPosts.map(post => (
                  <StyledLink to={post.slugs[0]}>{post.data.title.text}</StyledLink>
                ))}
              </SearchResults>
            )}
          </span>
        </HomepageHeader>
        <ContentWrapper blur={search !== ''}>
          <Categories categories={categories.nodes} />
          <SectionTitle>Featured Topics</SectionTitle>
          <Featured featured={featured_posts.nodes[0].data.featured_blogs} />
          <NewsletterWrapper>
            Get the latest news and views from Clarisights delivered to your inbox. No spam, only quality content.
            <span>
              <Input placeholder="Your Email address" size="large" />
              <button>Subscribe</button>
            </span>
          </NewsletterWrapper>
          <SectionTitle>What's on</SectionTitle>
          <EventsWrapper>
            {events.nodes.map(event => (
              <span key={event.data.title.text} className="event-card">
                <span className="event-card-title">{event.data.title.text}</span>
                <ColumnWrapper>
                  <span>
                    <Icon type="oLocationOn" />
                    <Underline>{event.data.location.text}</Underline>
                  </span>
                  <span>{event.data.time}</span>
                </ColumnWrapper>
              </span>
            ))}
          </EventsWrapper>
        </ContentWrapper>
      </IndexWrapper>
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
          time(formatString: "Do MMMM, YYYY")
        }
      }
    }
    allPosts: allPrismicBlogPost {
      nodes {
        slugs
        data {
          title {
            text
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
