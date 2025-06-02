import { ChangeEvent } from 'react'
import { Container, SelectTypeOfProduct } from './styles'

interface FilterProps {
  displaySelectedProducts: (
    input: string | ChangeEvent<HTMLSelectElement>,
  ) => void
}

export function FilterProducts({ displaySelectedProducts }: FilterProps) {
  function handleDisplaySelectedProducts(
    input: ChangeEvent<HTMLSelectElement> | string,
  ) {
    displaySelectedProducts(input)
  }
  return (
    <Container>
      <SelectTypeOfProduct
        id="dropdown"
        onChange={handleDisplaySelectedProducts}
        defaultValue={'/'}
      >
        <option value="/">Selecione a categoria</option>
        <option value="/bolos">Bolos</option>
        <option value="/bolos-de-pote">Bolos de pote</option>
        <option value="/doces">Doces</option>
        <option value="/cupcakes">Cupcakes</option>
      </SelectTypeOfProduct>
    </Container>
  )
}
