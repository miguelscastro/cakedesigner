import styled from 'styled-components'
import { mixins } from '../../../../../../../styles/mixins'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  background: ${({ theme }) => theme.colors.background};

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  box-shadow: 0 2px 6px ${({ theme }) => theme.colors['base-text']}22;

  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  h2 {
    ${mixins.fonts.titleXS}
    background: ${({ theme }) => theme.colors['base-card']};
    padding: 1rem;

    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
`
export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem 1rem 1rem;

  &:not(:last-of-type) {
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors['brown-dark']};
  }
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 4rem;
      height: 4rem;
      border-radius: 100%;
    }
  }
  span {
    ${mixins.fonts.titleS}
  }
`
export const ProductLink = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h3 {
    ${mixins.fonts.titleXS}
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.link};

    ${mixins.fonts.textXS}
  }
`
