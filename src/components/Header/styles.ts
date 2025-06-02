import styled from 'styled-components'
import { mixins } from '../../styles/mixins'

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  position: sticky;
  top: 0;
  z-index: 2;
`

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;

  padding: 2rem 10rem;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;

  a {
    height: 40px;
  }

  img#logo {
    width: 150px;
    height: auto;
    transform: translateY(10%);
  }

  @media screen and (max-width: 1440px) {
    max-width: 1000px;
    padding: 2rem 0;
  }
`

export const Aside = styled.aside`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  div:first-of-type {
    background: ${({ theme }) => theme.colors['brown-light']};
    border-radius: 6px;

    > a {
      display: flex;
      align-items: center;
      padding: 0.5rem 0.125rem 0.5rem 0.5rem;

      border-radius: 6px;
      gap: 0.5rem;
      text-decoration: none;

      background: transparent;

      span {
        ${mixins.fonts.textS}
        color: ${({ theme }) => theme.colors['brown-dark']};
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: inherit;
        object-fit: cover;

        padding: 0;
        border-radius: 50%;

        border: 0.5px solid ${({ theme }) => theme.colors['brown-dark']};
      }
    }
  }

  a {
    display: flex;
    align-items: center;

    background-color: ${({ theme }) => theme.colors['brown-light']};
    color: ${({ theme }) => theme.colors['brown-dark']};

    position: relative;

    padding: 0.5rem;
    border-radius: 6px;

    &[aria-disabled='true'] {
      pointer-events: none;
    }

    &.cart span {
      ${mixins.fonts.textS};
      font-weight: bold;
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors['brown-dark']};
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;
      top: 0px;
      right: 0px;
      transform: translate(50%, -50%);
    }
  }
`
