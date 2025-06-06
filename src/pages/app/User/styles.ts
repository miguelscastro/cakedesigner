import styled from 'styled-components'
import { mixins } from '../../../styles/mixins'

export const Container = styled.main`
  display: flex;
  background: ${({ theme }) => theme.colors['base-input']};
`
export const Menu = styled.aside`
  width: 300px;
  height: calc(100vh - 104px);
  background: ${({ theme }) => theme.colors['base-card']};

  > div {
    display: flex;
    align-items: flex-end;
    gap: 1rem;

    padding: 3rem;

    span {
      ${mixins.fonts.titleXS}
    }
  }

  > ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;

    li {
      padding: 0 2.6875rem 0.5rem;
      border-left: 5px solid transparent;

      &:hover {
        border-left-color: ${({ theme }) => theme.colors['brown-dark']};
      }

      > a {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        width: 100%;
        padding: 0.5rem 0;
        border: none;
        background: transparent;
        ${mixins.fonts.textS}
        cursor: pointer;
        text-decoration: none;

        transition: border-color 0.1s;

        color: ${({ theme }) => theme.colors['base-text']};

        &.active svg {
          color: ${({ theme }) => theme.colors['brown-dark']};
        }
      }
    }
  }
`
export const Info = styled.section`
  max-width: 1440px;
  width: 1440px;
  margin: 0 auto;
  height: calc(100vh - 104px);

  @media screen and (max-width: 1440px) {
    width: auto;
  }
`
