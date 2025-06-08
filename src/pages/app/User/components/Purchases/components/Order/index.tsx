import { useNavigate } from 'react-router-dom'
import { CartItem } from '../../../../../../../reducers/cart/reducer'
import { formatMoney } from '../../../../../../../utils/formatMoney'
import { Container, ItemContainer, ProductLink } from './styles'

interface OrderProps {
  order: CartItem[]
}

export function Order({ order }: OrderProps) {
  const navigate = useNavigate()

  function handleSeeMore(item: CartItem) {
    navigate(`/product/${item.id}`, {
      state: item,
    })
  }

  return (
    <Container>
      <h2>5 de maio</h2>
      {order.map((item) => (
        <ItemContainer key={item.id}>
          <div>
            <img src={item.image} alt="" />
            <div>
              <ProductLink>
                <h3>{item.title}</h3>{' '}
                <a onClick={() => handleSeeMore(item)}>Ver produto</a>
              </ProductLink>
              <p>{item.description}</p>
            </div>
          </div>
          <span>R$ {formatMoney(item.price)}</span>
        </ItemContainer>
      ))}
    </Container>
  )
}
