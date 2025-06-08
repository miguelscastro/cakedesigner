import styled from 'styled-components'
import { mixins } from '../../../../../styles/mixins'

export const Container = styled.div`
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media screen and (max-width: 1440px) {
    width: 570px;
  }
`

const baseInfoContainer = styled.div`
  background: ${({ theme }) => theme.colors['base-card']};
  border-radius: 6px;
  gap: 2rem;
  padding: 2.5rem;
`

export const Address = styled(baseInfoContainer)`
  svg {
    color: ${({ theme }) => theme.colors['yellow-dark']};
  }
`
export const PaymentOptions = styled(baseInfoContainer)`
  svg {
    color: ${({ theme }) => theme.colors['brown-dark']};
  }
`

export const InfoHeader = styled.header`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;

  h3 {
    ${mixins.fonts.textM};
  }

  p {
    ${mixins.fonts.textS};
  }
`

export const InfoContent = styled.div<{ $display: 'grid' | 'flex' }>`
  ${({ $display }) =>
    $display === 'flex'
      ? `
        text-align: center;

        > div {
         position: relative;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          gap: 0.75rem; 
          margin-bottom: 1rem;
        }
      `
      : `
        display: grid;
        grid-template-columns: 200px 276px 60px;
        grid-template-areas:
          'cep . .'
          'street street street'
          'number fullAddress fullAddress'
          'neighborhood city state';
        gap: 0.25rem;
      `};

  @media screen and (max-width: 1440px) {
    grid-template-columns: 180px 256px 50px;
  }
`

export const InputWrapper = styled.div<{ $area?: string }>`
  grid-area: ${({ $area }) => $area || 'auto'};
  position: relative;
  max-height: 47.27px;

  color: ${({ theme }) => theme.colors['base-label']};
  background: ${({ theme }) => theme.colors['base-input']};

  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors['base-button']};

  > input {
    border: none;
    width: 100%;
  }

  &:not(:nth-last-child(-n + 3)) {
    margin-bottom: 1rem;
  }

  &:nth-child(3),
  &:nth-child(5),
  &:nth-child(6) {
    margin-right: 0.75rem;
  }

  display: flex;
  flex-direction: column;
`

export const TextInput = styled.input<{ $error?: string; disabled?: boolean }>`
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

export const OptionalText = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors['base-label']};
  pointer-events: none;
  ${mixins.fonts.textS}
  font-style: italic;
`
export const ErrorText = styled.span<{ success?: boolean }>`
  color: ${({ success, theme }) =>
    success ? theme.colors.success : theme.colors.error};
  ${mixins.fonts.titleXS}
  font-size: 0.75rem;
  width: 120%;
  margin: 0.25rem 0;
`

export const PaymentOption = styled.label`
  display: flex;
  max-width: 178px;

  cursor: pointer;
  user-select: none;

  svg {
    color: ${({ theme }) => theme.colors.brown};
  }

  > input[type='radio'] {
    position: absolute;
    opacity: 0;
    top: 120%;
    right: 50%;
    width: 10px;
    height: 10px;
    pointer-events: none;
  }

  &:has(input:checked) > div {
    background-color: ${({ theme }) => theme.colors['brown-light']};
    border: 1px solid ${({ theme }) => theme.colors.brown};
  }

  > div {
    display: flex;
    gap: 0.75rem;

    width: 178px;

    padding: 1rem;
    border-radius: 6px;

    transition: 0.2s;
    background: ${({ theme }) => theme.colors['base-button']};

    p {
      ${mixins.fonts.buttonM}
      font-size: 65%;
    }
  }
  > div:hover {
    background-color: ${({ theme }) => theme.colors['base-hover']};
  }

  @media screen and (max-width: 1440px) {
    width: 160px;

    > div {
      gap: 0.5rem;
    }
    > div p {
      ${mixins.fonts.buttonM}
      font-size: 60%;
    }
  }
`
