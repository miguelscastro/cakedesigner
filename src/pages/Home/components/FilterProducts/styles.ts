import styled from 'styled-components'
import { mixins } from '../../../../styles/mixins'

export const Container = styled.div`
  z-index: 1;
`

export const SelectTypeOfProduct = styled.select`
  all: unset;
  margin-right: 2rem;
  padding: 0.5rem 1rem;

  color: ${({ theme }) => theme.colors['base-title']};
  ${mixins.fonts.titleM};
  font-size: 1rem;

  border-bottom: 2px solid ${({ theme }) => theme.colors['brown-dark']};

  appearance: none;
  cursor: pointer;
  transition:
    background-color 0.3s,
    border 0.3s;

  option {
    color: ${({ theme }) => theme.colors['base-title']};
    background: ${({ theme }) => theme.colors.background};
    padding-left: 1rem;
  }
`
