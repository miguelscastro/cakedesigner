import styled from 'styled-components'
import { mixins } from '../../../../styles/mixins'

export const CardContainer = styled.div`
  display: flex;
  max-width: 256px;
  width: 256px;
  max-height: 310px;
  height: 310px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.colors['yellow-light']};

  background-color: ${({ theme }) => theme.colors['base-card']};
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;

  > h3 {
    ${mixins.fonts.titleS}
    padding: 0 1.25rem;
    margin-top: 1rem;
  }

  > img {
    padding: 0 4.25rem;

    width: 15rem;
    height: 6.25rem;

    border-radius: 100%;
    transform: translateY(-20%);
  }

  > p {
    ${mixins.fonts.textS}
    padding: 0 1.25rem;
    margin: 0.5rem 0 2.0625rem;
  }

  @media screen and (max-width: 1440px) {
    width: 14.0625rem;
    height: 18.125rem;

    > img {
      width: 240px;
    }

    > h3 {
      padding: 0 0.5rem;
    }

    > p {
      margin: 0.75rem 0;
      padding: 0 0.5rem;
    }
  }
`

export const Tags = styled.div`
  display: flex;
  align-items: center;
  text-align: center;

  flex-wrap: wrap;
  padding: 0 0.5rem;

  span {
    ${mixins.fonts.tag}
    color: ${({ theme }) => theme.colors['yellow-dark']};
    background-color: ${({ theme }) => theme.colors['yellow-light']};
    border-radius: 10px;
    padding: 0.25rem 0.5rem;
  }
`

export const Controler = styled.div`
  display: flex;
  max-height: 2.375rem;
  padding: 0 1.5rem 0.75rem;
  align-items: center;
  gap: 1.4375rem;
`
export const Price = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.2rem;

  span:first-child {
    ${mixins.fonts.textXS}
    color: ${({ theme }) => theme.colors['base-text']};
  }

  span:last-child {
    ${mixins.fonts.titleS};
    color: ${({ theme }) => theme.colors['base-text']};
  }
`

export const Order = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const AddToCartButton = styled.button`
  display: flex;

  svg {
    border-radius: 6px;
    padding: 0.5rem;
    height: 2rem;
    width: 2rem;
    color: ${({ theme }) => theme.colors['base-card']};
    background: ${({ theme }) => theme.colors.brown};
    transition: 0.2s;

    &:hover {
      background: ${({ theme }) => theme.colors['brown-dark']};
    }
  }
`
