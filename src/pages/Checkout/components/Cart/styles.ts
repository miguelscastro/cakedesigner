import styled from 'styled-components'
import { mixins } from '../../../../styles/mixins'

export const Container = styled.section`
  width: 448px;
  padding: 2.5rem;

  border-bottom-left-radius: 6px;
  border-top-right-radius: 6px;

  background: ${({ theme }) => theme.colors['base-card']};

  @media screen and (max-width: 1440px) {
    width: 400px;
  }
`
export const Products = styled.div`
  max-height: 370px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.25rem;
  }
`

export const WarningMessage = styled.h3`
  ${mixins.fonts.titleXS}
  text-align: center;

  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors['base-button']};
`

export const Total = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 1.5rem;
  gap: 0.75rem;

  > div {
    display: flex;
    justify-content: space-between;
  }

  > div:nth-child(3) {
    color: ${({ theme }) => theme.colors['base-subtitle']};

    ${mixins.fonts.textL}
    font-weight: bold;
  }
  > button {
    background: ${({ theme }) => theme.colors['yellow']};
    color: ${({ theme }) => theme.colors.white};
    margin-top: 1.5rem;
    padding: 0.75rem 0.5rem;
    border-radius: 6px;
    ${mixins.fonts.buttonG}

    &:not(:disabled):hover {
      background: ${({ theme }) => theme.colors['yellow-dark']};
      transition: 0.1s;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`
