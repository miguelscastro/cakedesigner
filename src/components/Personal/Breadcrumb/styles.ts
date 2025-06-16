import styled from 'styled-components'
import { mixins } from '../../../styles/mixins'

export const Container = styled.header`
  ${mixins.fonts.textXS}
  padding: 3rem 6rem 0;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.link};
  }
`
