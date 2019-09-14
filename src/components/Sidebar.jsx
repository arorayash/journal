import React, { useState } from 'react'
import Sidebar from 'react-sidebar'
import styled from '@emotion/styled'
import { Input, Icon } from 'knit-ui'
import { Link } from 'gatsby'
import clarisightsLogo from '../assets/logo.svg'
import { theme } from '../styles'
import BlogCard from './Listing/BlogCard'
import { searchBlogs } from '../utils'

const { breakpoints } = theme

const SidebarWrapper = styled.div`
  width: 50vw;
  max-width: 80rem;
  padding: 4rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${breakpoints.l}) {
    width: 70vw;
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
    margin-bottom: 2.7rem;
    input {
      background: transparent;
      border: 1px solid #1a1a1a;
    }
  }
  .logo {
    width: fit-content;
    margin-top: auto;
  }
`

const CategoryItem = styled.span`
  width: fit-content;
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
`

const BlogsList = styled.div`
  overflow: scroll;
  .blog {
    margin-bottom: 2rem;
  }
`

const filterPosts = (allPosts, category) => {
  if (category === 'All') return allPosts
  return allPosts.filter(post => post.data.category.document[0].data.title.text === category)
}

const SidebarContent = ({ allPosts }) => {
  const posts = allPosts.nodes
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const categories = ['All', 'Engineering', 'Business & Growth', 'Product & Design', 'Archives'] // mock, swap this from gql data
  const filteredPosts = searchBlogs(filterPosts(posts, category), search)
  return (
    <SidebarWrapper>
      <VertFlex categories>
        {categories.map(cat => (
          <CategoryItem onClick={() => setCategory(cat)}>
            <span className={category === cat ? 'active-category' : ''}>{cat}</span>
          </CategoryItem>
        ))}
        <Link to="/" className="logo">
          <img src={clarisightsLogo} alt="Clarisights logo" />
        </Link>
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
          {filteredPosts.map(post => (
            <BlogCard className="blog" sidebar post={post} />
          ))}
        </BlogsList>
      </VertFlex>
    </SidebarWrapper>
  )
}

const Drawer = props => (
  <Sidebar
    sidebar={<SidebarContent allPosts={props.allPosts} />}
    open={props.open}
    styles={{ sidebar: { background: '#f4f2ee', zIndex: 3 } }}
    onSetOpen={props.onSetOpen}
  >
    {props.children}
  </Sidebar>
)

export default Drawer
