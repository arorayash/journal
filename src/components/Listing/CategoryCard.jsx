import React from 'react'
import styled from '@emotion/styled'
import { Icon } from 'knit-ui'
import { StyledLink } from '../Wrappers'
import { getFirstCategory } from '../Wrappers'
import theme from '../../styles/theme'
import { firstCategory, secondCategory, thirdCategory } from '../../assets'

const { breakpoints } = theme

const CardWrapper = styled(StyledLink)`
    position: relative;
    display: flex;
    max-width: 38rem;
    min-width: 32rem;
    flex: 1;
    margin-bottom: 4rem;
    margin-right: 2.8rem;
    @media (max-width: ${breakpoints.s}) {
      margin-right: 0;
      max-width: 100%;
    }
    height: 40rem;
    background: #EBE7E0;
    border-radius: 2px;
    cursor: pointer;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-width: 0 13rem 13rem 0;
    border-style: solid;
    border-color: ${props => categoryColors[props.uid]} #f4f2ed;
  }
  .arrow-icon {
    display: none;
  }
  &:hover {
    background-color: #E1DBD1;
    &:before {
      border-width: 0 11rem 11rem 0;
      transition: all 0.5s;
    }
    .arrow-icon {
      display: inline;
      svg {
        transform: rotate(-135deg);
        fill: #fff;
      }
    }
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 4rem;
  .title {
    font-size: 2.4rem;
    line-height: 2.9rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .num {
    width: fit-content;
    line-height: 9rem;
  }
  .desc {
    color: #666666;
    opacity: 0.8;
    font-size: 1.4rem;
    line-height: 2rem;
  }
`

const categoryColors = {
  engineering: '#FCD06E',
  'business--growth': '#025C52',
  'product--design': '#813A4C',
}

const categoryIndex = {
  '0': firstCategory,
  '1': secondCategory,
  '2': thirdCategory,
}

const CategoryCard = ({ data, index, cardLink }) => {
  const {
    data: { title, description },
  } = data
  return (
    <CardWrapper to={cardLink} uid={data.uid}>
      <CardContent>
        <span className="num">
          <img src={categoryIndex[index]} alt="" />
        </span>
        <span className="title">
          {title.text}
          <Icon height="20px" type="oArrowDownward" className="arrow-icon" />
        </span>
        <span className="desc">{description.text}</span>
      </CardContent>
    </CardWrapper>
  )
}

export default CategoryCard
