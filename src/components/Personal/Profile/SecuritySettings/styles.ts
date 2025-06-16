import styled from 'styled-components'
import { mixins } from '../../../../styles/mixins'

export const Container = styled.div`
  padding: 4rem 10rem 1rem;

  h2 {
    ${mixins.fonts.titleM}
  }

  button {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 1rem 0;
    padding: 1rem 2rem;

    background: ${({ theme }) => theme.colors['base-card']};
    border-radius: 6px;
    width: 100%;

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;

      color: ${({ theme }) => theme.colors['base-text']};

      svg {
        width: 30px;
        height: 30px;
      }

      .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        p {
          ${mixins.fonts.textL}
        }

        span {
          ${mixins.fonts.textS}
        }
      }
    }
  }
`
