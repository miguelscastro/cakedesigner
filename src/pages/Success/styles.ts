import styled from 'styled-components'
import { mixins } from '../../styles/mixins'

export const Container = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;

  padding: 0 10rem;
  max-width: 1440px;

  align-items: flex-end;

  @media screen and (max-width: 1440px) {
    justify-content: center;
    gap: 1rem;
    padding: 0 2rem;
  }
`

export const StatusContainer = styled.section`
  > h1 {
    margin: 5rem 0 0.25rem;
    ${mixins.fonts.titleL}
    color: ${({ theme }) => theme.colors['yellow-dark']};
  }

  > p {
    ${mixins.fonts.textL}
    color: ${({ theme }) => theme.colors['base-subtitle']};
    margin-bottom: 2.5rem;
  }
`

export const Status = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  max-height: 270px;

  padding: 2.5rem;
  border-radius: 6px 36px 6px 36px;
  background: ${({ theme }) => theme.colors.background};

  position: relative;
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    z-index: -1;
    border-radius: 7px 37px 7px 37px;
    background: linear-gradient(102.89deg, #dbac2c 2.61%, #8047f8 98.76%);
  }
`

export const StatusField = styled.div<{ $type?: 'map' | 'timer' | 'cash' }>`
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;

  svg {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ $type, theme }) =>
      $type === 'map'
        ? theme.colors['purple']
        : $type === 'timer'
          ? theme.colors['yellow']
          : $type === 'cash'
            ? theme.colors['yellow-dark']
            : theme.colors['purple']};
    padding: 0.5rem;
    border-radius: 50%;
  }
`

export const StatusFieldHeader = styled.header`
  > h3,
  > p {
    ${mixins.fonts.textM}
  }
  span {
    margin-left: 0.25rem;
    font-weight: bold;
  }
`

export const Illustration = styled.img`
  max-height: 500px;
  max-width: 450px;
`
