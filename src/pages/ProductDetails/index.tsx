import { useLocation } from 'react-router-dom'
import { Container } from './styles'

export function ProductDetails() {
  const { state } = useLocation()
  console.log(state)

  return <Container />
}
