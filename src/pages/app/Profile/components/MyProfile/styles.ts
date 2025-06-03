import styled from 'styled-components'
import { mixins } from '../../../../../styles/mixins'

export const Container = styled.main``
export const ProfileHeader = styled.header`
  display: flex;
  text-align: center;
  align-items: center;
  gap: 1rem;
  padding: 3rem 5rem;

  img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }

  h2 {
    text-align: start;
    margin-bottom: 0.5rem;
  }
`
export const InfoContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;

  > button {
    display: flex;
    flex-direction: column;
    text-align: start;
    gap: 0.5rem;

    width: 300px;
    padding: 1rem 1rem 2rem 1rem;

    background: ${({ theme }) => theme.colors['base-card']};

    svg {
      margin-bottom: 0.75rem;
      color: ${({ theme }) => theme.colors['brown-dark']};
    }

    h3 {
      ${mixins.fonts.textM}
      font-weight: bold;
    }

    p {
      ${mixins.fonts.textS}
    }
  }
`
