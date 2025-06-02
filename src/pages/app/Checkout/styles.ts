import styled from 'styled-components'
import { mixins } from '../../../styles/mixins'

export const Container = styled.main`
  max-width: 1440px;
  padding: 0 10rem;
  margin: 0 auto;
  gap: 2rem;

  @media screen and (max-width: 1440px) {
    max-width: 1000px;
    padding: 0;
    display: flex;
    justify-content: center;
  }
`
export const OrderForm = styled.form`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1440px) {
    gap: 1.875rem;
    max-width: 1000px;
  }
`

export const Address = styled.section`
  > h2 {
    ${mixins.fonts.titleXS};
    margin-bottom: 0.9375rem;
  }

  @media screen and (max-width: 1440px) {
    margin-bottom: 0.9375rem;
    padding: 0;
  }
`

export const CartTotal = styled.aside`
  > h2 {
    ${mixins.fonts.titleXS}
    margin-bottom: 0.9375rem;
  }

  @media screen and (max-width: 1440px) {
    padding: 0;
  }
`
