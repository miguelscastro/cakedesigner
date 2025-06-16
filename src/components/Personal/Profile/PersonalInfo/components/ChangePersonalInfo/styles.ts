import styled from 'styled-components'
import { mixins } from '../../../../../../styles/mixins'

export const Container = styled.div`
  padding: 4rem 10rem 1rem;

  h2 {
    ${mixins.fonts.titleM}
  }
`
export const DataForm = styled.form`
  display: flex;
  flex-direction: column;

  margin: 1rem 0;
  padding: 1rem;
  box-shadow: 0 2px 6px ${({ theme }) => theme.colors['base-text']}22;

  background: ${({ theme }) => theme.colors['base-card']};
  border-radius: 6px;
  width: 100%;

  span {
    ${mixins.fonts.textM}
  }

  p {
    ${mixins.fonts.textXS}

    border-bottom: 1px solid ${({ theme }) => theme.colors['brown-dark']};
    padding: 0.25rem 0 0.5rem;
  }

  input {
    border: none;
    outline: none;
    background: ${({ theme }) => theme.colors['base-card']};

    ${mixins.fonts.textXS}

    padding: 0.25rem 0 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors['brown-dark']};

    &::placeholder {
      color: ${({ theme }) => theme.colors['brown-dark']};
      opacity: 0.4;
    }
  }

  button {
    ${mixins.fonts.buttonM}
    font-weight: bold;

    width: 12%;

    background: ${({ theme }) => theme.colors['brown-light']};
    color: ${({ theme }) => theme.colors['brown-dark']};

    border-radius: 6px;
    padding: 0.25rem 0.5rem;

    margin-top: 0.5rem;

    &:not(:last-of-type) {
      margin-right: 0.5rem;
    }
  }
`
