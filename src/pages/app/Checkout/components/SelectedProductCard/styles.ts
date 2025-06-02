import styled from 'styled-components'
import { mixins } from '../../../../../styles/mixins'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 1.5rem;

  &:not(:first-child) {
    padding-top: 1.5rem;
  }

  border-bottom: 1px solid ${({ theme }) => theme.colors['base-button']};
`

export const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1.25rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  > img {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
  }

  h3 {
    ${mixins.fonts.textM}
  }
`

export const Controller = styled.div`
  display: flex;
  align-items: center;
  width: 171px;
  height: 38px;

  gap: 0.5rem;
`

export const ProductPrice = styled.span`
  ${mixins.fonts.textM}
  font-weight: bold;

  @media screen and (max-width: 1440px) {
    font-size: 80%;
  }
`
export const RemoveProduct = styled.button`
  display: flex;
  gap: 0.25rem;

  max-width: 5.6825rem;

  padding: 0.5rem 0.25rem;
  text-align: center;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors['base-button']};

  > svg {
    color: ${({ theme }) => theme.colors.brown};
  }

  > p {
    ${mixins.fonts.buttonM}
    color: ${({ theme }) => theme.colors['base-text']};
  }

  &:hover {
    background: ${({ theme }) => theme.colors['base-hover']};
  }
`
