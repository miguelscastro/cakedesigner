import styled from 'styled-components'

export const LayoutContainer = styled.div`
  > div {
    width: 100%;
    height: 55px;
    background: ${({ theme }) => theme.colors['brown-light']};
  }
`

export const Header = styled.header`
  display: flex;

  margin: 0 auto;

  padding: 0.5rem 2rem;
  max-width: 1440px;
  height: 4rem;

  a {
    height: 40px;
  }

  img:first-of-type {
    width: 150px;
    height: auto;
    transform: translateY(10%);
  }

  @media screen and (max-width: 1440px) {
    max-width: 1000px;
    padding: 0.5rem 2rem;
  }
`
