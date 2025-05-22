import styled from 'styled-components'
import { mixins } from '../../styles/mixins'

export const Container = styled.main`
  display: flex;

  max-width: 1440px;
  margin: 0 auto;
  padding: 0 10rem;

  > div {
    display: flex;
    width: 100%;
    justify-content: space-between;

    padding: 8rem 0rem;
    border-radius: 10px;

    > h1 {
      margin-bottom: 2rem;
      padding: 2rem;
      ${mixins.fonts.titleL}
    }
  }
  @media screen and (max-width: 1440px) {
    max-width: 1000px;
    padding: 0 2rem;
  }
`

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 448px;
  height: fit-content;
  padding: 2.5rem;

  gap: 1rem;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors['brown-dark']};
  background: ${({ theme }) => theme.colors.background};

  > button {
    padding: 0.75rem 0.5rem;
    border-radius: 6px;
    ${mixins.fonts.buttonG}

    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors['brown-dark']};

    &:first-of-type {
      background: ${({ theme }) => theme.colors['brown']};
      color: ${({ theme }) => theme.colors.white};
    }

    &:first-of-type:hover {
      background: ${({ theme }) => theme.colors['brown-dark']};
      transition: 0.1s;
    }

    &:hover {
      background: ${({ theme }) => theme.colors['brown-light']};
      transition: 0.1s;
    }
  }
`

export const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
`

export const TextInput = styled.input`
  color: ${({ theme }) => theme.colors['base-label']};
  background: ${({ theme }) => theme.colors['base-card']};

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors['base-button']};

  padding: 0.75rem;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: none;
  }

  &:disabled {
    background: ${({ theme }) => theme.colors['base-input']};
  }
`
