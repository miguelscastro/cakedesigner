import styled from 'styled-components'
import { mixins } from '../../../styles/mixins'

export const Container = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors['base-button']};
  border-radius: 6px;
  max-height: 38px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  button {
    background-color: transparent;
    display: flex;
  }

  button svg {
    color: ${({ theme }) => theme.colors.brown};

    transition: all 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors['brown-dark']};
    }
  }

  span {
    ${mixins.fonts.textM}
    user-select: none;
    color: ${({ theme }) => theme.colors['base-title']};
  }
`
