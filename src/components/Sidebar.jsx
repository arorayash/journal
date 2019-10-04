import React, { useState } from 'react'
import Sidebar from 'react-sidebar'
import styled from '@emotion/styled'
import { Input, Icon } from 'knit-ui'
import { StyledLink } from './Wrappers'
import BlogCard from './Listing/BlogCard'
import { searchBlogs } from '../utils'
import { theme } from '../styles'
import clarisightsLogo from '../assets/logo.svg'

const { breakpoints, colors } = theme

const SidebarWrapper = styled.div`
  width: 50vw;
  max-width: 80rem;
  padding: 4rem;
  height: 100%;
  display: flex;
  justify-content: space-between;

  .home-link {
    padding-left: 0.7rem;
  }

  @media (max-width: ${breakpoints.l}) {
    width: 70vw;
  }
  @media (max-width: ${breakpoints.s}) {
    flex-direction: column;
    padding: 2rem 2.7rem 2rem 2.7rem;
    height: fit-content;
    max-height: 100%;
    width: 100vw;
  }
`

const VertFlex = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${props => (props.categories ? 3 : 4.6)};
  font-size: 1.4rem;
  line-height: 2rem;
  height: 100%;

  .search-wrapper {
    width: 100%;
    padding: 0 10px;
    margin-bottom: 2.7rem;
    input {
      padding: 0.7rem 0 0.7rem 4rem !important;
    }
    svg {
      fill: #9b8964;
      height: 20px;
      width: 20px;
      margin-left: 0.7rem;
      margin-top: 0.4rem;
    }
    @media (max-width: ${breakpoints.s}) {
      margin-top: 1.8rem;
    }
  }
  .logo {
    margin-top: auto;
    @media (max-width: ${breakpoints.s}) {
      margin-top: 0;
    }
  }
  .close-icon {
    display: none;

    svg {
      height: 2.4rem;
      width: 2.4rem;
    }
    @media (max-width: ${breakpoints.s}) {
      display: block;
      height: 2.4rem;
      width: 2.4rem;
    }
  }
`

const ActionWrapper = styled.span`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: inline-block;
  }
  .close-icon {
    cursor: pointer;
  }
`

const CategoryItem = styled.span`
  cursor: pointer;
  position: relative;
  &:not(:last-child) {
    margin-bottom: 1.4rem;
  }
  .active-category {
    &:before {
      content: '';
      position: absolute;
      width: 3rem;
      height: 0.1rem;
      background: black;
      left: -4rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  @media (max-width: ${breakpoints.s}) {
    display: none;
  }
`

const BlogsList = styled.div`
  overflow: scroll;
  .blog {
    margin-bottom: 2rem;
    padding: 0 10px;
  }
`

const HomePageLink = styled(StyledLink)`
  text-decoration: underline;
  color: #a6a6a6;
  display: flex;
  align-items: center;
`

const NotFound = styled.div`
  text-align: center;
  color: ${colors.neutral45};
`

const filterPosts = (allPosts, category) => {
  if (category === 'All') return allPosts
  return allPosts.filter(
    post => post.data.category.document[0].data.title.text === category
  )
}

const SidebarContent = ({
  allPosts,
  setShowSidebar,
  category,
  setCategory,
}) => {
  const posts = allPosts.nodes
  const [search, setSearch] = useState('')
  const categories = [
    'All',
    'Engineering',
    'Business & Growth',
    'Product & Design',
    'Archives',
  ] // mock, swap this from gql data
  const filteredPosts = searchBlogs(filterPosts(posts, category), search)
  return (
    <SidebarWrapper>
      <VertFlex categories>
        {categories.map(cat => (
          <CategoryItem key={cat} onClick={() => setCategory(cat)}>
            <span className={category === cat ? 'active-category' : ''}>
              {cat}
            </span>
          </CategoryItem>
        ))}
        <ActionWrapper>
          <Icon
            className="close-icon"
            type="oClose"
            onClick={() => setShowSidebar(false)}
          />
          <HomePageLink to="/" className="logo">
            <img src={clarisightsLogo} alt="Clarisights logo" />
            <span className="home-link">Go to Journal</span>
          </HomePageLink>
        </ActionWrapper>
      </VertFlex>
      <VertFlex>
        <span className="search-wrapper">
          <Input
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for a post"
            addonBefore={<Icon type="oSearch" />}
          />
        </span>
        <BlogsList>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <BlogCard
                setShowSidebar={setShowSidebar}
                className="blog u-margin-bottom"
                sidebar
                post={post}
                key={post.slugs[0]}
              />
            ))
          ) : (
            <NotFound>No related posts found</NotFound>
          )}
        </BlogsList>
      </VertFlex>
    </SidebarWrapper>
  )
}

const Drawer = props => {
  const {
    allPosts,
    setShowSidebar,
    category,
    setCategory,
    open,
    onSetOpen,
    children,
  } = props

  return (
    <Sidebar
      sidebar={
        <SidebarContent
          allPosts={allPosts}
          setShowSidebar={setShowSidebar}
          category={category}
          setCategory={setCategory}
        />
      }
      open={open}
      styles={{ sidebar: { background: '#f4f2ee', zIndex: 3 } }}
      onSetOpen={onSetOpen}>
      {children}
    </Sidebar>
  )
}

export default Drawer
