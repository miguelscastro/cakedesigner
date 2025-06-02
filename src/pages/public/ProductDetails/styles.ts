import styled from 'styled-components'
import { mixins } from '../../../styles/mixins'

export const Container = styled.main`
  display: flex;

  max-width: 1440px;
  padding: 0 10rem;
  margin: 3rem auto;
  gap: 2rem;

  background: ${({ theme }) => theme.colors.background};

  picture {
    display: flex;
    justify-content: center;
    background: ${({ theme }) => theme.colors['base-card']};

    img {
      width: 350px;
      height: 350px;
      border-radius: 40px;
      margin: 1.5rem;
    }
  }

  @media screen and (max-width: 1440px) {
    max-width: 1000px;
    padding: 0;
  }
`
export const ProductContainer = styled.div`
  max-width: 640px;
  width: 640px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1440px) {
    width: 570px;
  }

  border-top-left-radius: 8px;
  border-bottom-right-radius: 8px;
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 0.25rem;
  background: ${({ theme }) => theme.colors['base-card']};

  > h3 {
    align-self: center;
    margin: 1rem 0;
  }

  > p {
    padding: 0.5rem 2rem 1rem;
    ${mixins.fonts.textM}
  }
`
export const AddToCart = styled.aside`
  width: 448px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 2.5rem;

  border-bottom-left-radius: 32px;
  border-top-right-radius: 32px;

  background: ${({ theme }) => theme.colors['base-card']};

  h1 {
    ${mixins.fonts.titleM}
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors['brown-dark']};
  }

  span {
    ${mixins.fonts.titleM}
  }

  > div {
    display: flex;
    justify-content: space-between;

    span:not(:first-child) {
      ${mixins.fonts.textM}
    }
  }

  > button {
    background: ${({ theme }) => theme.colors['brown']};
    color: ${({ theme }) => theme.colors.white};
    margin-top: 1.5rem;
    padding: 0.75rem 0.5rem;
    border-radius: 6px;
    ${mixins.fonts.buttonG}

    &:not(:disabled):hover {
      background: ${({ theme }) => theme.colors['brown-dark']};
      transition: 0.1s;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  @media screen and (max-width: 1440px) {
    width: 400px;
  }
`
