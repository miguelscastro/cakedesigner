import styled from 'styled-components'

export const Container = styled.header`
  padding: 6rem 6rem 0;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.link};
  }
`
